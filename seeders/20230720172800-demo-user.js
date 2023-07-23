'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
    {
      username: 'admin',
      password: 'admin',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'public',
      password: 'public',
      role: 'public',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
