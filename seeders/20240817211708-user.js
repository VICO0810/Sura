'use strict';

const { UPDATE } = require('sequelize/lib/query-types');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
    */
   await queryInterface.bulkInsert('user', [{
    fullname:'Laura',
    document:'1053826721',
    email:'lauravblanco93@gmail.com',
    phone:'3137960349',
    rol: 'Analista Comercial',
    createdAt: new Date(),
    updatedAt: new Date()
   },
  {
    fullname:'Felipe',
    document:'1053824941',
    email:'fsalazare@sura.com.co',
    phone:'3152075416',
    rol:'Director Comercial',
    createdAt: new Date(),
    updatedAt: new Date(),
  }])
  },
  

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    
  }
};
