// ── 国家中文映射（ISO 3166-1 → 中文）────────────────────────────
const COUNTRY_ZH = {
  AD:"安道尔",AE:"阿联酋",AF:"阿富汗",AG:"安提瓜和巴布达",AL:"阿尔巴尼亚",AM:"亚美尼亚",AO:"安哥拉",AR:"阿根廷",AT:"奥地利",AU:"澳大利亚",AZ:"阿塞拜疆",
  BA:"波黑",BB:"巴巴多斯",BD:"孟加拉国",BE:"比利时",BF:"布基纳法索",BG:"保加利亚",BH:"巴林",BI:"布隆迪",BJ:"贝宁",BN:"文莱",BO:"玻利维亚",BR:"巴西",BS:"巴哈马",BT:"不丹",BW:"博茨瓦纳",BY:"白俄罗斯",BZ:"伯利兹",
  CA:"加拿大",CD:"刚果（金）",CF:"中非",CG:"刚果（布）",CH:"瑞士",CI:"科特迪瓦",CL:"智利",CM:"喀麦隆",CN:"中国",CO:"哥伦比亚",CR:"哥斯达黎加",CU:"古巴",CV:"佛得角",CY:"塞浦路斯",CZ:"捷克",
  DE:"德国",DJ:"吉布提",DK:"丹麦",DM:"多米尼克",DO:"多米尼加",DZ:"阿尔及利亚",
  EC:"厄瓜多尔",EE:"爱沙尼亚",EG:"埃及",ER:"厄立特里亚",ES:"西班牙",ET:"埃塞俄比亚",
  FI:"芬兰",FJ:"斐济",FR:"法国",
  GA:"加蓬",GB:"英国",GD:"格林纳达",GE:"格鲁吉亚",GH:"加纳",GM:"冈比亚",GN:"几内亚",GQ:"赤道几内亚",GR:"希腊",GT:"危地马拉",GW:"几内亚比绍",GY:"圭亚那",
  HN:"洪都拉斯",HR:"克罗地亚",HT:"海地",HU:"匈牙利",
  ID:"印度尼西亚",IE:"爱尔兰",IL:"以色列",IN:"印度",IQ:"伊拉克",IR:"伊朗",IS:"冰岛",IT:"意大利",
  JM:"牙买加",JO:"约旦",JP:"日本",
  KE:"肯尼亚",KG:"吉尔吉斯斯坦",KH:"柬埔寨",KI:"基里巴斯",KM:"科摩罗",KN:"圣基茨和尼维斯",KP:"朝鲜",KR:"韩国",KW:"科威特",KZ:"哈萨克斯坦",
  LA:"老挝",LB:"黎巴嫩",LC:"圣卢西亚",LI:"列支敦士登",LK:"斯里兰卡",LR:"利比里亚",LS:"莱索托",LT:"立陶宛",LU:"卢森堡",LV:"拉脱维亚",LY:"利比亚",
  MA:"摩洛哥",MC:"摩纳哥",MD:"摩尔多瓦",ME:"黑山",MG:"马达加斯加",MK:"北马其顿",ML:"马里",MM:"缅甸",MN:"蒙古",MR:"毛里塔尼亚",MT:"马耳他",MU:"毛里求斯",MV:"马尔代夫",MW:"马拉维",MX:"墨西哥",MY:"马来西亚",MZ:"莫桑比克",
  NA:"纳米比亚",NE:"尼日尔",NG:"尼日利亚",NI:"尼加拉瓜",NL:"荷兰",NO:"挪威",NP:"尼泊尔",NR:"瑙鲁",NZ:"新西兰",
  OM:"阿曼",
  PA:"巴拿马",PE:"秘鲁",PG:"巴布亚新几内亚",PH:"菲律宾",PK:"巴基斯坦",PL:"波兰",PT:"葡萄牙",PW:"帕劳",PY:"巴拉圭",
  QA:"卡塔尔",
  RO:"罗马尼亚",RS:"塞尔维亚",RU:"俄罗斯",RW:"卢旺达",
  SA:"沙特阿拉伯",SB:"所罗门群岛",SC:"塞舌尔",SD:"苏丹",SE:"瑞典",SG:"新加坡",SI:"斯洛文尼亚",SK:"斯洛伐克",SL:"塞拉利昂",SM:"圣马力诺",SN:"塞内加尔",SO:"索马里",SR:"苏里南",SS:"南苏丹",ST:"圣多美和普林西比",SV:"萨尔瓦多",SY:"叙利亚",SZ:"斯威士兰",
  TD:"乍得",TG:"多哥",TH:"泰国",TJ:"塔吉克斯坦",TL:"东帝汶",TM:"土库曼斯坦",TN:"突尼斯",TO:"汤加",TR:"土耳其",TT:"特立尼达和多巴哥",TV:"图瓦卢",TW:"中国台湾",TZ:"坦桑尼亚",
  UA:"乌克兰",UG:"乌干达",US:"美国",UY:"乌拉圭",UZ:"乌兹别克斯坦",
  VA:"梵蒂冈",VC:"圣文森特和格林纳丁斯",VE:"委内瑞拉",VN:"越南",VU:"瓦努阿图",
  WS:"萨摩亚",
  YE:"也门",
  ZA:"南非",ZM:"赞比亚",ZW:"津巴布韦",
};

