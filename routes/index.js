"use strict";
const express = require('express');
// Import routers
const queryRouter = require('./query');
const app = express();
app.use('/query', queryRouter);
module.exports = app;
