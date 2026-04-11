# 全球电台 🌍

一个可以添加到 iPhone 主屏幕的全球电台 PWA，收录全球 30,000+ 免费电台。

**在线地址：** https://radio-app-production-faa3.up.railway.app

## 功能

- 按名称、国家、风格搜索电台
- 一键收藏常听的台（数据持久保存）
- 后台播放 + 锁屏控制
- 睡眠定时器（15 / 30 / 60 / 90 分钟）
- PWA：Safari 添加到主屏幕后全屏使用，体验接近原生 App

## 技术栈

- **后端**：Python + FastAPI + SQLite
- **前端**：Vanilla JS + HTML/CSS（PWA）
- **数据来源**：[Radio Browser API](https://www.radio-browser.info/)
- **部署**：Railway

## 本地运行

```bash
git clone https://github.com/afksanya/radio-app.git
cd radio-app
./run.sh
```

打开 http://localhost:8080

## iPhone 安装

1. Safari 打开在线地址
2. 点底部分享按钮 → **添加到主屏幕**
3. 完成，桌面出现全球电台图标
