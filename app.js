'use strict';

const express = require('express');
const app = express();

const userController = require('./controllers/userController');
app.use('/users', userController);

module.exports = app;