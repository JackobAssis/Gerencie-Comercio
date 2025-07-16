const app = require('../src/index');
const PORT = 3001;
const server = app.listen(PORT, () => {
  console.log(`Servidor de testes rodando na porta ${PORT}`);
});

module.exports = server;
