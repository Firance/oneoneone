const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 调试中间件
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// 中间件配置
app.use(express.json());

// 静态文件服务 - 移到登录检查之前
app.use(express.static(path.join(__dirname, 'public')));

// 配置会话存储（使用内存存储）
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 24 * 60 * 60 * 1000, // 24小时
        secure: process.env.NODE_ENV === 'production', // 在生产环境使用 secure cookie
        sameSite: 'lax'
    }
}));

// 登录状态检查中间件
const checkAuth = (req, res, next) => {
    console.log('Checking auth for path:', req.path);
    console.log('Session:', req.session);

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

// 应用登录检查中间件
app.use(checkAuth);

// 登录API
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt:', { username });

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

// 根路由处理
app.get('/', (req, res) => {
    console.log('Root path accessed, redirecting to login');
    res.redirect('/login.html');
});

// 健康检查端点
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// 404处理
app.use((req, res) => {
    console.log('404 Not Found:', req.path);
    res.status(404).send('Not Found');
});

// 启动服务器
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`服务器已启动！`);
        console.log(`请访问: http://localhost:${PORT}`);
        console.log(`登录页面: http://localhost:${PORT}/login.html`);
    });
}

// 导出 app 而不是直接启动服务器
module.exports = app; 