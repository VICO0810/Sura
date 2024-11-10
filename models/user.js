'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {}

  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    document: DataTypes.STRING,
    phone: DataTypes.STRING,
    rol:DataTypes.STRING,
    password: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    timestamps: true
  });

  return User;
};