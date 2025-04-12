# Confession Chapel Web Application 🕊️😈

一个基于现代Web技术的匿名告解室平台，支持贴文提交和天堂/地狱投票系统。


## ✨ 主要功能

- **匿名发帖**：无需注册即可提交告解
- **实时投票**：使用Socket.IO实现即时投票更新
- **双重审核**：自动敏感词过滤 + 人工审核
- **数据可视化**：投票分布饼图与时间趋势图
- **安全防护**：CSRF保护、速率限制、XSS过滤
- **管理后台**：内容审核与用户管理
- **自动清理**：30天旧数据自动归档
- **PWA支持**：离线可用和桌面安装

## 🛠 技术栈

**前端**  
![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5.0-0170FE?logo=ant-design)

**后端**  
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?logo=mongodb)

**运维**  
![Docker](https://img.shields.io/badge/Docker-24.0-2496ED?logo=docker)
![Nginx](https://img.shields.io/badge/Nginx-1.25-009639?logo=nginx)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions)

## 🚀 快速开始

### 先决条件
- Node.js 18+
- MongoDB 6+
- Docker 24+

### 本地开发
```bash
# 克隆仓库
git clone https://github.com/yourusername/confession-chapel.git

# 安装依赖
cd confession-chapel
npm run bootstrap # 同时安装前后端依赖

# 配置环境变量
cp .env.example .env
# 编辑.env文件配置参数

# 启动开发服务器
npm run dev # 同时启动前端和后端
