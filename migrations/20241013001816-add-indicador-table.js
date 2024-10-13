"use strict";

const { QueryInterface } = require("sequelize");
const { sequelize } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     */
    await queryInterface.createTable("indicador", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_cliente: {
        type: Sequelize.INTEGER,
        references: {
          model: "cliente",
          key: "id",
        },
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  
  
  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
    *
    * Example:
    *  */
   await queryInterface.dropTable("indicador");
   
   
  },
};
