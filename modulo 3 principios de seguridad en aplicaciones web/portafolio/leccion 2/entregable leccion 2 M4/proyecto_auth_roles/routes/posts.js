const express = require('express');
const { requireAuth, requireRole } = require('../auth/middlewares');

const router = express.Router();

router.get('/', requireAuth, (req, res) => {
  res.json([{ id: 1, title: 'Post público', author: 'admin' }]);
});

router.post('/', requireAuth, requireRole('admin'), (req, res) => {
  res.status(201).json({ message: 'Post creado' });
});

router.put('/:id', requireAuth, requireRole('admin'), (req, res) => {
  res.json({ message: 'Post actualizado' });
});

router.delete('/:id', requireAuth, requireRole('admin'), (req, res) => {
  res.json({ message: 'Post eliminado' });
});

module.exports = router;
