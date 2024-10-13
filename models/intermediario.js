"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Intermediario extends Model {}

  Intermediario.init(
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
    },
    {
      sequelize,
      modelName: "Intermediario",
      tableName: "intermediario",
      timestamps: true,
    }
  );

  return Intermediario;
};