// ── 风格中文映射 ──────────────────────────────────────────────
const TAG_ZH = {
  "pop":"流行","rock":"摇滚","jazz":"爵士","classical":"古典","electronic":"电子",
  "dance":"舞曲","hip-hop":"嘻哈","hiphop":"嘻哈","country":"乡村","folk":"民谣",
  "blues":"蓝调","soul":"灵魂乐","r&b":"R&B","rnb":"R&B","reggae":"雷鬼",
  "metal":"金属","punk":"朋克","indie":"独立音乐","alternative":"另类",
  "news":"新闻","talk":"谈话","sports":"体育","christian":"基督教音乐",
  "gospel":"福音","ambient":"氛围","chillout":"轻松","chill":"放松",
  "lounge":"休闲","world":"世界音乐","latin":"拉丁","opera":"歌剧",
  "soundtrack":"原声","oldies":"经典老歌","hits":"热门金曲","top 40":"流行榜单",
  "variety":"综合","culture":"文化","comedy":"喜剧","children":"儿童",
  "educational":"教育","music":"音乐","local":"本地","community":"社区",
  "public":"公共广播","information":"资讯","religion":"宗教","arabic":"阿拉伯语",
  "spanish":"西班牙语","french":"法语","german":"德语","russian":"俄语",
  "portuguese":"葡萄牙语","italian":"意大利语","chinese":"中文",
  "fm":"调频","am":"调幅","online":"网络","stream":"流媒体",
  "80s":"80年代","90s":"90年代","70s":"70年代","60s":"60年代",
  "trap":"陷阱音乐","techno":"电子节拍","house":"浩室","trance":"迷幻",
  "drum and bass":"鼓打贝斯","dubstep":"回响贝斯","funk":"放克",
  "ska":"斯卡","swing":"摇摆乐","bluegrass":"蓝草音乐",
};

function getCountryZh(code) {
  if (!code) return "";
  return COUNTRY_ZH[code.toUpperCase()] || "";
}

function getTagZh(tag) {
  return TAG_ZH[tag.toLowerCase().trim()] || tag;
}

// ── 磨耳朵语言学习 ────────────────────────────────────────────
const LEARN_LANGS = [
  // English: "news" tag gives clean spoken-word stations on Radio Browser
  { flag: "🇺🇸", labelZh: "英语(美)", labelEn: "English(US)", country: "US", tag: "news" },
  { flag: "🇬🇧", labelZh: "英语(英)", labelEn: "English(UK)", country: "GB", tag: "news" },
  // For other languages, Radio Browser stations rarely use "talk"/"news" tags in English,
  // so filter by country only to maximise results.
  { flag: "🇯🇵", labelZh: "日语",     labelEn: "Japanese",    country: "JP", tag: "" },
  { flag: "🇰🇷", labelZh: "韩语",     labelEn: "Korean",      country: "KR", tag: "" },
  { flag: "🇫🇷", labelZh: "法语",     labelEn: "French",      country: "FR", tag: "" },
  { flag: "🇩🇪", labelZh: "德语",     labelEn: "German",      country: "DE", tag: "" },
  { flag: "🇪🇸", labelZh: "西语",     labelEn: "Spanish",     country: "ES", tag: "" },
  { flag: "🇧🇷", labelZh: "葡语",     labelEn: "Portuguese",  country: "BR", tag: "" },
  { flag: "🇮🇹", labelZh: "意语",     labelEn: "Italian",     country: "IT", tag: "" },
  { flag: "🇷🇺", labelZh: "俄语",     labelEn: "Russian",     country: "RU", tag: "" },
];

// ── 热门国家 ──────────────────────────────────────────────────
const HOT_COUNTRIES = [
  { code: "CN", flag: "🇨🇳" },
  { code: "US", flag: "🇺🇸" },
  { code: "JP", flag: "🇯🇵" },
  { code: "GB", flag: "🇬🇧" },
  { code: "DE", flag: "🇩🇪" },
  { code: "FR", flag: "🇫🇷" },
  { code: "KR", flag: "🇰🇷" },
  { code: "RU", flag: "🇷🇺" },
  { code: "BR", flag: "🇧🇷" },
  { code: "IN", flag: "🇮🇳" },
  { code: "AU", flag: "🇦🇺" },
  { code: "CA", flag: "🇨🇦" },
  { code: "ES", flag: "🇪🇸" },
  { code: "IT", flag: "🇮🇹" },
];

// ── Listening Stats ───────────────────────────────────────────
const STATS_KEY = "listen_stats";

function getStatsData() {
  try { return JSON.parse(localStorage.getItem(STATS_KEY) || "{}"); }
  catch { return {}; }
}

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

