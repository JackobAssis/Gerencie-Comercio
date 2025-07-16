const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Usuario } = require('./usuario');

app.use(cors());
app.use(express.json());

// Autenticação
const JWT_SECRET = 'sua_chave_secreta'; // Troque por uma chave segura em produção

app.post('/auth/registro', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const hash = await bcrypt.hash(senha, 10);
    const usuario = await Usuario.create({ nome, email, senha: hash });
    res.status(201).json({ id: usuario.id, nome: usuario.nome, email: usuario.email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/auth/login', async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) return res.status(401).json({ error: 'Usuário não encontrado' });
  const valido = await bcrypt.compare(senha, usuario.senha);
  if (!valido) return res.status(401).json({ error: 'Senha inválida' });
  const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

// Middleware de proteção
function autenticar(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Token ausente' });
  const token = auth.split(' ')[1];
  try {
    req.usuario = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
}

// Rotas dos módulos protegidas
app.use('/financeiro', autenticar, require('./modules/financeiro'));
app.use('/estoque', autenticar, require('./modules/estoque'));
app.use('/clientes', autenticar, require('./modules/clientes'));
app.use('/permutas', autenticar, require('./modules/permutas'));

app.get('/', (req, res) => {
  res.send('API Gerencie-Comercio rodando!');
});


module.exports = app;

