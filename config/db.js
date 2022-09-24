const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('sqlite://db.sqlite');

// Conexión a DB externa (Render)
const sequelize = 
new Sequelize(
    'postgres://dinoapi_user:l56YgZxNrfFmKzFvAeZCdLSCkocahk88@dpg-ccmlkb02i3mirn7nvofg-a.ohio-postgres.render.com/dinoapi?ssl=true'
    )

module.exports = sequelize; 