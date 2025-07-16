const express = require('express');
const router = express.Router();
const { Cliente, Compra } = require('./models');

// CRUD Clientes
router.post('/clientes', async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/clientes', async (req, res) => {
  const clientes = await Cliente.findAll();
  res.json(clientes);
});

router.get('/clientes/:id', async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  cliente ? res.json(cliente) : res.status(404).json({ error: 'Cliente não encontrado' });
});

router.put('/clientes/:id', async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
  await cliente.update(req.body);
  res.json(cliente);
});

router.delete('/clientes/:id', async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
  await cliente.destroy();
  res.json({ message: 'Cliente removido' });
});

// CRUD Compras
router.post('/compras', async (req, res) => {
  try {
    const compra = await Compra.create(req.body);
    res.status(201).json(compra);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/compras', async (req, res) => {
  const compras = await Compra.findAll({ include: Cliente });
  res.json(compras);
});

router.get('/compras/:id', async (req, res) => {
  const compra = await Compra.findByPk(req.params.id, { include: Cliente });
  compra ? res.json(compra) : res.status(404).json({ error: 'Compra não encontrada' });
});

router.put('/compras/:id', async (req, res) => {
  const compra = await Compra.findByPk(req.params.id);
  if (!compra) return res.status(404).json({ error: 'Compra não encontrada' });
  await compra.update(req.body);
  res.json(compra);
});

router.delete('/compras/:id', async (req, res) => {
  const compra = await Compra.findByPk(req.params.id);
  if (!compra) return res.status(404).json({ error: 'Compra não encontrada' });
  await compra.destroy();
  res.json({ message: 'Compra removida' });
});

module.exports = router;
