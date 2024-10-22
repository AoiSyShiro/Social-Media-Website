const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models/db');

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Khởi động server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
