"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Indicador extends Model {}

  Indicador.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      references: {
        model: "cliente",
        key: "id",
      },
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Indicador;
};
