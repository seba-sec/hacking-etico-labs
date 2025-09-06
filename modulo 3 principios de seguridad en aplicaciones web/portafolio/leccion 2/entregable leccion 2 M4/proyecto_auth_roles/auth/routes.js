const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_OPTS = { httpOnly: true, sameSite: 'Strict', secure: true, path: '/', maxAge: 1000*60*60*8 };

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username });
  await user.setPassword(password);
  await user.save();
  res.status(201).json({ message: 'Usuario creado' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.validatePassword(password))) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  const token = jwt.sign({ sub: user._id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
  res.cookie('token', token, COOKIE_OPTS);
  res.json({ message: 'Login correcto' });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token', { path: '/' });
  res.json({ message: 'Logout' });
});

module.exports = router;
