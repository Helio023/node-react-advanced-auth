const express = require('express');
const connectDb = require('./dataBase/connectDb');
const app = express();

connectDb();

app.use(express.json({ limit: '10kb' }));

app.use('/api/auth', require('./routes/auth'));

module.exports = app;
