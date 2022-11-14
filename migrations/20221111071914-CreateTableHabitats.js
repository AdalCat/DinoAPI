'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('habitats', {
      id:{ type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      place: Sequelize.CHAR(255),
      subregion: Sequelize.CHAR(255),
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('habitats');
  }
};
