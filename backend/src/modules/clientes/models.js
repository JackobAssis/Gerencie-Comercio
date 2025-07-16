const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Cliente = sequelize.define('Cliente', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  contato: { type: DataTypes.STRING },
  endereco: { type: DataTypes.STRING }
});

const Compra = sequelize.define('Compra', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  data: { type: DataTypes.DATEONLY, allowNull: false },
  valor: { type: DataTypes.FLOAT, allowNull: false },
  clienteId: { type: DataTypes.INTEGER, allowNull: false }
});

Cliente.hasMany(Compra, { foreignKey: 'clienteId' });
Compra.belongsTo(Cliente, { foreignKey: 'clienteId' });

module.exports = { Cliente, Compra };
