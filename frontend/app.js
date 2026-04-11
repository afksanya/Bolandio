const API = "";  // same origin

// State
let currentStation = null;
let favorites = new Set();
let favoritesData = {};
let isPlaying = false;
let sleepTimer = null;
let sleepEnd = null;
let sleepTick = null;
let currentOffset = 0;
let lastQuery = {};
let allStations = [];

// DOM
const audio = document.getElementById("audio-player");
const player = document.getElementById("player");
const playerName = document.getElementById("player-name");
const playerMeta = document.getElementById("player-meta");
const playerFavicon = document.getElementById("player-favicon");
const btnPlayPause = document.getElementById("btn-play-pause");
const btnFavPlayer = document.getElementById("btn-fav-player");
const sleepSelect = document.getElementById("sleep-select");
const sleepCountdown = document.getElementById("sleep-countdown");
const stationList = document.getElementById("station-list");
const favoritesList = document.getElementById("favorites-list");
const loadMoreWrap = document.getElementById("load-more-wrap");

// ── Tab switching ──────────────────────────────────────────────
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(`tab-${tab.dataset.tab}`).classList.add("active");
    if (tab.dataset.tab === "favorites") renderFavorites();
  });
});

// ── Search / Filters ──────────────────────────────────────────
document.getElementById("btn-search").addEventListener("click", () => {
  currentOffset = 0;
  allStations = [];
  lastQuery = {
    name: document.getElementById("search-input").value.trim(),
    country: document.getElementById("filter-country").value,
    tag: document.getElementById("filter-tag").value,
  };
  loadStations(true);
});

document.getElementById("btn-load-more").addEventListener("click", () => {
  currentOffset += 30;
  loadStations(false);
});

async function loadStations(reset) {
  if (reset) {
    stationList.innerHTML = '<div class="loading">加载中...</div>';
    loadMoreWrap.style.display = "none";
  }

  const params = new URLSearchParams({ limit: 30, offset: currentOffset, ...lastQuery });
  const data = await apiFetch(`/api/stations/search?${params}`);
  if (!data) return;

  if (reset) stationList.innerHTML = "";

  allStations = reset ? data : [...allStations, ...data];
  data.forEach(s => renderStationCard(s, stationList));
  loadMoreWrap.style.display = data.length === 30 ? "block" : "none";
}

