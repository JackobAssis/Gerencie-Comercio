
const express = require('express');
const router = express.Router();
const { Receita, Despesa } = require('./models');

// CRUD Receitas
router.post('/receitas', async (req, res) => {
  try {
    const receita = await Receita.create(req.body);
    res.status(201).json(receita);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/receitas', async (req, res) => {
  const receitas = await Receita.findAll();
  res.json(receitas);
});

router.get('/receitas/:id', async (req, res) => {
  const receita = await Receita.findByPk(req.params.id);
  receita ? res.json(receita) : res.status(404).json({ error: 'Receita não encontrada' });
});

router.put('/receitas/:id', async (req, res) => {
  const receita = await Receita.findByPk(req.params.id);
  if (!receita) return res.status(404).json({ error: 'Receita não encontrada' });
  await receita.update(req.body);
  res.json(receita);
});

router.delete('/receitas/:id', async (req, res) => {
  const receita = await Receita.findByPk(req.params.id);
  if (!receita) return res.status(404).json({ error: 'Receita não encontrada' });
  await receita.destroy();
  res.json({ message: 'Receita removida' });
});

// CRUD Despesas
router.post('/despesas', async (req, res) => {
  try {
    const despesa = await Despesa.create(req.body);
    res.status(201).json(despesa);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/despesas', async (req, res) => {
  const despesas = await Despesa.findAll();
  res.json(despesas);
});

router.get('/despesas/:id', async (req, res) => {
  const despesa = await Despesa.findByPk(req.params.id);
  despesa ? res.json(despesa) : res.status(404).json({ error: 'Despesa não encontrada' });
});

router.put('/despesas/:id', async (req, res) => {
  const despesa = await Despesa.findByPk(req.params.id);
  if (!despesa) return res.status(404).json({ error: 'Despesa não encontrada' });
  await despesa.update(req.body);
  res.json(despesa);
});

router.delete('/despesas/:id', async (req, res) => {
  const despesa = await Despesa.findByPk(req.params.id);
  if (!despesa) return res.status(404).json({ error: 'Despesa não encontrada' });
  await despesa.destroy();
  res.json({ message: 'Despesa removida' });
});

module.exports = router;
