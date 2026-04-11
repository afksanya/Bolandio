# Bolandio 🌍

一个可以添加到 iPhone 主屏幕的全球电台 PWA，收录全球 30,000+ 免费电台。

**在线地址：** https://radio-app-production-faa3.up.railway.app

## 功能

- 按名称、国家、风格搜索电台
- 收藏分组管理，数据持久保存
- 最近播放历史记录
- 后台播放 + 锁屏控制
- 睡眠定时器（15 / 30 / 60 / 90 分钟）
- 日间 / 夜间主题切换，中英文双语
- 响应式布局，手机、平板、电脑全适配
- PWA：Safari 添加到主屏幕后全屏使用，体验接近原生 App

## 技术栈

- **后端**：Python + FastAPI + SQLite
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

## iPhone 安装

1. Safari 打开在线地址
2. 点底部分享按钮 → **添加到主屏幕**
3. 完成，桌面出现全球电台图标

---

# Global Radio 🌍

A PWA for streaming 30,000+ free radio stations worldwide. Works on iPhone, desktop, and any browser.

**Live:** https://radio-app-production-faa3.up.railway.app

## Features

- Search stations by name, country, or genre
- Favorites with custom groups, data persisted on server
- Recently played history
- Background playback + lock screen controls
- Sleep timer (15 / 30 / 60 / 90 minutes)
- Light / dark theme, Chinese / English language toggle
- Responsive layout for mobile, tablet, and desktop
- PWA: add to iPhone home screen for a native app experience

## Tech Stack

- **Backend**: Python + FastAPI + SQLite
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

## Install on iPhone

1. Open the live URL in Safari
2. Tap the share button → **Add to Home Screen**
3. Done — the app icon appears on your home screen