function formatDuration(seconds) {
  if (seconds < 60) return lang === "zh" ? `${seconds} 秒` : `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const h = Math.floor(m / 60);
  const rm = m % 60;
  if (h === 0) return lang === "zh" ? `${m} 分钟` : `${m} min`;
  return lang === "zh" ? `${h} 小时 ${rm} 分钟` : `${h}h ${rm}m`;
}

let listenStart = null;
let listenTrackedStation = null;
let statsFlushTimer = null;

function startListenTracking(station) {
  flushListenStats();
  listenStart = Date.now();
  listenTrackedStation = station;
  clearInterval(statsFlushTimer);
  statsFlushTimer = setInterval(flushListenStats, 10000);
}

function flushListenStats() {
  if (!listenStart || !listenTrackedStation) return;
  const elapsed = Math.floor((Date.now() - listenStart) / 1000);
  if (elapsed < 2) return;
  const today = getTodayKey();
  const data = getStatsData();
  if (!data[today]) data[today] = {};
  const uuid = listenTrackedStation.stationuuid;
  if (!data[today][uuid]) {
    data[today][uuid] = { name: listenTrackedStation.name, favicon: listenTrackedStation.favicon || "", time: 0 };
  }
  data[today][uuid].time += elapsed;
  localStorage.setItem(STATS_KEY, JSON.stringify(data));
  listenStart = Date.now();
}

function stopListenTracking() {
  flushListenStats();
  clearInterval(statsFlushTimer);
  listenStart = null;
  listenTrackedStation = null;
}

function renderStats() {
  const data = getStatsData();
  const today = getTodayKey();
  const todayData = data[today] || {};

  const totalSec = Object.values(todayData).reduce((s, x) => s + x.time, 0);
  document.getElementById("stats-total-time").textContent = totalSec > 0 ? formatDuration(totalSec) : (lang === "zh" ? "暂无记录" : "No data");

  const list = document.getElementById("stats-station-list");
  list.innerHTML = "";
  const stations = Object.values(todayData).sort((a, b) => b.time - a.time);
  if (stations.length === 0) {
    list.innerHTML = `<div class="empty" style="padding:20px 0">${lang === "zh" ? "今天还没有收听记录 🎧" : "No listens today 🎧"}</div>`;
  } else {
    const maxTime = stations[0].time;
    stations.forEach(s => {
      const pct = Math.round(s.time / maxTime * 100);
      const row = document.createElement("div");
      row.className = "stats-station-row";
      row.innerHTML = `
        <div class="stats-station-name">${escHtml(s.name)}</div>
        <div class="stats-bar-row">
          <div class="stats-bar-track"><div class="stats-bar-fill" style="width:${pct}%"></div></div>
          <span class="stats-station-time">${formatDuration(s.time)}</span>
        </div>`;
      list.appendChild(row);
    });
  }

  // Last 7 days bar chart
  const daysEl = document.getElementById("stats-week-days");
  daysEl.innerHTML = "";
  const dayItems = [];
  let maxDaySec = 1;
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
    const secs = Object.values(data[key] || {}).reduce((s, x) => s + x.time, 0);
    if (secs > maxDaySec) maxDaySec = secs;
    const label = i === 0 ? (lang === "zh" ? "今" : "Now") : `${d.getMonth()+1}/${d.getDate()}`;
    dayItems.push({ secs, label, isToday: i === 0 });
  }
  dayItems.forEach(({ secs, label, isToday }) => {
    const heightPct = secs > 0 ? Math.max(6, Math.round(secs / maxDaySec * 56)) : 0;
    const col = document.createElement("div");
    col.className = "stats-day-col";
    col.innerHTML = `
      <div class="stats-day-bar-wrap">
        <div class="stats-day-bar${isToday ? " today" : ""}" style="height:${heightPct}px" title="${formatDuration(secs)}"></div>
      </div>
      <div class="stats-day-label${isToday ? " today" : ""}">${label}</div>`;
    daysEl.appendChild(col);
  });
}

// ── History ───────────────────────────────────────────────────
const HISTORY_KEY = "radio_history";
const HISTORY_MAX = 30;

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); }
  catch { return []; }
}

function saveToHistory(station) {
  let history = loadHistory();
  history = history.filter(s => s.stationuuid !== station.stationuuid);
  history.unshift({ ...station, playedAt: Date.now() });
  history = history.slice(0, HISTORY_MAX);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
}

function formatTimeAgo(ts) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return lang === "zh" ? "刚刚" : "just now";
  if (diff < 3600) return lang === "zh" ? `${Math.floor(diff/60)}分钟前` : `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return lang === "zh" ? `${Math.floor(diff/3600)}小时前` : `${Math.floor(diff/3600)}h ago`;
  return lang === "zh" ? `${Math.floor(diff/86400)}天前` : `${Math.floor(diff/86400)}d ago`;
}

function renderHistory() {
  const historyList = document.getElementById("history-list");
  const historyCount = document.getElementById("history-count");
  const history = loadHistory();

  historyCount.textContent = lang === "zh" ? `共 ${history.length} 条` : `${history.length} stations`;
  document.getElementById("btn-clear-history").textContent = lang === "zh" ? "清空" : "Clear";

  historyList.innerHTML = "";
  currentPlaylist = [];
  if (history.length === 0) {
    historyList.innerHTML = `<div class="empty">${lang === "zh" ? "还没有播放记录" : "No history yet"}</div>`;
    return;
  }
  history.forEach(station => {
    currentPlaylist.push(station);
    const card = document.createElement("div");
    const isNowPlaying = currentStation?.stationuuid === station.stationuuid;
    card.className = "station-card" + (isNowPlaying ? " playing" : "");
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
        <span class="history-time">${formatTimeAgo(station.playedAt)}</span>
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
    historyList.appendChild(card);
  });
}

// ── i18n ──────────────────────────────────────────────────────
const STRINGS = {
  zh: {
    title: "🌍 Bolandio",
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
    login: "登录",
    register: "注册",
    logout: "退出登录",
    notLoggedIn: "请先登录，收藏将同步到所有设备",
    loginNow: "立即登录",
    loginSuccess: "登录成功，欢迎回来",
    registerSuccess: "注册成功，欢迎使用",
    loginFailed: "用户名或密码错误",
    registerFailed: "注册失败，请重试",
    passwordMismatch: "两次密码不一致",
    deadStation: "信号中断",
  },
  en: {
    title: "🌍 Bolandio",
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
    login: "Login",
    register: "Register",
    logout: "Logout",
    notLoggedIn: "Login to sync favorites across devices",
    loginNow: "Login",
    loginSuccess: "Welcome back!",
    registerSuccess: "Welcome to Bolandio!",
    loginFailed: "Wrong username or password",
    registerFailed: "Registration failed, please try again",
    passwordMismatch: "Passwords do not match",
    deadStation: "Signal lost",
  },
};

