const { Sequelize, DataTypes }= require('sequelize');
const sequelize = require('../config/db');


module.exports = async (sequelize) => {
const Habitat = sequelize.define('habitats', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    place: {
        type: DataTypes.CHAR(255)
    },
    subregion: {
        type: DataTypes.CHAR(255)
    },
    
},
{
    hooks: {
      beforeCreate: function (habitat, options) {
        habitat.createdAt = new Date();
        habitat.updatedAt = new Date();
      },
      beforeUpdate: function (habitat, options) {
        habitat.updatedAt = new Date();
      },
    }
  });
  await Habitat.sync()
 


return Habitat;
}


