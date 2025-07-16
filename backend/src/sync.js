const sequelize = require('./db');
const { Receita, Despesa } = require('./modules/financeiro/models');
const { Produto, Movimentacao } = require('./modules/estoque/models');
const { Cliente, Compra } = require('./modules/clientes/models');
const { Permuta } = require('./modules/permutas/models');

async function syncModels() {
  await sequelize.sync();
  console.log('Todos os modelos sincronizados com o banco de dados.');
}

syncModels();
