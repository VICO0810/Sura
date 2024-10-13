"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Ramo extends Model {}

  Ramo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Ramo",
      tableName: "ramos",
      timestamps: false,
    }
  );

  return Ramo;
};
