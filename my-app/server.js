const express = require('express');
const session = require('express-session');
const path = require('path');
const RedisStore = require('connect-redis').default;
const { createClient } = require('redis');

const app = express();

// 中间件配置
app.use(express.json());

// 配置 Redis 客户端
const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.connect().catch(console.error);

// 配置会话存储
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 24 * 60 * 60 * 1000, // 24小时
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    }
}));

// 登录状态检查中间件
const checkAuth = (req, res, next) => {
    // 允许访问登录页面和登录API
    if (req.path === '/login.html' || req.path === '/api/login') {
        return next();
    }
    
    // 检查是否已登录
    if (req.session.loggedIn) {
        return next();
    }
    
    // 如果是API请求，返回401状态码
    if (req.path.startsWith('/api/')) {
        return res.status(401).json({ success: false, message: '未登录' });
    }
    
    // 其他所有请求重定向到登录页面
    res.redirect('/login.html');
};

// 先应用登录检查中间件
app.use(checkAuth);

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// 登录API
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // 从环境变量获取凭据
    const validUsername = process.env.ADMIN_USERNAME || 'tang';
    const validPassword = process.env.ADMIN_PASSWORD || '123987';

    // 验证
    if (username === validUsername && password === validPassword) {
        req.session.loggedIn = true;
        req.session.username = username;
        res.json({ success: true });
    } else {
        res.json({ success: false, message: '用户名或密码错误' });
    }
});

// 登出API
app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

// 根路由重定向到登录页面
app.get('/', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login.html');
    } else {
        res.redirect('/index.html');
    }
});

// 健康检查端点
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// 导出 app 而不是直接启动服务器
module.exports = app; 