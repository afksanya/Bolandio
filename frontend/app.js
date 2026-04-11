// ── i18n ──────────────────────────────────────────────────────
const STRINGS = {
  zh: {
    title: "🌍 全球电台",
    discover: "发现",
    favorites: "收藏",
    searchPlaceholder: "搜索电台名称...",
    allCountries: "全部国家",
    allGenres: "全部风格",
    search: "搜索",
    loading: "加载中...",
    loadMore: "加载更多",
    emptyFav: "还没有收藏，去发现页收藏喜欢的电台吧 ✨",
    addToGroup: "添加到分组",
    newGroup: "新建分组名称...",
    create: "创建",
    newGroupTitle: "新建分组",
    newGroupPlaceholder: "分组名称...",
    connFailed: "连接失败，请尝试其他电台",
    timer: "定时",
    min: "分钟",
    allGroups: "全部",
    moveToGroup: "移动到分组",
  },
  en: {
    title: "🌍 Global Radio",
    discover: "Discover",
    favorites: "Favorites",
    searchPlaceholder: "Search stations...",
    allCountries: "All Countries",
    allGenres: "All Genres",
    search: "Search",
    loading: "Loading...",
    loadMore: "Load More",
    emptyFav: "No favorites yet. Go discover some stations ✨",
    addToGroup: "Add to Group",
    newGroup: "New group name...",
    create: "Create",
    newGroupTitle: "New Group",
    newGroupPlaceholder: "Group name...",
    connFailed: "Connection failed, try another station",
    timer: "Timer",
    min: "min",
    allGroups: "All",
    moveToGroup: "Move to Group",
  },
};

let lang = localStorage.getItem("lang") || "zh";
const t = key => STRINGS[lang][key] || key;

function applyLang() {
  document.getElementById("app-title").textContent = t("title");
  document.getElementById("tab-btn-discover").textContent = t("discover");
  document.getElementById("tab-btn-favorites").textContent = t("favorites");
  document.getElementById("search-input").placeholder = t("searchPlaceholder");
  document.getElementById("filter-country").options[0].textContent = t("allCountries");
  document.getElementById("filter-tag").options[0].textContent = t("allGenres");
  document.getElementById("btn-search").textContent = t("search");
  document.getElementById("btn-load-more").textContent = t("loadMore");
  document.getElementById("btn-lang").textContent = lang === "zh" ? "EN" : "中";
  const sleepSel = document.getElementById("sleep-select");
  sleepSel.options[0].textContent = t("timer");
  for (let i = 1; i < sleepSel.options.length; i++) {
    const mins = sleepSel.options[i].value;
    sleepSel.options[i].textContent = lang === "zh" ? `${mins}${t("min")}` : `${mins} min`;
  }
}

document.getElementById("btn-lang").addEventListener("click", () => {
  lang = lang === "zh" ? "en" : "zh";
  localStorage.setItem("lang", lang);
  applyLang();
  renderFavorites();
});

// ── Theme ─────────────────────────────────────────────────────
const html = document.documentElement;
const metaTheme = document.getElementById("meta-theme-color");
const THEME_COLORS = { dark: "#0d0d1a", light: "#f0f2ff" };

let theme = localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

function applyTheme(t) {
  theme = t;
  html.dataset.theme = t;
  metaTheme.content = THEME_COLORS[t];
  document.getElementById("btn-theme").textContent = t === "dark" ? "🌙" : "☀️";
  localStorage.setItem("theme", t);
}

applyTheme(theme);

document.getElementById("btn-theme").addEventListener("click", () => {
  applyTheme(theme === "dark" ? "light" : "dark");
});

// ── State ─────────────────────────────────────────────────────
let currentStation = null;
let favorites = new Map();   // uuid → station data (with group_name)
let isPlaying = false;
let sleepTimer = null;
let sleepEnd = null;
let sleepTick = null;
let currentOffset = 0;
let lastQuery = {};
let activeGroup = "__all__";
let pendingFavStation = null;   // station waiting for group selection

