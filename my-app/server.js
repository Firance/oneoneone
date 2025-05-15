const express = require('express');
const session = require('express-session');
const mysql = require('mysql2/promise');
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

// MySQL连接配置
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'nihenhao123987',
    database: 'sys'
});

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

// 再提供静态文件服务
app.use(express.static(path.join(__dirname)));

// 登录API
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.execute(
                'SELECT * FROM logion WHERE count = ? AND password = ?',
                [username, password]
            );

            if (rows.length > 0) {
                req.session.loggedIn = true;
                req.session.username = username;
                res.json({ success: true });
            } else {
                res.json({ success: false, message: '用户名或密码错误' });
            }
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('数据库查询错误:', error);
        res.status(500).json({ success: false, message: '服务器错误' });
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