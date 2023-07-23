'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Products', [
    {
      nama: 'OPPO A96',
      harga: '3271200',
      image: 'oppoa96.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      nama: 'OPPO A95',
      harga: '2999000',
      image: 'oppoa95.png',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     { 
      nama: 'OPPO A78 5G',
      harga: '2855000',
      image: 'oppoa785g.png',
      createdAt: new Date(),
      updatedAt: new Date()
     }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