// ── DOM ───────────────────────────────────────────────────────
const audio = document.getElementById("audio-player");
const player = document.getElementById("player");
const playerName = document.getElementById("player-name");
const playerMeta = document.getElementById("player-meta");
const playerFavicon = document.getElementById("player-favicon");
const playerFaviconPlaceholder = document.getElementById("player-favicon-placeholder");
const btnPlayPause = document.getElementById("btn-play-pause");
const btnFavPlayer = document.getElementById("btn-fav-player");
const sleepSelect = document.getElementById("sleep-select");
const sleepCountdown = document.getElementById("sleep-countdown");
const stationList = document.getElementById("station-list");
const favoritesList = document.getElementById("favorites-list");
const loadMoreWrap = document.getElementById("load-more-wrap");
const groupBar = document.getElementById("group-bar");
const modalGroupPicker = document.getElementById("modal-group-picker");
const modalNewGroup = document.getElementById("modal-new-group");

// ── Tabs ──────────────────────────────────────────────────────
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(`tab-${tab.dataset.tab}`).classList.add("active");
    if (tab.dataset.tab === "favorites") renderFavorites();
  });
});

// ── Search ────────────────────────────────────────────────────
document.getElementById("btn-search").addEventListener("click", doSearch);
document.getElementById("search-input").addEventListener("keydown", e => {
  if (e.key === "Enter") doSearch();
});

function doSearch() {
  currentOffset = 0;
  lastQuery = {
    name: document.getElementById("search-input").value.trim(),
    country: document.getElementById("filter-country").value,
    tag: document.getElementById("filter-tag").value,
  };
  loadStations(true);
}

document.getElementById("btn-load-more").addEventListener("click", () => {
  currentOffset += 30;
  loadStations(false);
});

async function loadStations(reset) {
  if (reset) {
    stationList.innerHTML = `<div class="loading">${t("loading")}</div>`;
    loadMoreWrap.style.display = "none";
  }
  const params = new URLSearchParams({ limit: 30, offset: currentOffset, ...lastQuery });
  const data = await apiFetch(`/api/stations/search?${params}`);
  if (!data) return;
  if (reset) stationList.innerHTML = "";
  data.forEach(s => renderStationCard(s, stationList));
  loadMoreWrap.style.display = data.length === 30 ? "block" : "none";
}

