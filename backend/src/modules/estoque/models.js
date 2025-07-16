const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Produto = sequelize.define('Produto', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  codigo: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.STRING },
  quantidade: { type: DataTypes.INTEGER, defaultValue: 0 },
  preco_custo: { type: DataTypes.FLOAT, allowNull: false },
  preco_venda: { type: DataTypes.FLOAT, allowNull: false },
  fornecedor: { type: DataTypes.STRING }
});

const Movimentacao = sequelize.define('Movimentacao', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  tipo: { type: DataTypes.STRING, allowNull: false }, // entrada, saida, devolucao
  quantidade: { type: DataTypes.INTEGER, allowNull: false },
  data: { type: DataTypes.DATEONLY, allowNull: false },
  produtoId: { type: DataTypes.INTEGER, allowNull: false }
});

Produto.hasMany(Movimentacao, { foreignKey: 'produtoId' });
Movimentacao.belongsTo(Produto, { foreignKey: 'produtoId' });

module.exports = { Produto, Movimentacao };
