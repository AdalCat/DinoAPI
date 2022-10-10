//Dotenv
require('dotenv').config()

const { Sequelize } = require('sequelize');
//conexion local
//const sequelize = new Sequelize('sqlite://db.sqlite');

//Conexión a DB externa (Render)

// Conexión a la DB externa
const sequelize = new Sequelize(process.env['DATABASE_URL'], 
    {dialectOptions: {
        ssl: {
            require:true,
            rejectUnauthorized: false
        }
    }}
); 

// Autenticamos la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Connected Succesfully')
})
  .catch(err => {
    console.log('Not connected')
})

module.exports = sequelize;