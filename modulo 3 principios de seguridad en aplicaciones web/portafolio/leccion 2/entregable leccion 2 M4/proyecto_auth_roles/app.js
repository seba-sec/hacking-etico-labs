const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

const authLimiter = rateLimit({ windowMs: 15*60*1000, max: 20 });
app.use('/auth', authLimiter);

module.exports = app;
