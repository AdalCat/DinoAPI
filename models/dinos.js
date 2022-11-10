const { Sequelize, DataTypes }= require('sequelize');
const sequelize = require('../config/db');


module.exports = async (sequelize) => {
const Dino = sequelize.define('dinos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
        type: DataTypes.CHAR(255)
    },
    habitatId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'habitats',
      foreignKey: 'id',
    },
    onDelete: 'CASCADE',
  },
    historicalPeriod:{
        type: DataTypes.CHAR(255)
    },
    sizeAndWeight:{
        type: DataTypes.CHAR(255)
    },
    diet:{
        type: DataTypes.CHAR(64)
    },
    characteristics:{
        type: DataTypes.CHAR(255)
    },
    description:{
        type: DataTypes.TEXT()
    },
    image:{
        type: DataTypes.CHAR(255)
    }
    
},
{
    hooks: {
      beforeCreate: function (dino, options) {
        dino.createdAt = new Date();
        dino.updatedAt = new Date();
      },
      beforeUpdate: function (dino, options) {
        dino.updatedAt = new Date();
      },
    },
    
  });
  await Dino.sync();
 
  
  module.exports = Dino;

return Dino;
}
