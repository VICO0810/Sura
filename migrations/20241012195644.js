"use strict";

const { QueryInterface } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Añadir columna a la tabla user
     *
     */
    await queryInterface.addColumn("user", "password", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Eliminar columna de la tabla user
     */
    await queryInterface.removeColumn("user", "password");
  },
};