let lang = localStorage.getItem("lang") || "zh";
const t = key => STRINGS[lang][key] || key;

function applyLang() {
  document.getElementById("app-title").textContent = t("title");
  document.getElementById("tab-btn-discover").textContent = t("discover");
  document.getElementById("tab-btn-favorites").textContent = t("favorites");
  document.getElementById("tab-btn-history").textContent = lang === "zh" ? "历史" : "History";
  document.getElementById("search-input").placeholder = t("searchPlaceholder");
  document.getElementById("filter-country").options[0].textContent = t("allCountries");
  document.getElementById("filter-tag").options[0].textContent = t("allGenres");
  document.getElementById("btn-search").textContent = t("search");
  document.getElementById("btn-load-more").textContent = t("loadMore");
  document.getElementById("btn-lang").textContent = lang === "zh" ? "EN" : "中";
  document.getElementById("auth-tab-login").textContent = t("login");
  document.getElementById("auth-tab-register").textContent = t("register");
  document.getElementById("auth-login-btn").textContent = t("login");
  document.getElementById("auth-register-btn").textContent = t("register");
  document.getElementById("btn-logout").textContent = t("logout");
  const sleepSel = document.getElementById("exp-sleep-select");
  if (sleepSel) {
    sleepSel.options[0].textContent = t("timer");
    for (let i = 1; i < sleepSel.options.length; i++) {
      const mins = sleepSel.options[i].value;
      sleepSel.options[i].textContent = lang === "zh" ? `${mins}${t("min")}` : `${mins} min`;
    }
  }
  renderHotCountries();
  renderLangLearnBar();
}

document.getElementById("btn-clear-history").addEventListener("click", clearHistory);

document.getElementById("btn-lang").addEventListener("click", () => {
  lang = lang === "zh" ? "en" : "zh";
  localStorage.setItem("lang", lang);
  applyLang();
  renderFilters();
  renderFavorites();
  if (document.getElementById("tab-history").classList.contains("active")) renderHistory();
  loadStations(true);
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

// ── Auth state ────────────────────────────────────────────────
let authToken = localStorage.getItem("auth_token") || null;
let authUser = null;

async function checkAuth() {
  if (!authToken) return;
  const data = await apiFetch("/api/auth/me");
  if (data?.id) {
    authUser = data;
    updateAuthUI();
  } else {
    authToken = null;
    authUser = null;
    localStorage.removeItem("auth_token");
  }
}

async function doLogin() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;
  if (!username || !password) return;
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json().catch(() => null);
  if (res.ok && data?.access_token) {
    authToken = data.access_token;
    authUser = { id: null, username: data.username };
    localStorage.setItem("auth_token", authToken);
    // Refresh user id via /me
    const me = await apiFetch("/api/auth/me");
    if (me?.id) authUser = me;
    updateAuthUI();
    closeModal(modalAuth);
    await loadFavorites();
    renderFavorites();
    showToast(`✅ ${t("loginSuccess")}，${data.username}！`);
  } else {
    showToast(`❌ ${data?.detail || t("loginFailed")}`);
  }
}

async function doRegister() {
  const username = document.getElementById("reg-username").value.trim();
  const password = document.getElementById("reg-password").value;
  const password2 = document.getElementById("reg-password2").value;
  if (!username || !password) return;
  if (password !== password2) {
    showToast(`❌ ${t("passwordMismatch")}`);
    return;
  }
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json().catch(() => null);
  if (res.ok && data?.access_token) {
    authToken = data.access_token;
    localStorage.setItem("auth_token", authToken);
    const me = await apiFetch("/api/auth/me");
    if (me?.id) authUser = me;
    updateAuthUI();
    closeModal(modalAuth);
    await loadFavorites();
    renderFavorites();
    showToast(`🎉 ${t("registerSuccess")}，${data.username}！`);
  } else {
    showToast(`❌ ${data?.detail || t("registerFailed")}`);
  }
}

function doLogout() {
  authToken = null;
  authUser = null;
  localStorage.removeItem("auth_token");
  favorites.clear();
  updateAuthUI();
  renderFavorites();
  closeModal(modalAuth);
  showToast(lang === "zh" ? "已退出登录" : "Logged out");
}

function updateAuthUI() {
  const btn = document.getElementById("btn-user");
  const loggedOutEl = document.getElementById("auth-logged-out");
  const loggedInEl = document.getElementById("auth-logged-in");
  if (authUser) {
    const initial = (authUser.username || "U")[0].toUpperCase();
    btn.textContent = initial;
    btn.title = authUser.username;
    btn.classList.add("logged-in");
    document.getElementById("user-avatar-modal").textContent = initial;
    document.getElementById("user-profile-name").textContent = authUser.username;
    loggedOutEl.style.display = "none";
    loggedInEl.style.display = "";
  } else {
    btn.textContent = "👤";
    btn.title = lang === "zh" ? "登录" : "Login";
    btn.classList.remove("logged-in");
    loggedOutEl.style.display = "";
    loggedInEl.style.display = "none";
  }
}

// Auth modal toggle (login ↔ register tabs)
document.getElementById("auth-tab-login").addEventListener("click", () => {
  document.getElementById("auth-tab-login").classList.add("active");
  document.getElementById("auth-tab-register").classList.remove("active");
  document.getElementById("auth-form-login").style.display = "";
  document.getElementById("auth-form-register").style.display = "none";
});
document.getElementById("auth-tab-register").addEventListener("click", () => {
  document.getElementById("auth-tab-register").classList.add("active");
  document.getElementById("auth-tab-login").classList.remove("active");
  document.getElementById("auth-form-register").style.display = "";
  document.getElementById("auth-form-login").style.display = "none";
});

document.getElementById("auth-login-btn").addEventListener("click", doLogin);
document.getElementById("auth-register-btn").addEventListener("click", doRegister);
document.getElementById("btn-logout").addEventListener("click", doLogout);

// Enter key in auth inputs
["login-username", "login-password"].forEach(id => {
  document.getElementById(id).addEventListener("keydown", e => { if (e.key === "Enter") doLogin(); });
});
["reg-username", "reg-password", "reg-password2"].forEach(id => {
  document.getElementById(id).addEventListener("keydown", e => { if (e.key === "Enter") doRegister(); });
});

// User button
const modalAuth = document.getElementById("modal-auth");
document.getElementById("btn-user").addEventListener("click", () => {
  updateAuthUI();
  openModal(modalAuth);
});
document.getElementById("modal-auth-close").addEventListener("click", () => closeModal(modalAuth));
modalAuth.addEventListener("click", e => { if (e.target === modalAuth) closeModal(modalAuth); });

// ── State ─────────────────────────────────────────────────────
let currentStation = null;
let favorites = new Map();
let isPlaying = false;
let sleepTimer = null;
let sleepEnd = null;
let sleepTick = null;
let currentOffset = 0;
let lastQuery = {};
let activeGroup = "__all__";
let pendingFavStation = null;
let currentPlaylist = [];
let currentPlaylistIndex = -1;
let activeHotCountry = "";
let activeLearnLang = "";

// ── DOM ───────────────────────────────────────────────────────
const audio = document.getElementById("audio-player");
const player = document.getElementById("player");
const playerName = document.getElementById("player-name");
const playerMeta = document.getElementById("player-meta");
const playerFavicon = document.getElementById("player-favicon");
const playerFaviconPlaceholder = document.getElementById("player-favicon-placeholder");
const btnPlayPause = document.getElementById("btn-play-pause");
const btnFavPlayer = document.getElementById("btn-fav-player");
const sleepSelect = document.getElementById("exp-sleep-select");
const sleepCountdown = document.getElementById("exp-sleep-countdown");
const stationList = document.getElementById("station-list");
const favoritesList = document.getElementById("favorites-list");
const loadMoreWrap = document.getElementById("load-more-wrap");
const groupBar = document.getElementById("group-bar");
const modalGroupPicker = document.getElementById("modal-group-picker");
const modalNewGroup = document.getElementById("modal-new-group");
const playerExpanded = document.getElementById("player-expanded");
const expPlayPause = document.getElementById("exp-play-pause");
const expFav = document.getElementById("exp-fav");
const expSleepSelect = document.getElementById("exp-sleep-select");
const expSleepCountdown = document.getElementById("exp-sleep-countdown");
const toast = document.getElementById("toast");

// ── Tabs ──────────────────────────────────────────────────────
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(`tab-${tab.dataset.tab}`).classList.add("active");
    if (tab.dataset.tab === "favorites") renderFavorites();
    if (tab.dataset.tab === "history") renderHistory();
  });
});

