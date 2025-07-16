const express = require('express');
const router = express.Router();
const { Permuta } = require('./models');

// CRUD Permutas
router.post('/permutas', async (req, res) => {
  try {
    const permuta = await Permuta.create(req.body);
    res.status(201).json(permuta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/permutas', async (req, res) => {
  const permutas = await Permuta.findAll();
  res.json(permutas);
});

router.get('/permutas/:id', async (req, res) => {
  const permuta = await Permuta.findByPk(req.params.id);
  permuta ? res.json(permuta) : res.status(404).json({ error: 'Permuta não encontrada' });
});

router.put('/permutas/:id', async (req, res) => {
  const permuta = await Permuta.findByPk(req.params.id);
  if (!permuta) return res.status(404).json({ error: 'Permuta não encontrada' });
  await permuta.update(req.body);
  res.json(permuta);
});

router.delete('/permutas/:id', async (req, res) => {
  const permuta = await Permuta.findByPk(req.params.id);
  if (!permuta) return res.status(404).json({ error: 'Permuta não encontrada' });
  await permuta.destroy();
  res.json({ message: 'Permuta removida' });
});

module.exports = router;
