const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Receita = sequelize.define('Receita', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  data: { type: DataTypes.DATEONLY, allowNull: false },
  descricao: { type: DataTypes.STRING, allowNull: false },
  categoria: { type: DataTypes.STRING, allowNull: false },
  valor: { type: DataTypes.FLOAT, allowNull: false }
});

const Despesa = sequelize.define('Despesa', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  data: { type: DataTypes.DATEONLY, allowNull: false },
  descricao: { type: DataTypes.STRING, allowNull: false },
  categoria: { type: DataTypes.STRING, allowNull: false },
  valor: { type: DataTypes.FLOAT, allowNull: false }
});

module.exports = { Receita, Despesa };