// ── Hot countries bar ─────────────────────────────────────────
function renderHotCountries() {
  const bar = document.getElementById("hot-countries-bar");
  bar.innerHTML = "";
  HOT_COUNTRIES.forEach(c => {
    const btn = document.createElement("button");
    btn.className = "hot-country-btn" + (activeHotCountry === c.code ? " active" : "");
    const name = lang === "zh" ? (COUNTRY_ZH[c.code] || c.code) : c.code;
    btn.textContent = `${c.flag} ${name}`;
    btn.dataset.code = c.code;
    btn.addEventListener("click", () => {
      if (activeHotCountry === c.code) {
        activeHotCountry = "";
        document.getElementById("filter-country").value = "";
      } else {
        activeHotCountry = c.code;
        activeLearnLang = "";
        document.getElementById("filter-country").value = c.code;
      }
      document.getElementById("search-input").value = "";
      document.getElementById("filter-tag").value = "";
      renderHotCountries();
      renderLangLearnBar();
      currentOffset = 0;
      lastQuery = { country: activeHotCountry };
      loadStations(true);
    });
    bar.appendChild(btn);
  });
}

// ── Language Learning Bar ─────────────────────────────────────
function renderLangLearnBar() {
  const bar = document.getElementById("lang-learn-bar");
  bar.innerHTML = "";
  const label = document.createElement("span");
  label.className = "lang-learn-label";
  label.textContent = "🎧";
  bar.appendChild(label);
  LEARN_LANGS.forEach(lc => {
    const btn = document.createElement("button");
    const name = lang === "zh" ? lc.labelZh : lc.labelEn;
    btn.className = "hot-country-btn" + (activeLearnLang === lc.country + lc.tag ? " active" : "");
    btn.textContent = `${lc.flag} ${name}`;
    btn.addEventListener("click", () => {
      const id = lc.country + lc.tag;
      if (activeLearnLang === id) {
        activeLearnLang = "";
        document.getElementById("filter-country").value = "";
        document.getElementById("filter-tag").value = "";
        lastQuery = {};
      } else {
        activeLearnLang = id;
        activeHotCountry = "";
        document.getElementById("filter-country").value = lc.country;
        document.getElementById("filter-tag").value = lc.tag;
        document.getElementById("search-input").value = "";
        lastQuery = { country: lc.country, tag: lc.tag };
        renderHotCountries();
      }
      renderLangLearnBar();
      currentOffset = 0;
      loadStations(true);
    });
    bar.appendChild(btn);
  });
}

