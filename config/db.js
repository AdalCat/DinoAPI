const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('sqlite://db.sqlite');

// Conexión a DB externa (Render)
const sequelize = 
new Sequelize(
    'PG_DB'
    )

module.exports = sequelize; 
