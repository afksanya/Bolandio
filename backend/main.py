import os
import httpx
import sqlite3
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from pathlib import Path

_data_dir = Path(os.environ.get("DATA_DIR", Path(__file__).parent))
DB_PATH = _data_dir / "favorites.db"
FRONTEND_PATH = Path(__file__).parent.parent / "frontend"
RADIO_API = "https://de1.api.radio-browser.info/json"


def init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS favorites (
            stationuuid TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            url TEXT NOT NULL,
            country TEXT,
            tags TEXT,
            favicon TEXT,
            group_name TEXT DEFAULT '默认',
            added_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    # migrate existing tables
    try:
        conn.execute("ALTER TABLE favorites ADD COLUMN group_name TEXT DEFAULT '默认'")
    except Exception:
        pass
    conn.commit()
    conn.close()


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(lifespan=lifespan)


class FavoriteStation(BaseModel):
    stationuuid: str
    name: str
    url: str
    country: str = ""
    tags: str = ""
    favicon: str = ""
    group_name: str = "默认"


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
        "hidebroken": "true",
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
        resp = await client.get(f"{RADIO_API}/stations/topvote", params={
            "limit": 1, "offset": offset, "hidebroken": "true"
        })
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
        resp = await client.get(f"{RADIO_API}/tags", params={"limit": 50, "order": "stationcount", "reverse": "true"})
        resp.raise_for_status()
        data = resp.json()
        return [{"name": t["name"], "count": t["stationcount"]} for t in data]


@app.get("/api/favorites")
def get_favorites():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    rows = conn.execute("SELECT * FROM favorites ORDER BY group_name, added_at DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]


@app.get("/api/favorites/groups")
def get_groups():
    conn = sqlite3.connect(DB_PATH)
    rows = conn.execute("SELECT DISTINCT group_name FROM favorites ORDER BY group_name").fetchall()
    conn.close()
    return [r[0] for r in rows]


@app.post("/api/favorites")
def add_favorite(station: FavoriteStation):
    conn = sqlite3.connect(DB_PATH)
    try:
        conn.execute(
            "INSERT OR REPLACE INTO favorites (stationuuid, name, url, country, tags, favicon, group_name) VALUES (?,?,?,?,?,?,?)",
            (station.stationuuid, station.name, station.url, station.country, station.tags, station.favicon, station.group_name),
        )
        conn.commit()
    finally:
        conn.close()
    return {"ok": True}


@app.patch("/api/favorites/{stationuuid}/group")
def move_to_group(stationuuid: str, body: dict):
    group_name = body.get("group_name", "默认")
    conn = sqlite3.connect(DB_PATH)
    conn.execute("UPDATE favorites SET group_name=? WHERE stationuuid=?", (group_name, stationuuid))
    conn.commit()
    conn.close()
    return {"ok": True}


@app.delete("/api/favorites/{stationuuid}")
def remove_favorite(stationuuid: str):
    conn = sqlite3.connect(DB_PATH)
    conn.execute("DELETE FROM favorites WHERE stationuuid = ?", (stationuuid,))
    conn.commit()
    conn.close()
    return {"ok": True}


app.mount("/static", StaticFiles(directory=FRONTEND_PATH), name="static")


@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    file = FRONTEND_PATH / full_path
    if file.exists() and file.is_file():
        return FileResponse(file)
    return FileResponse(FRONTEND_PATH / "index.html")