// ── Stats Modal ───────────────────────────────────────────────
const modalStats = document.getElementById("modal-stats");
document.getElementById("btn-stats").addEventListener("click", () => {
  renderStats();
  openModal(modalStats);
});
document.getElementById("modal-stats-close").addEventListener("click", () => closeModal(modalStats));
modalStats.addEventListener("click", e => { if (e.target === modalStats) closeModal(modalStats); });

// ── Search ────────────────────────────────────────────────────
document.getElementById("btn-search").addEventListener("click", doSearch);
document.getElementById("search-input").addEventListener("keydown", e => {
  if (e.key === "Enter") doSearch();
});

function doSearch() {
  activeHotCountry = "";
  activeLearnLang = "";
  renderHotCountries();
  renderLangLearnBar();
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

function showSkeleton(container, count = 6) {
  container.innerHTML = Array.from({ length: count }, () => `
    <div class="skeleton-card">
      <div class="skeleton-art"></div>
      <div class="skeleton-lines">
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
      </div>
    </div>
  `).join("");
}

async function loadStations(reset) {
  if (reset) {
    showSkeleton(stationList);
    loadMoreWrap.style.display = "none";
    currentPlaylist = [];
  }
  const params = new URLSearchParams({ limit: 30, offset: currentOffset, ...lastQuery });
  const data = await apiFetch(`/api/stations/search?${params}`);
  if (!data) return;
  if (reset) stationList.innerHTML = "";
  // Sort each batch: alive stations first (lastcheckok !== 0), dead last
  const alive = data.filter(s => s.lastcheckok !== 0);
  const dead  = data.filter(s => s.lastcheckok === 0);
  [...alive, ...dead].forEach(s => { currentPlaylist.push(s); renderStationCard(s, stationList); });
  loadMoreWrap.style.display = data.length === 30 ? "block" : "none";
}

// ── Station Card ──────────────────────────────────────────────
function renderStationCard(station, container, opts = {}) {
  const card = document.createElement("div");
  const nowPlaying = currentStation?.stationuuid === station.stationuuid;
  // lastcheckok: 0 means Radio Browser detected the stream is down
  const isDead = station.lastcheckok === 0;
  card.className = "station-card" +
    (nowPlaying ? " playing" : "") +
    (isDead ? " dead" : "");
  card.dataset.uuid = station.stationuuid;

  const isFav = favorites.has(station.stationuuid);
  const countryDisplay = lang === "zh"
    ? (getCountryZh(station.countrycode) || station.country || "")
    : (station.country || "");
  const tags = station.tags
    ? station.tags.split(",").slice(0, 2).map(tg => lang === "zh" ? getTagZh(tg) : tg).join(", ")
    : "";
  const meta = [countryDisplay, tags].filter(Boolean).join(" · ");

  const deadBadge = isDead
    ? `<span class="dead-badge">${t("deadStation")}</span>`
    : "";

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
      <div class="station-name">${escHtml(station.name)}${deadBadge}</div>
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
      if (!authUser) {
        showToast(lang === "zh" ? "请先登录后再收藏" : "Please login to add favorites");
        openModal(modalAuth);
        return;
      }
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
  currentPlaylistIndex = currentPlaylist.findIndex(s => s.stationuuid === station.stationuuid);
  saveToHistory(station);
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

  if (!playerExpanded.classList.contains("hidden")) openExpanded();

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
    if (!authUser) {
      showToast(lang === "zh" ? "请先登录后再收藏" : "Please login to add favorites");
      openModal(modalAuth);
      return;
    }
    openGroupPicker(currentStation);
  }
});

audio.addEventListener("waiting", () => player.classList.add("buffering"));
audio.addEventListener("playing", () => {
  player.classList.remove("buffering");
  if (currentStation) startListenTracking(currentStation);
});
audio.addEventListener("pause", () => stopListenTracking());
audio.addEventListener("error", () => {
  player.classList.remove("buffering");
  playerMeta.textContent = t("connFailed");
  stopListenTracking();
});

// ── Media Session ─────────────────────────────────────────────
function playNext() {
  if (!currentPlaylist.length) return;
  const idx = (currentPlaylistIndex + 1) % currentPlaylist.length;
  playStation(currentPlaylist[idx]);
}

function playPrev() {
  if (!currentPlaylist.length) return;
  const idx = (currentPlaylistIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
  playStation(currentPlaylist[idx]);
}

document.getElementById("exp-next").addEventListener("click", playNext);
document.getElementById("exp-prev").addEventListener("click", playPrev);

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
  navigator.mediaSession.setActionHandler("nexttrack", playNext);
  navigator.mediaSession.setActionHandler("previoustrack", playPrev);
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
  if (!authUser) { favorites.clear(); return; }
  const data = await apiFetch("/api/favorites");
  if (!data) return;
  favorites.clear();
  data.forEach(s => favorites.set(s.stationuuid, s));
  // Background status check for favorites
  checkFavoritesStatus();
}

