'use strict';

const express = require('express');
const app = express();

require('./controllers')(app);

module.exports = app;