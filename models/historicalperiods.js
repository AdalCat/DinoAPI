const { Sequelize, DataTypes }= require('sequelize');
const sequelize = require('../config/db');


module.exports = async (sequelize) => {
const HistoricalPeriod = sequelize.define('historicalperiods', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
        type: DataTypes.CHAR(255)
    },
    years: {
        type: DataTypes.CHAR(255)
    },
    
},
{
    hooks: {
      beforeCreate: function (historicalPeriod, options) {
        historicalPeriod.createdAt = new Date();
        historicalPeriod.updatedAt = new Date();
      },
      beforeUpdate: function (historicalPeriod, options) {
        historicalPeriod.updatedAt = new Date();
      },
    }
  });
  await HistoricalPeriod.sync()
 


return HistoricalPeriod;
}


