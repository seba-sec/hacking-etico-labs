const express = require('express');
const { requireAuth, requireRole } = require('../auth/middlewares');
const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
  res.json([{ id: 1, name: 'Proyecto A' }]);
});

router.post('/', requireAuth, requireRole('admin', 'editor'), async (req, res) => {
  res.status(201).json({ message: 'Proyecto creado' });
});

router.put('/:id', requireAuth, requireRole('admin', 'editor'), async (req, res) => {
  res.json({ message: 'Proyecto actualizado' });
});

router.delete('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  res.json({ message: 'Proyecto eliminado' });
});

module.exports = router;
