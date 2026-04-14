import asyncio
import hashlib
import hmac
import os
import secrets
import sqlite3
from contextlib import asynccontextmanager
from datetime import datetime, timedelta
from typing import Optional

import httpx
from fastapi import Depends, FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.staticfiles import StaticFiles
from jose import JWTError, jwt
from pathlib import Path
from pydantic import BaseModel

_data_dir = Path(os.environ.get("DATA_DIR", Path(__file__).parent))
DB_PATH = _data_dir / "favorites.db"
FRONTEND_PATH = Path(__file__).parent.parent / "frontend"
RADIO_API = "https://de1.api.radio-browser.info/json"
SECRET_KEY = os.environ.get("SECRET_KEY", "bolandio-dev-secret-change-in-production")
ALGORITHM = "HS256"
TOKEN_DAYS = 30

security = HTTPBearer(auto_error=False)


def hash_password(password: str) -> str:
    salt = secrets.token_hex(32)
    key = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 200_000)
    return f"{salt}:{key.hex()}"


def verify_password(password: str, stored: str) -> bool:
    try:
        salt, key_hex = stored.split(":", 1)
        key = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 200_000)
        return hmac.compare_digest(key.hex(), key_hex)
    except Exception:
        return False


def init_db():
    conn = sqlite3.connect(DB_PATH)

    # Users table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Check if favorites table exists and needs migration
    tables = {
        row[0]
        for row in conn.execute(
            "SELECT name FROM sqlite_master WHERE type='table'"
        ).fetchall()
    }

    if "favorites" in tables:
        cols = {
            row[1]
            for row in conn.execute("PRAGMA table_info(favorites)").fetchall()
        }
        if "user_id" not in cols:
            # Migrate old schema (stationuuid PRIMARY KEY) to new (user_id + stationuuid)
            conn.execute("ALTER TABLE favorites RENAME TO favorites_legacy")
            conn.execute("""
                CREATE TABLE favorites (
                    user_id INTEGER NOT NULL DEFAULT 0,
                    stationuuid TEXT NOT NULL,
                    name TEXT NOT NULL,
                    url TEXT NOT NULL,
                    country TEXT DEFAULT '',
                    tags TEXT DEFAULT '',
                    favicon TEXT DEFAULT '',
                    group_name TEXT DEFAULT '默认',
                    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY (user_id, stationuuid)
                )
            """)
            conn.execute("""
                INSERT OR IGNORE INTO favorites
                    (user_id, stationuuid, name, url, country, tags, favicon, group_name, added_at)
                SELECT 0, stationuuid, name, url,
                       COALESCE(country,''), COALESCE(tags,''), COALESCE(favicon,''),
                       COALESCE(group_name,'默认'), added_at
                FROM favorites_legacy
            """)
            conn.execute("DROP TABLE favorites_legacy")
    else:
        conn.execute("""
            CREATE TABLE favorites (
                user_id INTEGER NOT NULL DEFAULT 0,
                stationuuid TEXT NOT NULL,
                name TEXT NOT NULL,
                url TEXT NOT NULL,
                country TEXT DEFAULT '',
                tags TEXT DEFAULT '',
                favicon TEXT DEFAULT '',
                group_name TEXT DEFAULT '默认',
                added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (user_id, stationuuid)
            )
        """)

    conn.commit()
    conn.close()


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(lifespan=lifespan)


# ── Auth helpers ──────────────────────────────────────────────────────────────

def create_token(user_id: int, username: str) -> str:
    expire = datetime.utcnow() + timedelta(days=TOKEN_DAYS)
    return jwt.encode(
        {"sub": str(user_id), "username": username, "exp": expire},
        SECRET_KEY,
        algorithm=ALGORITHM,
    )