function renderStationCard(station, container) {
  const card = document.createElement("div");
  card.className = "station-card" + (currentStation?.stationuuid === station.stationuuid ? " playing" : "");
  card.dataset.uuid = station.stationuuid;

  const favicon = station.favicon
    ? `<img class="station-favicon" src="${escHtml(station.favicon)}" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
    : "";
  const placeholder = `<div class="station-favicon-placeholder" ${station.favicon ? 'style="display:none"' : ""}>📻</div>`;

  const isFav = favorites.has(station.stationuuid);
  card.innerHTML = `
    ${favicon}${placeholder}
    <div class="station-info">
      <div class="station-name">${escHtml(station.name)}</div>
      <div class="station-meta">${escHtml(station.country || "")}${station.tags ? " · " + escHtml(station.tags.split(",").slice(0, 2).join(", ")) : ""}</div>
    </div>
    <div class="station-actions">
      <button class="btn-fav ${isFav ? "active" : ""}" data-uuid="${escHtml(station.stationuuid)}">${isFav ? "♥" : "♡"}</button>
    </div>
  `;

  card.querySelector(".btn-fav").addEventListener("click", e => {
    e.stopPropagation();
    toggleFavorite(station);
    const btn = e.currentTarget;
    const nowFav = favorites.has(station.stationuuid);
    btn.classList.toggle("active", nowFav);
    btn.textContent = nowFav ? "♥" : "♡";
    if (currentStation?.stationuuid === station.stationuuid) {
      btnFavPlayer.classList.toggle("active", nowFav);
      btnFavPlayer.textContent = nowFav ? "♥" : "♡";
    }
  });

  card.addEventListener("click", () => playStation(station));
  container.appendChild(card);
}

// ── Player ────────────────────────────────────────────────────
function playStation(station) {
  // Update playing highlight
  document.querySelectorAll(".station-card").forEach(c => c.classList.remove("playing"));
  document.querySelector(`.station-card[data-uuid="${station.stationuuid}"]`)?.classList.add("playing");

  currentStation = station;
  audio.src = station.url_resolved || station.url;
  audio.load();
  audio.play().catch(() => {});

  playerName.textContent = station.name;
  playerMeta.textContent = [station.country, station.tags?.split(",")[0]].filter(Boolean).join(" · ");
  if (station.favicon) {
    playerFavicon.src = station.favicon;
    playerFavicon.style.display = "";
  } else {
    playerFavicon.style.display = "none";
  }

  const isFav = favorites.has(station.stationuuid);
  btnFavPlayer.classList.toggle("active", isFav);
  btnFavPlayer.textContent = isFav ? "♥" : "♡";

  player.classList.remove("hidden");
  isPlaying = true;
  btnPlayPause.textContent = "⏸";

  setupMediaSession(station);
}

btnPlayPause.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    btnPlayPause.textContent = "▶";
    player.classList.remove("buffering");
  } else {
    audio.play().catch(() => {});
    isPlaying = true;
    btnPlayPause.textContent = "⏸";
  }
});

btnFavPlayer.addEventListener("click", () => {
  if (!currentStation) return;
  toggleFavorite(currentStation);
  const isFav = favorites.has(currentStation.stationuuid);
  btnFavPlayer.classList.toggle("active", isFav);
  btnFavPlayer.textContent = isFav ? "♥" : "♡";
  // sync list card
  document.querySelector(`.station-card[data-uuid="${currentStation.stationuuid}"] .btn-fav`)
    ?.setAttribute("class", `btn-fav ${isFav ? "active" : ""}`);
});

audio.addEventListener("waiting", () => player.classList.add("buffering"));
audio.addEventListener("playing", () => player.classList.remove("buffering"));
audio.addEventListener("error", () => {
  player.classList.remove("buffering");
  playerMeta.textContent = "连接失败，请尝试其他电台";
});

// ── Media Session (锁屏控制) ────────────────────────────────────
function setupMediaSession(station) {
  if (!("mediaSession" in navigator)) return;
  navigator.mediaSession.metadata = new MediaMetadata({
    title: station.name,
    artist: station.country || "全球电台",
    artwork: station.favicon ? [{ src: station.favicon, sizes: "512x512" }] : [],
  });
  navigator.mediaSession.setActionHandler("play", () => { audio.play(); isPlaying = true; btnPlayPause.textContent = "⏸"; });
  navigator.mediaSession.setActionHandler("pause", () => { audio.pause(); isPlaying = false; btnPlayPause.textContent = "▶"; });
}

// ── Sleep Timer ────────────────────────────────────────────────
sleepSelect.addEventListener("change", () => {
  const minutes = parseInt(sleepSelect.value);
  clearSleepTimer();
  if (minutes > 0) {
    sleepEnd = Date.now() + minutes * 60 * 1000;
    sleepTimer = setTimeout(() => {
      audio.pause();
      isPlaying = false;
      btnPlayPause.textContent = "▶";
      sleepCountdown.textContent = "";
      sleepSelect.value = "0";
    }, minutes * 60 * 1000);
    sleepTick = setInterval(updateSleepCountdown, 1000);
    updateSleepCountdown();
  }
});

function clearSleepTimer() {
  clearTimeout(sleepTimer);
  clearInterval(sleepTick);
  sleepEnd = null;
  sleepCountdown.textContent = "";
}

function updateSleepCountdown() {
  if (!sleepEnd) return;
  const rem = Math.max(0, Math.ceil((sleepEnd - Date.now()) / 1000));
  const m = Math.floor(rem / 60), s = rem % 60;
  sleepCountdown.textContent = `${m}:${s.toString().padStart(2, "0")}`;
}

// ── Favorites ─────────────────────────────────────────────────
async function loadFavorites() {
  const data = await apiFetch("/api/favorites");
  if (!data) return;
  favorites.clear();
  favoritesData = {};
  data.forEach(s => {
    favorites.add(s.stationuuid);
    favoritesData[s.stationuuid] = s;
  });
}

async function toggleFavorite(station) {
  if (favorites.has(station.stationuuid)) {
    favorites.delete(station.stationuuid);
    delete favoritesData[station.stationuuid];
    await apiFetch(`/api/favorites/${station.stationuuid}`, { method: "DELETE" });
  } else {
    favorites.add(station.stationuuid);
    favoritesData[station.stationuuid] = station;
    await apiFetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stationuuid: station.stationuuid,
        name: station.name,
        url: station.url_resolved || station.url,
        country: station.country || "",
        tags: station.tags || "",
        favicon: station.favicon || "",
      }),
    });
  }
}

function renderFavorites() {
  favoritesList.innerHTML = "";
  const items = Object.values(favoritesData);
  if (items.length === 0) {
    favoritesList.innerHTML = '<div class="empty">还没有收藏，去发现页收藏喜欢的电台吧 ✨</div>';
    return;
  }
  items.forEach(s => renderStationCard(s, favoritesList));
}

// ── Country & Tag filters ──────────────────────────────────────
async function loadFilters() {
  const [countries, tags] = await Promise.all([
    apiFetch("/api/stations/countries"),
    apiFetch("/api/stations/tags"),
  ]);

  const countrySelect = document.getElementById("filter-country");
  (countries || []).sort((a, b) => a.name.localeCompare(b.name)).forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.code;
    opt.textContent = `${c.name} (${c.count})`;
    countrySelect.appendChild(opt);
  });

  const tagSelect = document.getElementById("filter-tag");
  (tags || []).forEach(t => {
    const opt = document.createElement("option");
    opt.value = t.name;
    opt.textContent = `${t.name} (${t.count})`;
    tagSelect.appendChild(opt);
  });
}

// ── Utils ──────────────────────────────────────────────────────
async function apiFetch(url, options) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) return null;
    if (options?.method === "DELETE") return {};
    return res.json();
  } catch {
    return null;
  }
}

function escHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ── Init ───────────────────────────────────────────────────────
(async () => {
  await Promise.all([loadFavorites(), loadFilters()]);
  lastQuery = {};
  await loadStations(true);

  // Register service worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }
})();
