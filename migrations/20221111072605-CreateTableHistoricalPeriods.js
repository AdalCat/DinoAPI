'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('historicalPeriods', {
      id:{ type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      namePeriod: Sequelize.STRING,
      years: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('historicalPeriods');
  }
};