def get_current_user(
    creds: Optional[HTTPAuthorizationCredentials] = Depends(security),
):
    if not creds:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(creds.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = int(payload["sub"])
        username = payload["username"]
        return {"id": user_id, "username": username}
    except (JWTError, KeyError, ValueError):
        raise HTTPException(status_code=401, detail="Invalid token")


# ── Pydantic models ───────────────────────────────────────────────────────────

class UserCreate(BaseModel):
    username: str
    password: str


class FavoriteStation(BaseModel):
    stationuuid: str
    name: str
    url: str
    country: str = ""
    tags: str = ""
    favicon: str = ""
    group_name: str = "默认"


# ── Auth endpoints ────────────────────────────────────────────────────────────

@app.post("/api/auth/register")
def register(body: UserCreate):
    username = body.username.strip()
    if len(username) < 2:
        raise HTTPException(400, "用户名至少2个字符")
    if len(body.password) < 6:
        raise HTTPException(400, "密码至少6位")
    conn = sqlite3.connect(DB_PATH)
    try:
        conn.execute(
            "INSERT INTO users (username, password_hash) VALUES (?, ?)",
            (username, hash_password(body.password)),
        )
        conn.commit()
        user_id = conn.execute(
            "SELECT id FROM users WHERE username=?", (username,)
        ).fetchone()[0]
    except sqlite3.IntegrityError:
        raise HTTPException(400, "用户名已存在")
    finally:
        conn.close()
    return {
        "access_token": create_token(user_id, username),
        "token_type": "bearer",
        "username": username,
    }


@app.post("/api/auth/login")
def login(body: UserCreate):
    username = body.username.strip()
    conn = sqlite3.connect(DB_PATH)
    row = conn.execute(
        "SELECT id, username, password_hash FROM users WHERE username=?", (username,)
    ).fetchone()
    conn.close()
    if not row or not verify_password(body.password, row[2]):
        raise HTTPException(401, "用户名或密码错误")
    return {
        "access_token": create_token(row[0], row[1]),
        "token_type": "bearer",
        "username": row[1],
    }


@app.get("/api/auth/me")
def get_me(user=Depends(get_current_user)):
    return user


# ── Radio Browser: search & discovery ────────────────────────────────────────

@app.get("/api/stations/search")
async def search_stations(
    name: str = "",
    country: str = "",
    tag: str = "",
    limit: int = 30,
    offset: int = 0,
):
    params = {
        "limit": limit,
        "offset": offset,
        "order": "votes",
        "reverse": "true",
        # Let the frontend handle dead-station grayout + sorting;
        # hiding them here prevents the UI from ever showing the dead badge.
    }
    if name:
        params["name"] = name
    if country:
        params["countrycode"] = country.upper()
    if tag:
        params["tag"] = tag

    endpoint = "/stations/search" if (name or country or tag) else "/stations/topvote"
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.get(f"{RADIO_API}{endpoint}", params=params)
        resp.raise_for_status()
        return resp.json()


@app.get("/api/stations/countries")
async def get_countries():
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.get(f"{RADIO_API}/countries")
        resp.raise_for_status()
        data = resp.json()
        return [
            {"name": c["name"], "code": c["iso_3166_1"], "count": c["stationcount"]}
            for c in data
            if c.get("iso_3166_1") and c.get("stationcount", 0) > 0
        ]


@app.get("/api/stations/random")
async def get_random_station():
    import random
    offset = random.randint(0, 400)
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.get(
            f"{RADIO_API}/stations/topvote",
            params={"limit": 1, "offset": offset, "hidebroken": "true"},
        )
        resp.raise_for_status()
        data = resp.json()
        return data[0] if data else {}


@app.get("/api/stations/uuid/{uuid}")
async def get_station_by_uuid(uuid: str):
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.get(f"{RADIO_API}/stations/byuuid/{uuid}")
        resp.raise_for_status()
        data = resp.json()
        return data[0] if data else {}


@app.get("/api/stations/tags")
async def get_tags():
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.get(
            f"{RADIO_API}/tags",
            params={"limit": 50, "order": "stationcount", "reverse": "true"},
        )
        resp.raise_for_status()
        data = resp.json()
        return [{"name": t["name"], "count": t["stationcount"]} for t in data]


@app.post("/api/stations/check")
async def check_stations_status(body: dict):
    """Batch-check via Radio Browser lastcheckok (used for favorites)."""
    uuids = body.get("uuids", [])[:40]
    if not uuids:
        return {}

    async def check_one(client: httpx.AsyncClient, uuid: str):
        try:
            resp = await client.get(f"{RADIO_API}/stations/byuuid/{uuid}", timeout=8)
            data = resp.json()
            if data:
                return uuid, data[0].get("lastcheckok", 1)
            return uuid, 0
        except Exception:
            return uuid, 1

    async with httpx.AsyncClient(timeout=15) as client:
        results = await asyncio.gather(*[check_one(client, u) for u in uuids])
        return dict(results)


@app.post("/api/stations/check-live")
async def check_stations_live(body: dict):
    """Real-time probe: actually try to open each stream URL."""
    stations = body.get("stations", [])[:15]   # max 15 concurrent
    if not stations:
        return {}

    _headers = {"User-Agent": "Mozilla/5.0 (compatible; Bolandio/1.0)"}

    async def probe(client: httpx.AsyncClient, uuid: str, url: str):
        # 1. Try HEAD (cheap, no body)
        try:
            r = await client.head(
                url, timeout=5, follow_redirects=True, headers=_headers
            )
            return uuid, 1 if r.status_code < 400 else 0
        except httpx.RemoteProtocolError:
            # ICY/SHOUTcast streams respond with "ICY 200 OK" which is
            # not standard HTTP – connection succeeded, treat as alive.
            return uuid, 1
        except (httpx.ConnectError, httpx.TimeoutException):
            return uuid, 0
        except Exception:
            pass  # HEAD not supported; fall through to streaming GET

        # 2. Fall back to streaming GET (read only headers, close immediately)
        try:
            async with client.stream(
                "GET", url,
                timeout=httpx.Timeout(connect=5, read=2, write=5, pool=5),
                follow_redirects=True,
                headers=_headers,
            ) as r:
                return uuid, 1 if r.status_code < 400 else 0
        except httpx.RemoteProtocolError:
            return uuid, 1   # ICY again → alive
        except Exception:
            return uuid, 0

    async with httpx.AsyncClient(timeout=15) as client:
        results = await asyncio.gather(
            *[probe(client, s["uuid"], s["url"]) for s in stations]
        )
        return dict(results)


# ── Favorites (auth required) ─────────────────────────────────────────────────

@app.get("/api/favorites")
def get_favorites(user=Depends(get_current_user)):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    rows = conn.execute(
        "SELECT * FROM favorites WHERE user_id=? ORDER BY group_name, added_at DESC",
        (user["id"],),
    ).fetchall()
    conn.close()
    return [dict(r) for r in rows]


@app.get("/api/favorites/groups")
def get_groups(user=Depends(get_current_user)):
    conn = sqlite3.connect(DB_PATH)
    rows = conn.execute(
        "SELECT DISTINCT group_name FROM favorites WHERE user_id=? ORDER BY group_name",
        (user["id"],),
    ).fetchall()
    conn.close()
    return [r[0] for r in rows]


@app.post("/api/favorites")
def add_favorite(station: FavoriteStation, user=Depends(get_current_user)):
    conn = sqlite3.connect(DB_PATH)
    try:
        conn.execute(
            """INSERT OR REPLACE INTO favorites
               (user_id, stationuuid, name, url, country, tags, favicon, group_name)
               VALUES (?,?,?,?,?,?,?,?)""",
            (
                user["id"],
                station.stationuuid,
                station.name,
                station.url,
                station.country,
                station.tags,
                station.favicon,
                station.group_name,
            ),
        )
        conn.commit()
    finally:
        conn.close()
    return {"ok": True}


@app.patch("/api/favorites/{stationuuid}/group")
def move_to_group(stationuuid: str, body: dict, user=Depends(get_current_user)):
    group_name = body.get("group_name", "默认")
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        "UPDATE favorites SET group_name=? WHERE stationuuid=? AND user_id=?",
        (group_name, stationuuid, user["id"]),
    )
    conn.commit()
    conn.close()
    return {"ok": True}


@app.delete("/api/favorites/{stationuuid}")
def remove_favorite(stationuuid: str, user=Depends(get_current_user)):
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        "DELETE FROM favorites WHERE stationuuid=? AND user_id=?",
        (stationuuid, user["id"]),
    )
    conn.commit()
    conn.close()
    return {"ok": True}


# ── Static / SPA fallback ─────────────────────────────────────────────────────

app.mount("/static", StaticFiles(directory=FRONTEND_PATH), name="static")


@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    file = FRONTEND_PATH / full_path
    if file.exists() and file.is_file():
        return FileResponse(file)
    return FileResponse(FRONTEND_PATH / "index.html")
