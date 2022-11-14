// Importamos los modelos
const { Op } = require("sequelize");
const sequelize = require("../config/db");
const HistoricalPeriod = require('../models/historicalperiods');
const permission = require('../middlewares/permission')
// Creando HistoricalPeriod
function createHistoricalPeriod(req, res){
    const body = req.body;
    sequelize.models.historicalperiods.create(body).then(habitat => {
        res.status(201).json(habitat);
    });
}

// Leer un solo HistoricalPeriod, por ID
async function getHistoricalPeriod(req, res){
    const id = req.params.id;
    const habitat = await sequelize.models.historicalperiods.findOne({where:{id},
         include: [
            { model: sequelize.models.dinos, attributes: ['id', 'name']}]});

            if (habitat) {
                res.status(200).json(habitat);
              } else {
                res.status(404).json({
                  Message: "Periodo historico no encontrado",
                });
              }
            }
          
//Leer un solo HistoricalPeriod, por NAME
async function getHistoricalPeriodNames(req, res) {
    const name = req.params.name;
    const habitat = await sequelize.models.historicalperiods.findOne({
      where: {
        name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')
      },include: [
        { model: sequelize.models.dinos, attributes: ['id', 'name']}]
    });
    if (habitat) {
        res.status(200).json(habitat);
      } else {
        res.status(404).json({
          Message: "Periodo historico no encontrado",
        });
      }
    
  }

//Leer varios habitats por búsqueda de nombre
async function getHistoricalPeriodByLetter(req, res) {
    const letter = req.params.letters;
    const habitat = await sequelize.models.historicalperiods.findAll({
        limit: 5,
        where: {
            name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + letter.toLowerCase() + '%')
      },include: [
        { model: sequelize.models.dinos, attributes: ['id', 'name']}]
    });
    if (habitat) {
        res.status(200).json(habitat);
      } else {
        res.status(404).json({
          Message: "Periodo historico no encontrado",
        });
      }
    

  }
  
  
//Leer random
async function getHistoricalPeriodRandom(req, res) {
    
    

    const habitat = await sequelize.models.historicalperiods.findAll({
        order: sequelize.random(),
        limit: 1,include: [
            { model: sequelize.models.dinos, attributes: ['id', 'name']}]
    });
    res.status(200).json(habitat);
}

// Leer todos los HistoricalPeriods
async function getHistoricalPeriods(req, res){
    const habitats = await sequelize.models.historicalperiods.findAll({
        include: [
           { model: sequelize.models.dinos, attributes: ['id', 'name']}]});
    res.status(200).json(habitats);
}

// Actualizar HistoricalPeriod
async function updateHistoricalPeriod(req, res){
    const id = req.params.id;
    const habitat = req.body;
    await sequelize.models.historicalperiods.update(habitat, { where: { id } });
    const habitat_updated = await sequelize.models.historicalperiods.findByPk(id);
    res.status(200).json(habitat_updated);
}

// Eliminar HistoricalPeriod
async function deleteHistoricalPeriod(req, res){
    const id= req.params.id;
    const deleted = sequelize.models.historicalperiods.destroy({
        where: { id }
    });
    res.status(200).json(deleted);
}

// Exportamos las funciones
module.exports = {
	createHistoricalPeriod,
	getHistoricalPeriod,
	getHistoricalPeriods,
    getHistoricalPeriodNames,
    getHistoricalPeriodRandom,
    getHistoricalPeriodByLetter,
	updateHistoricalPeriod,
	deleteHistoricalPeriod,
};