//Dotenv
require('dotenv').config()

const { Sequelize } = require('sequelize');

// Conexión a la DB externa
const sequelize = new Sequelize(
  'railway',
  'postgres',
  'UsYCWXYFJeDhkTqETxcj',
  {
    host: 'containers-us-west-92.railway.app',
    dialect: 'postgres',
    port: 7120,
    logging: false
  }
)
const userModel = require('../models/users')
const habitatModel = require('../models/habitats')
const dinoModel = require('../models/dinos')

const models = [ userModel,dinoModel,habitatModel ]

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
const { dinos,habitats} = sequelize.models;

habitats.hasMany(dinos); // Relation one-to-one in reviews table
dinos.belongsTo(habitats); // Relation: Order has one product


module.exports = sequelize;