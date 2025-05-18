const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3000;

// 中间件配置
app.use(express.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24小时
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

    // 静态验证
    if (username === 'tang' && password === '123987') {
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

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
}); 