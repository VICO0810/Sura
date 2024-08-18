'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Importar los modelos
const userModel = require('./user')(sequelize, Sequelize.DataTypes);
const ramoModel = require('./ramo')(sequelize, Sequelize.DataTypes);
const estrategiaModel = require('./estrategia')(sequelize, Sequelize.DataTypes);
const user_EstrategiaModel = require('./user_estrategia')(sequelize, Sequelize.DataTypes);

// Añadir los modelos al objeto db
db[userModel.name] = userModel;
db[ramoModel.name] = ramoModel;
db[estrategiaModel.name] = estrategiaModel;
db[user_EstrategiaModel.name] = user_EstrategiaModel;

// Configurar las asociaciones
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;