async function checkFavoritesStatus() {
  const uuids = [...favorites.keys()];
  if (!uuids.length) return;
  const result = await apiFetch("/api/stations/check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uuids }),
  });
  if (!result) return;
  let changed = false;
  for (const [uuid, ok] of Object.entries(result)) {
    if (favorites.has(uuid)) {
      const s = favorites.get(uuid);
      if (s.lastcheckok !== ok) {
        favorites.set(uuid, { ...s, lastcheckok: ok });
        changed = true;
      }
    }
  }
  if (changed) renderFavorites();
}

async function removeFavorite(uuid) {
  favorites.delete(uuid);
  await apiFetch(`/api/favorites/${uuid}`, { method: "DELETE" });
  renderFavorites();
}

async function addFavorite(station, groupName) {
  if (!authUser) {
    showToast(lang === "zh" ? "请先登录后再收藏" : "Please login to add favorites");
    openModal(modalAuth);
    return;
  }
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

modalGroupPicker.addEventListener("click", e => { if (e.target === modalGroupPicker) closeModal(modalGroupPicker); });
modalNewGroup.addEventListener("click", e => { if (e.target === modalNewGroup) closeModal(modalNewGroup); });
document.getElementById("modal-group-close").addEventListener("click", () => closeModal(modalGroupPicker));
document.getElementById("modal-new-group-close").addEventListener("click", () => closeModal(modalNewGroup));

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
  // Show login prompt if not authenticated
  if (!authUser) {
    groupBar.querySelectorAll(".group-chip").forEach(c => c.remove());
    favoritesList.innerHTML = `
      <div class="login-prompt">
        <div class="login-prompt-icon">🔐</div>
        <div class="login-prompt-text">${t("notLoggedIn")}</div>
        <button class="login-prompt-btn" id="btn-login-from-fav">${t("loginNow")}</button>
      </div>
    `;
    document.getElementById("btn-login-from-fav")?.addEventListener("click", () => {
      updateAuthUI();
      openModal(modalAuth);
    });
    return;
  }

  renderGroupBar();
  favoritesList.innerHTML = "";
  currentPlaylist = [];

  let items = [...favorites.values()];
  if (activeGroup !== "__all__") {
    items = items.filter(s => (s.group_name || "默认") === activeGroup);
  }

  if (items.length === 0) {
    favoritesList.innerHTML = `<div class="empty">${t("emptyFav")}</div>`;
    return;
  }

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
      stations.forEach(s => { currentPlaylist.push(s); renderStationCard(s, favoritesList); });
    });
  } else {
    items.forEach(s => { currentPlaylist.push(s); renderStationCard(s, favoritesList); });
  }
}

// ── Filters (country / tag) ───────────────────────────────────
let cachedCountries = [];
let cachedTags = [];

async function loadFilters() {
  const [countries, tags] = await Promise.all([
    apiFetch("/api/stations/countries"),
    apiFetch("/api/stations/tags"),
  ]);
  cachedCountries = countries || [];
  cachedTags = tags || [];
  renderFilters();
}

function renderFilters() {
  const savedCountry = document.getElementById("filter-country").value;
  const savedTag = document.getElementById("filter-tag").value;

  const countrySelect = document.getElementById("filter-country");
  countrySelect.innerHTML = `<option value="">${t("allCountries")}</option>`;
  cachedCountries
    .slice()
    .sort((a, b) => {
      const na = lang === "zh" ? (getCountryZh(a.code) || a.name) : a.name;
      const nb = lang === "zh" ? (getCountryZh(b.code) || b.name) : b.name;
      return na.localeCompare(nb, lang === "zh" ? "zh" : "en");
    })
    .forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.code;
      const displayName = lang === "zh" ? (getCountryZh(c.code) || c.name) : c.name;
      opt.textContent = `${displayName} (${c.count})`;
      countrySelect.appendChild(opt);
    });
  countrySelect.value = savedCountry;

  const tagSelect = document.getElementById("filter-tag");
  tagSelect.innerHTML = `<option value="">${t("allGenres")}</option>`;
  cachedTags.forEach(tg => {
    const opt = document.createElement("option");
    opt.value = tg.name;
    opt.textContent = lang === "zh"
      ? `${getTagZh(tg.name)} (${tg.count})`
      : `${tg.name} (${tg.count})`;
    tagSelect.appendChild(opt);
  });
  tagSelect.value = savedTag;
}

// ── Utils ──────────────────────────────────────────────────────
async function apiFetch(url, options = {}) {
  try {
    const headers = { ...(options.headers || {}) };
    if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
    const res = await fetch(url, { ...options, headers });
    if (res.status === 401) {
      // Token expired or invalid
      authToken = null;
      authUser = null;
      localStorage.removeItem("auth_token");
      updateAuthUI();
      renderFavorites();
      return null;
    }
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

// ── Random Play ───────────────────────────────────────────────
async function playRandom() {
  showToast(lang === "zh" ? "🎲 随机选台中..." : "🎲 Finding random station...");
  const station = await apiFetch("/api/stations/random");
  if (station?.stationuuid) playStation(station);
}

document.getElementById("btn-random").addEventListener("click", playRandom);
document.getElementById("btn-random-mini").addEventListener("click", playRandom);
document.getElementById("exp-random").addEventListener("click", playRandom);

// ── Toast ─────────────────────────────────────────────────────
let toastTimer = null;
function showToast(msg, duration = 2200) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), duration);
}

// ── Share ─────────────────────────────────────────────────────
document.getElementById("exp-share").addEventListener("click", async () => {
  if (!currentStation) return;
  const url = `${location.origin}/?play=${currentStation.stationuuid}`;
  const title = currentStation.name;
  if (navigator.share) {
    try {
      await navigator.share({ title, text: `${lang === "zh" ? "正在收听" : "Listening to"} ${title}`, url });
      return;
    } catch {}
  }
  try {
    await navigator.clipboard.writeText(url);
    showToast(lang === "zh" ? "✅ 链接已复制" : "✅ Link copied");
  } catch {
    showToast(url, 4000);
  }
});

