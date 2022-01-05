const express = require('express');
const app = express();

app.use('/api/auth', require('./routes/auth'));

module.exports = app;
