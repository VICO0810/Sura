"use strict";

const { QueryInterface } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Crear la tabla cliente y la tabla intermediario, eliminando la tabla user_estrategia y la tabla estrategia
     */
    await queryInterface.createTable(
      "intermediario",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_user: {
          type: Sequelize.INTEGER,
          references: {
            model: "user",
            key: "id",
          },
          allowNull: false,
        },
      }
    );
    // Crear tabla cliente
    await queryInterface.createTable(
      "cliente",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_user: {
          type: Sequelize.INTEGER,
          references: {
            model: "user",
            key: "id",
          },
          allowNull: false,
        },
        id_intermediario: {
          type: Sequelize.INTEGER,
          references: {
            model: "intermediario",
            key: "id",
          },
          allowNull: false,
        },
      }
    );
    await queryInterface.dropTable("user_estrategia");
    await queryInterface.dropTable("estrategia");
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.dropTable("intermediario");
    await queryInterface.dropTable("cliente");
    // Crear tabla user_estrategia
    await queryInterface.createTable("user_estrategia", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      id_estrategia: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    // Crear tabla estrategia
    await queryInterface.createTable("estrategia", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

  },
};
