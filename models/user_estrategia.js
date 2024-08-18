'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_estrategia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user_estrategia.belongsTo(models.user,{ 
        foreignKey: 'id_user',
        as:'user'
      });
      user_estrategia.belongsTo(models.estrategia,{
        foreignKey: 'id_estrategia',
        as: 'estrategia'
      });

    }
  }
  user_estrategia.init({
    id_user: DataTypes.INTEGER,
    id_estrategia: DataTypes.INTEGER
  },
   {
    sequelize,
    modelName: 'user_estrategia',
    timestamps: true,
  });
  return user_estrategia;
};