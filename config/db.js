const { Sequelize } = require('sequelize');

// Conexión a DB externa (Render)
const sequelize = new Sequelize(process.env['DATABASE_URL'])

module.exports = sequelize; 