# 个人网站

这是一个简洁、现代的个人网站模板，使用 Express.js 构建，包含登录功能和AI助手。网站采用响应式设计，包含多个精心设计的组件和交互效果。

## 功能特点

- 响应式导航栏，支持移动端菜单
- 全屏照片轮播展示
- 个人简介区域，包含技能展示
- 实时交互的AI小助手（基于通义千问API）
- 现代化的页面过渡动画
- 社交媒体链接整合
- 用户登录系统
- 会话管理

## 技术栈

- 前端：
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - 响应式设计
- 后端：
  - Node.js
  - Express.js
  - Express Session
- AI功能：
  - 通义千问API
  - 动态知识库
  - 智能对话系统

## 目录结构

```
my-app/
  ├── server.js          # Express服务器
  ├── package.json       # 项目配置
  ├── public/           # 静态文件目录
  │   ├── index.html    # 主页面
  │   ├── login.html    # 登录页面
  │   ├── css/         # 样式文件
  │   │   ├── style.css      # 主样式
  │   │   ├── carousel.css   # 轮播图样式
  │   │   └── chatbot.css    # AI助手样式
  │   ├── js/          # JavaScript文件
  │   │   ├── main.js        # 主逻辑
  │   │   ├── carousel.js    # 轮播图逻辑
  │   │   └── chatbot.js     # AI助手逻辑
  │   └── images/      # 图片资源
  └── assets/          # 其他资源
```

## 安装和运行

1. 克隆或下载本项目
2. 安装依赖：
   ```bash
   npm install
   ```
3. 在 `images` 目录中添加以下图片：
   - `slide1.jpg`, `slide2.jpg`, `slide3.jpg` - 轮播图图片
   - `avatar.jpg` - 个人头像
   - `robot-icon.svg` - AI助手图标
   - 社交媒体图标：`wechat.svg`, `email.svg`, `linkedin.svg`, `instagram.svg`

4. 修改个人信息：
   - 在 `public/index.html` 中更新个人介绍文字
   - 在 `public/js/main.js` 中更新技能列表
   - 在 `public/js/carousel.js` 中更新轮播图内容
   - 在 `public/js/chatbot.js` 中配置通义千问API密钥

5. 运行项目：
   ```bash
   npm start
   ```
   服务器将在 http://localhost:3000 启动

## 部署说明

### 本地部署
1. 确保已安装 Node.js
2. 运行 `npm install` 安装依赖
3. 运行 `npm start` 启动服务器

### 服务器部署
1. 将代码上传到服务器
2. 安装依赖：`npm install`
3. 使用 PM2 等工具管理进程：
   ```bash
   pm2 start server.js
   ```

### 静态部署（GitHub Pages）
如果需要部署到 GitHub Pages，需要将项目转换为静态网站：
1. 移除服务器端依赖
2. 将登录功能改为前端实现
3. 使用 localStorage 存储登录状态
4. 按照 GitHub Pages 的要求部署

## 自定义主题

你可以通过修改 `public/css/style.css` 中的CSS变量来自定义网站主题：

```css
:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --accent-color: #e74c3c;
    --text-color: #333;
    --light-text: #666;
    --background-color: #fff;
}
```

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 性能优化

- 使用了CSS动画而不是JavaScript动画来提高性能
- 图片懒加载
- 平滑的页面滚动
- 优化的移动端体验
- 服务器端会话管理
- 静态文件缓存

## 安全说明

- 使用 express-session 进行会话管理
- 密码验证在服务器端进行
- 所有API请求都需要验证登录状态
- 使用环境变量存储敏感信息

## 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 许可证

MIT License 