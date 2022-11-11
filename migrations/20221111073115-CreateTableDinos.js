'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('dinos', {
      id:{ type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      name: Sequelize.STRING,
      sizeAndWeight: Sequelize.STRING,
      diet: Sequelize.STRING,
      characteristics: Sequelize.STRING,
      description: Sequelize.STRING,
      image: Sequelize.STRING,
      habitatId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'habitats',
          foreignKey: 'id',
        },
        onDelete: 'CASCADE',
      },
      historicalPeriodId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'historicalPeriods',
          foreignKey: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('dinos');
  }
};
