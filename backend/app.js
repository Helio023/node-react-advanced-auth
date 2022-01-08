const express = require('express');
const connectDb = require('./dataBase/connectDb');
const errorHandler = require('./controllers/errorController')
const app = express();

connectDb();

app.use(express.json({ limit: '10kb' }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/auth', require('./routes/private'));

app.use(errorHandler)

module.exports = app;