// ── Station Card ──────────────────────────────────────────────
function renderStationCard(station, container, opts = {}) {
  const card = document.createElement("div");
  const isPlaying = currentStation?.stationuuid === station.stationuuid;
  card.className = "station-card" + (isPlaying ? " playing" : "");
  card.dataset.uuid = station.stationuuid;

  const isFav = favorites.has(station.stationuuid);
  const tags = station.tags ? station.tags.split(",").slice(0, 2).join(", ") : "";
  const meta = [station.country, tags].filter(Boolean).join(" · ");

  card.innerHTML = `
    <div class="station-favicon-wrap">
      ${station.favicon
        ? `<img class="station-favicon" src="${escHtml(station.favicon)}" alt=""
             onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
        : ""}
      <div class="station-favicon-placeholder" ${station.favicon ? 'style="display:none"' : ""}>📻</div>
      <div class="equalizer"><span></span><span></span><span></span></div>
    </div>
    <div class="station-info">
      <div class="station-name">${escHtml(station.name)}</div>
      <div class="station-meta">${escHtml(meta)}</div>
    </div>
    <div class="station-actions">
      <button class="btn-fav ${isFav ? "active" : ""}">${isFav ? "♥" : "♡"}</button>
    </div>
  `;

  card.querySelector(".btn-fav").addEventListener("click", e => {
    e.stopPropagation();
    if (favorites.has(station.stationuuid)) {
      removeFavorite(station.stationuuid);
      syncFavBtn(station.stationuuid, false);
    } else {
      openGroupPicker(station);
    }
  });

  card.addEventListener("click", () => playStation(station));
  container.appendChild(card);
}

function syncFavBtn(uuid, isFav) {
  document.querySelectorAll(`.station-card[data-uuid="${uuid}"] .btn-fav`).forEach(btn => {
    btn.classList.toggle("active", isFav);
    btn.textContent = isFav ? "♥" : "♡";
  });
  if (currentStation?.stationuuid === uuid) {
    btnFavPlayer.classList.toggle("active", isFav);
    btnFavPlayer.textContent = isFav ? "♥" : "♡";
  }
}

// ── Player ────────────────────────────────────────────────────
function playStation(station) {
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
    playerFaviconPlaceholder.style.display = "none";
  } else {
    playerFavicon.style.display = "none";
    playerFaviconPlaceholder.style.display = "";
  }

  const isFav = favorites.has(station.stationuuid);
  btnFavPlayer.classList.toggle("active", isFav);
  btnFavPlayer.textContent = isFav ? "♥" : "♡";

  player.classList.remove("hidden");
  player.classList.add("playing");
  isPlaying = true;
  btnPlayPause.textContent = "⏸";

  setupMediaSession(station);
}

btnPlayPause.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    btnPlayPause.textContent = "▶";
    player.classList.remove("playing");
  } else {
    audio.play().catch(() => {});
    isPlaying = true;
    btnPlayPause.textContent = "⏸";
    player.classList.add("playing");
  }
});

btnFavPlayer.addEventListener("click", () => {
  if (!currentStation) return;
  if (favorites.has(currentStation.stationuuid)) {
    removeFavorite(currentStation.stationuuid);
    syncFavBtn(currentStation.stationuuid, false);
  } else {
    openGroupPicker(currentStation);
  }
});

audio.addEventListener("waiting", () => player.classList.add("buffering"));
audio.addEventListener("playing", () => player.classList.remove("buffering"));
audio.addEventListener("error", () => {
  player.classList.remove("buffering");
  playerMeta.textContent = t("connFailed");
});

// ── Media Session ─────────────────────────────────────────────
function setupMediaSession(station) {
  if (!("mediaSession" in navigator)) return;
  navigator.mediaSession.metadata = new MediaMetadata({
    title: station.name,
    artist: station.country || t("title"),
    artwork: station.favicon ? [{ src: station.favicon, sizes: "512x512" }] : [],
  });
  navigator.mediaSession.setActionHandler("play", () => {
    audio.play(); isPlaying = true; btnPlayPause.textContent = "⏸"; player.classList.add("playing");
  });
  navigator.mediaSession.setActionHandler("pause", () => {
    audio.pause(); isPlaying = false; btnPlayPause.textContent = "▶"; player.classList.remove("playing");
  });
}

// ── Sleep Timer ───────────────────────────────────────────────
sleepSelect.addEventListener("change", () => {
  const minutes = parseInt(sleepSelect.value);
  clearSleepTimer();
  if (minutes > 0) {
    sleepEnd = Date.now() + minutes * 60 * 1000;
    sleepTimer = setTimeout(() => {
      audio.pause(); isPlaying = false;
      btnPlayPause.textContent = "▶";
      player.classList.remove("playing");
      sleepCountdown.textContent = "";
      sleepSelect.value = "0";
    }, minutes * 60 * 1000);
    sleepTick = setInterval(updateSleepCountdown, 1000);
    updateSleepCountdown();
  }
});

function clearSleepTimer() {
  clearTimeout(sleepTimer); clearInterval(sleepTick);
  sleepEnd = null; sleepCountdown.textContent = "";
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
  data.forEach(s => favorites.set(s.stationuuid, s));
}

async function removeFavorite(uuid) {
  favorites.delete(uuid);
  await apiFetch(`/api/favorites/${uuid}`, { method: "DELETE" });
  renderFavorites();
}

async function addFavorite(station, groupName) {
  const entry = { ...station, group_name: groupName, url: station.url_resolved || station.url };
  favorites.set(station.stationuuid, entry);
  await apiFetch("/api/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      stationuuid: station.stationuuid,
      name: station.name,
      url: entry.url,
      country: station.country || "",
      tags: station.tags || "",
      favicon: station.favicon || "",
      group_name: groupName,
    }),
  });
  syncFavBtn(station.stationuuid, true);
  renderFavorites();
}

// ── Group Picker Modal ────────────────────────────────────────
function openGroupPicker(station) {
  pendingFavStation = station;
  const title = document.getElementById("modal-group-title");
  title.textContent = t("addToGroup");

  const opts = document.getElementById("modal-group-options");
  opts.innerHTML = "";
  document.getElementById("modal-new-group-input").placeholder = t("newGroup");
  document.getElementById("modal-new-group-btn").textContent = t("create");

  const groups = getGroups();
  (groups.length ? groups : ["默认"]).forEach(g => {
    const div = document.createElement("div");
    div.className = "group-option";
    div.textContent = g;
    div.addEventListener("click", () => {
      closeModal(modalGroupPicker);
      addFavorite(station, g);
    });
    opts.appendChild(div);
  });

  openModal(modalGroupPicker);
}

document.getElementById("modal-new-group-btn").addEventListener("click", () => {
  const input = document.getElementById("modal-new-group-input");
  const name = input.value.trim();
  if (!name || !pendingFavStation) return;
  input.value = "";
  closeModal(modalGroupPicker);
  addFavorite(pendingFavStation, name);
});

// Close modal on overlay click
modalGroupPicker.addEventListener("click", e => { if (e.target === modalGroupPicker) closeModal(modalGroupPicker); });
modalNewGroup.addEventListener("click", e => { if (e.target === modalNewGroup) closeModal(modalNewGroup); });

// New group from favorites tab
document.getElementById("btn-add-group").addEventListener("click", () => {
  document.getElementById("new-group-input").value = "";
  document.getElementById("new-group-input").placeholder = t("newGroupPlaceholder");
  openModal(modalNewGroup);
});

document.getElementById("new-group-confirm-btn").addEventListener("click", () => {
  const name = document.getElementById("new-group-input").value.trim();
  if (!name) return;
  closeModal(modalNewGroup);
  activeGroup = name;
  renderFavorites();
});

function openModal(el) { el.classList.add("open"); }
function closeModal(el) { el.classList.remove("open"); }

// ── Group Bar ─────────────────────────────────────────────────
function getGroups() {
  const groups = new Set();
  favorites.forEach(s => groups.add(s.group_name || "默认"));
  return [...groups].sort();
}

function renderGroupBar() {
  // Remove all chips (keep the + button)
  groupBar.querySelectorAll(".group-chip").forEach(c => c.remove());
  const addBtn = document.getElementById("btn-add-group");

  const allChip = document.createElement("button");
  allChip.className = "group-chip" + (activeGroup === "__all__" ? " active" : "");
  allChip.textContent = t("allGroups");
  allChip.dataset.group = "__all__";
  allChip.addEventListener("click", () => { activeGroup = "__all__"; renderFavorites(); });
  groupBar.insertBefore(allChip, addBtn);

  getGroups().forEach(g => {
    const chip = document.createElement("button");
    chip.className = "group-chip" + (activeGroup === g ? " active" : "");
    chip.textContent = g;
    chip.dataset.group = g;
    chip.addEventListener("click", () => { activeGroup = g; renderFavorites(); });
    groupBar.insertBefore(chip, addBtn);
  });
}

function renderFavorites() {
  renderGroupBar();
  favoritesList.innerHTML = "";

  let items = [...favorites.values()];
  if (activeGroup !== "__all__") {
    items = items.filter(s => (s.group_name || "默认") === activeGroup);
  }

  if (items.length === 0) {
    favoritesList.innerHTML = `<div class="empty">${t("emptyFav")}</div>`;
    return;
  }

  // Group by group_name if showing all
  if (activeGroup === "__all__") {
    const grouped = {};
    items.forEach(s => {
      const g = s.group_name || "默认";
      if (!grouped[g]) grouped[g] = [];
      grouped[g].push(s);
    });
    Object.entries(grouped).sort(([a],[b]) => a.localeCompare(b)).forEach(([g, stations]) => {
      const header = document.createElement("div");
      header.className = "section-header";
      header.textContent = g;
      favoritesList.appendChild(header);
      stations.forEach(s => renderStationCard(s, favoritesList));
    });
  } else {
    items.forEach(s => renderStationCard(s, favoritesList));
  }
}

// ── Filters (country / tag) ───────────────────────────────────
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
  } catch { return null; }
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ── Init ───────────────────────────────────────────────────────
(async () => {
  applyLang();
  await Promise.all([loadFavorites(), loadFilters()]);
  lastQuery = {};
  await loadStations(true);
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
})();
