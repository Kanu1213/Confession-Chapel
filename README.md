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
git clone https://github.com/Kanu1213/confession-chapel.git

# 安装依赖
cd confession-chapel
npm run bootstrap # 同时安装前后端依赖

# 配置环境变量
cp .env.example .env
# 编辑.env文件配置参数

# 启动开发服务器
npm run dev # 同时启动前端和后端
```

### 生产构建
```bash
# 构建前端
cd frontend
npm run build

# 启动服务
docker-compose up -d --build

# 访问地址
http://localhost:3000
```

## 🔧 配置指南

### 关键环境变量
```ini
# MongoDB连接
MONGODB_URI=mongodb://mongo:27017/confession

# JWT配置
JWT_SECRET=your_secure_secret_here
JWT_EXPIRES_IN=7d

# 速率限制
RATE_LIMIT_WINDOW=15m
RATE_LIMIT_MAX=100

# 敏感词过滤
BAN_WORDS=badword1,badword2,...
```

### 管理员账户设置
1. 访问 `/admin/register` 注册第一个账户
2. 进入MongoDB shell执行：
```javascript
db.users.updateOne(
  { username: "admin" },
  { $set: { isAdmin: true } }
)
```

## 📦 部署指南

### 服务器要求
- 1GB RAM 以上
- Ubuntu 22.04 LTS
- 开放端口：80, 443, 27017

### 生产部署步骤
```bash
# 克隆仓库
git clone https://github.com/Kanu1213/confession-chapel.git
cd confession-chapel

# 设置SSL证书
sudo certbot --nginx -d yourdomain.com

# 启动服务
docker-compose -f docker-compose.prod.yml up -d

# 验证服务状态
docker-compose logs -f app
```

### 更新部署
```bash
git pull origin main
docker-compose down
docker-compose up -d --build
```

## 🛡️ 安全措施

1. **输入过滤**：
   - 使用DOMPurify清理HTML输入
   - 正则表达式过滤敏感内容

2. **访问控制**：
   ```nginx
   # 禁止直接访问API文档
   location /api-docs {
     deny all;
     return 403;
   }
   ```

3. **头部安全**：
   ```nginx
   add_header X-Frame-Options "SAMEORIGIN";
   add_header X-Content-Type-Options "nosniff";
   add_header Referrer-Policy "strict-origin-when-cross-origin";
   ```

## 🤝 贡献指南

欢迎通过以下方式参与贡献：
1. 提交Issue报告问题
2. Fork仓库并提交Pull Request
3. 完善项目文档

代码规范：
- 使用Prettier进行代码格式化
- 重要功能需包含单元测试
- 提交信息遵循Conventional Commits规范

## 📄 许可证

本项目采用 [MIT License](LICENSE)