// ── Expanded Player ───────────────────────────────────────────
function openExpanded() {
  if (!currentStation) return;
  const s = currentStation;

  document.getElementById("exp-name").textContent = s.name;
  const countryDisplay = lang === "zh" ? (getCountryZh(s.countrycode) || s.country || "") : (s.country || "");
  const tagDisplay = s.tags ? s.tags.split(",").slice(0, 2).map(tg => lang === "zh" ? getTagZh(tg) : tg).join(" · ") : "";
  document.getElementById("exp-meta").textContent = [countryDisplay, tagDisplay].filter(Boolean).join("  ·  ");

  const expFaviconImg = document.getElementById("exp-favicon");
  const expFaviconPh = document.getElementById("exp-favicon-ph");
  if (s.favicon) {
    expFaviconImg.src = s.favicon;
    expFaviconImg.style.display = "";
    expFaviconPh.style.display = "none";
  } else {
    expFaviconImg.style.display = "none";
    expFaviconPh.style.display = "flex";
  }

  expPlayPause.textContent = isPlaying ? "⏸" : "▶";
  const isFav = favorites.has(s.stationuuid);
  expFav.classList.toggle("fav-active", isFav);
  expFav.textContent = isFav ? "♥" : "♡";

  playerExpanded.classList.remove("hidden");
  playerExpanded.classList.toggle("is-playing", isPlaying);
}

function closeExpanded() {
  playerExpanded.classList.add("hidden");
}

document.getElementById("player-info-click").addEventListener("click", openExpanded);
document.getElementById("exp-close").addEventListener("click", closeExpanded);
playerExpanded.addEventListener("click", e => { if (e.target === playerExpanded) closeExpanded(); });

let touchStartY = 0;
playerExpanded.addEventListener("touchstart", e => { touchStartY = e.touches[0].clientY; }, { passive: true });
playerExpanded.addEventListener("touchmove", e => {
  if (e.touches[0].clientY - touchStartY > 60) closeExpanded();
}, { passive: true });

expPlayPause.addEventListener("click", () => {
  btnPlayPause.click();
  expPlayPause.textContent = isPlaying ? "⏸" : "▶";
  playerExpanded.classList.toggle("is-playing", isPlaying);
});

expFav.addEventListener("click", () => {
  btnFavPlayer.click();
  const isFav = favorites.has(currentStation?.stationuuid);
  expFav.classList.toggle("fav-active", isFav);
  expFav.textContent = isFav ? "♥" : "♡";
});

audio.addEventListener("playing", () => {
  expPlayPause.textContent = "⏸";
  playerExpanded.classList.add("is-playing");
});
audio.addEventListener("pause", () => {
  expPlayPause.textContent = "▶";
  playerExpanded.classList.remove("is-playing");
});

// ── Auto-play from share link ─────────────────────────────────
async function checkShareLink() {
  const params = new URLSearchParams(location.search);
  const uuid = params.get("play");
  if (!uuid) return;
  const station = await apiFetch(`/api/stations/uuid/${uuid}`);
  if (station?.stationuuid) {
    history.replaceState({}, "", "/");
    playStation(station);
    setTimeout(openExpanded, 400);
  }
}

// ── Volume ────────────────────────────────────────────────────
const volumeSlider    = document.getElementById("exp-volume-slider");
const volIcon         = document.getElementById("vol-icon");
const volSliderMini   = document.getElementById("player-volume-slider");
const volIconMini     = document.getElementById("vol-icon-mini");

function volEmoji(vol) {
  if (vol === 0) return "🔇";
  if (vol < 0.4) return "🔈";
  if (vol < 0.7) return "🔉";
  return "🔊";
}

function setVolume(val, source) {
  const vol = val / 100;
  audio.volume = vol;
  const emoji = volEmoji(vol);
  volIcon.textContent = emoji;
  volIconMini.textContent = emoji;
  // Sync both sliders
  if (source !== "exp")  volumeSlider.value  = val;
  if (source !== "mini") volSliderMini.value = val;
  // Fill track
  const fill = `linear-gradient(to right, var(--accent) ${val}%, var(--card-border) ${val}%)`;
  volumeSlider.style.background  = fill;
  volSliderMini.style.background = fill;
  localStorage.setItem("volume", val);
}

volumeSlider.addEventListener("input",  () => setVolume(volumeSlider.value,  "exp"));
volSliderMini.addEventListener("input", () => setVolume(volSliderMini.value, "mini"));

function toggleMute(slider) {
  if (audio.volume > 0) {
    slider.dataset.prev = audio.volume * 100;
    setVolume(0);
  } else {
    setVolume(parseInt(slider.dataset.prev || "100"));
  }
}
volIcon.addEventListener("click",     () => toggleMute(volumeSlider));
volIconMini.addEventListener("click", () => toggleMute(volSliderMini));

// Restore saved volume
(function initVolume() {
  const saved = parseInt(localStorage.getItem("volume") ?? "100");
  setVolume(saved);
})();

// ── Init ───────────────────────────────────────────────────────
(async () => {
  applyLang();
  renderLangLearnBar();
  await checkAuth();
  await loadFavorites();
  loadFilters();
  lastQuery = {};
  await loadStations(true);
  await checkShareLink();
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
})();
