const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Trang chủ
router.get('/', (req, res) => {
  res.render('index');
});

// Đăng ký
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, password], (err) => {
    if (err) throw err;
    res.redirect('/login');
  });
});

// Đăng nhập
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.redirect('/dashboard');
    } else {
      res.send('Invalid username or password');
    }
  });
});

// Dashboard
router.get('/dashboard', (req, res) => {
  const sql = 'SELECT * FROM posts';
  db.query(sql, (err, posts) => {
    if (err) throw err;
    res.render('dashboard', { posts });
  });
});

module.exports = router;
