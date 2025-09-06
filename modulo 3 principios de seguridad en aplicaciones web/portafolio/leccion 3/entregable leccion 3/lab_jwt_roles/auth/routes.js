const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_OPTS = { httpOnly: true, sameSite: 'Strict', secure: true, path: '/', maxAge: 1000 * 60 * 60 * 8 };

// Registro con política mínima de contraseñas
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  if (!password || password.length < 12 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    return res.status(400).json({ error: 'La contraseña debe tener ≥12 caracteres, incluir mayúsculas y números.' });
  }

  const user = new User({ username, role: role ?? 'user' });
  await user.setPassword(password);
  await user.save();
  res.status(201).json({ message: 'Usuario creado' });
});

// Login (cookie HttpOnly por defecto o token bearer si {bearer:true})
router.post('/login', async (req, res) => {
  const { username, password, bearer = false } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.validatePassword(password))) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  const token = jwt.sign({ sub: user._id, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
  if (bearer) return res.json({ token, role: user.role });
  res.cookie('token', token, COOKIE_OPTS);
  res.json({ message: 'Login correcto', role: user.role });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token', { path: '/' });
  res.json({ message: 'Logout' });
});

module.exports = router;
