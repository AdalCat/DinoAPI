//Dotenv
require('dotenv').config()

const { Sequelize } = require('sequelize');

// Conexión a la DB externa
const sequelize = new Sequelize(
  'railway',
  'postgres',
  'elz1XWkiI4dK7sJiP8Gv',
  {
    host: 'containers-us-west-118.railway.app',
    dialect: 'postgres',
    port: 6426,
    logging: true
  }
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