# Bolandio 🌍

一个可以添加到 iPhone 主屏幕的全球电台 PWA，收录全球 30,000+ 免费电台。

**在线地址：** https://bolandio.up.railway.app

## 功能

- 🔐 **用户账号**：注册 / 登录，收藏数据绑定账号，多设备同步
- 🔍 按名称、国家、风格搜索电台
- 🌏 **热门国家快捷栏**：一键筛选中国、美国、日本等主流国家电台
- ⭐ 收藏分组管理，登录后数据云端同步
- 📡 **自动检测失效电台**：不可用电台自动变灰显示
- 🕘 最近播放历史记录
- 🎵 后台播放 + 锁屏控制
- 😴 睡眠定时器（15 / 30 / 60 / 90 分钟）
- 🌙 日间 / 夜间主题切换，中英文双语
- 📱 响应式布局，手机、平板、电脑全适配（100dvh 支持）
- 🔖 PWA：Safari 添加到主屏幕后全屏使用，体验接近原生 App

## 技术栈

- **后端**：Python + FastAPI + SQLite + JWT 认证（PBKDF2 密码哈希）
- **前端**：Vanilla JS + HTML/CSS（PWA）
- **数据来源**：[Radio Browser API](https://www.radio-browser.info/)
- **部署**：Railway

## 本地运行

```bash
git clone https://github.com/afksanya/Bolandio.git
cd Bolandio
./run.sh
```

打开 http://localhost:8080

手机访问（同一 WiFi 下）：终端会打印局域网地址，如 `http://192.168.x.x:8080`

## Railway 部署环境变量

| 变量 | 说明 |
|------|------|
| `SECRET_KEY` | JWT 签名密钥，生产环境必须设置为随机字符串 |
| `DATA_DIR` | SQLite 数据库存储路径（默认与 main.py 同级） |

## iPhone 安装

1. Safari 打开在线地址
2. 点底部分享按钮 → **添加到主屏幕**
3. 完成，桌面出现 Bolandio 图标

---

# Bolandio 🌍

A PWA for streaming 30,000+ free radio stations worldwide. Works on iPhone, desktop, and any browser.

**Live:** https://bolandio.up.railway.app

## Features

- 🔐 **User accounts**: Register / login — favorites sync across all your devices
- 🔍 Search stations by name, country, or genre
- 🌏 **Hot countries bar**: One-tap filter for China, US, Japan, UK, and more
- ⭐ Favorites with custom groups, synced to your account
- 📡 **Dead station detection**: Offline stations are automatically grayed out
- 🕘 Recently played history
- 🎵 Background playback + lock screen controls
- 😴 Sleep timer (15 / 30 / 60 / 90 minutes)
- 🌙 Light / dark theme, Chinese / English language toggle
- 📱 Responsive layout for mobile, tablet, and desktop
- 🔖 PWA: add to iPhone home screen for a native app experience

## Tech Stack

- **Backend**: Python + FastAPI + SQLite + JWT auth (PBKDF2 password hashing)
- **Frontend**: Vanilla JS + HTML/CSS (PWA)
- **Data**: [Radio Browser API](https://www.radio-browser.info/)
- **Hosting**: Railway

## Run Locally

```bash
git clone https://github.com/afksanya/Bolandio.git
cd Bolandio
./run.sh
```

Open http://localhost:8080

## Environment Variables (Railway)

| Variable | Description |
|----------|-------------|
| `SECRET_KEY` | JWT signing secret — set a random string in production |
| `DATA_DIR` | SQLite storage path (defaults to same dir as main.py) |

## Install on iPhone

1. Open the live URL in Safari
2. Tap the share button → **Add to Home Screen**
3. Done — the Bolandio icon appears on your home screen
