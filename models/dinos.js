const {Sequelize, DataTypes}= require('sequelize');
const sequelize = require('../config/db');

const Dino = sequelize.define('Dino', {
    name: {
        type: DataTypes.TEXT(255)
    },
    habitat: {
        type: DataTypes.TEXT(255)
    },
    historicalPeriod:{
        type: DataTypes.TEXT(255)
    },
    sizeAndWeight:{
        type: DataTypes.TEXT(255)
    },
    diet:{
        type: DataTypes.TEXT(64)
    },
    characteristics:{
        type: DataTypes.TEXT(255)
    },
    description:{
        type: DataTypes.TEXT()
    },
    image:{
        type: DataTypes.TEXT(255)
    }
});

module.exports = Dino;