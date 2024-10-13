"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Cliente extends Model {}

  Cliente.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
        allowNull: false,
      },
      id_intermediario: {
        type: DataTypes.INTEGER,
        references: {
          model: "intermediario",
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Cliente",
      tableName: "cliente",
      timestamps: true,
    }
  );

  return Cliente;
};
