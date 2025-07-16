const { DataTypes } = require('sequelize');
const sequelize = require('../../db');

const Permuta = sequelize.define('Permuta', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  data: { type: DataTypes.DATEONLY, allowNull: false },
  descricao: { type: DataTypes.STRING, allowNull: false },
  valor_equivalente: { type: DataTypes.FLOAT },
  parteA: { type: DataTypes.STRING, allowNull: false },
  parteB: { type: DataTypes.STRING, allowNull: false }
});

module.exports = { Permuta };
