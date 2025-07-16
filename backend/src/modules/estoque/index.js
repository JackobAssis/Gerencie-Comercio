const express = require('express');
const router = express.Router();
const { Produto, Movimentacao } = require('./models');

// CRUD Produtos
router.post('/produtos', async (req, res) => {
  try {
    const produto = await Produto.create(req.body);
    res.status(201).json(produto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/produtos', async (req, res) => {
  const produtos = await Produto.findAll();
  res.json(produtos);
});

router.get('/produtos/:id', async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  produto ? res.json(produto) : res.status(404).json({ error: 'Produto não encontrado' });
});

router.put('/produtos/:id', async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
  await produto.update(req.body);
  res.json(produto);
});

router.delete('/produtos/:id', async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
  await produto.destroy();
  res.json({ message: 'Produto removido' });
});

// CRUD Movimentações
router.post('/movimentacoes', async (req, res) => {
  try {
    const movimentacao = await Movimentacao.create(req.body);
    res.status(201).json(movimentacao);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/movimentacoes', async (req, res) => {
  const movimentacoes = await Movimentacao.findAll({ include: Produto });
  res.json(movimentacoes);
});

router.get('/movimentacoes/:id', async (req, res) => {
  const movimentacao = await Movimentacao.findByPk(req.params.id, { include: Produto });
  movimentacao ? res.json(movimentacao) : res.status(404).json({ error: 'Movimentação não encontrada' });
});

router.put('/movimentacoes/:id', async (req, res) => {
  const movimentacao = await Movimentacao.findByPk(req.params.id);
  if (!movimentacao) return res.status(404).json({ error: 'Movimentação não encontrada' });
  await movimentacao.update(req.body);
  res.json(movimentacao);
});

router.delete('/movimentacoes/:id', async (req, res) => {
  const movimentacao = await Movimentacao.findByPk(req.params.id);
  if (!movimentacao) return res.status(404).json({ error: 'Movimentação não encontrada' });
  await movimentacao.destroy();
  res.json({ message: 'Movimentação removida' });
});

module.exports = router;
