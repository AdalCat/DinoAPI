//Dotenv
require('dotenv').config()

const { Sequelize } = require('sequelize');

// Conexión a la DB externa
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: true,
    "dialectOptions": {
      ssl: {
          require: true,
          rejectUnauthorized: false,
      }
  }}
)
const userModel = require('../models/users')
const habitatModel = require('../models/habitats')
const dinoModel = require('../models/dinos');
const historicalPeriodModel = require('../models/historicalperiods');

const models = [ userModel,dinoModel,habitatModel, historicalPeriodModel]

for(let model of models)
  model(sequelize)

// Autenticamos la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Connected Succesfully')
})
  .catch(err => {
    console.log('Not connected')
})
const { dinos,habitats,historicalperiods} = sequelize.models;


dinos.belongsTo(historicalperiods,{foreignKey: 'historicalperiodId', sourceKey: 'id'});
dinos.belongsTo(habitats,{foreignKey: 'habitatId', sourceKey: 'id'});

historicalperiods.hasMany(dinos)
habitats.hasMany(dinos)

module.exports = sequelize;