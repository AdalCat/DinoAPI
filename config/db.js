//Dotenv
require("dotenv").config();

const { Sequelize } = require("sequelize");

// Conexión a DB externa (Render)

const sequelize = new Sequelize(process.env["DATABASE_URL"], {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("SUPER Conectado");
  })
  .catch((err) => {
    console.log("No se conecto");
  });

module.exports = sequelize;
