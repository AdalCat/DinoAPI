// Importamos los modelos
const { Op } = require("sequelize");
const sequelize = require("../config/db");
const Habitat = require('../models/habitats');

// Creando Habitat
function createHabitat(req, res){
    const body = req.body;
    sequelize.models.habitats.create(body).then(habitat => {
        res.status(201).json(habitat);
    });
}

// Leer un solo Habitat, por ID
async function getHabitat(req, res){
    const id = req.params.id;
    const habitat = await sequelize.models.habitats.findByPk(id);

    if (habitat) {
        res.status(200).json(habitat);
    } else  {
        res.status(404).end();
    }
}

//Leer un solo Habitat, por NAME
async function getHabitatNames(req, res) {
    const place = req.params.place;
    const habitat = await sequelize.models.habitats.findOne({
      where: {
        place: sequelize.where(sequelize.fn('LOWER', sequelize.col('place')), 'LIKE', '%' + place.toLowerCase() + '%')
      },
    });
    res.status(200).json(habitat);
}

//Leer varios habitats por búsqueda de nombre
async function getHabitatByLetter(req, res) {
    const place = req.params.place;
    const habitat = await sequelize.models.habitats.findAll({
        limit: 5,
        where: {
            place: sequelize.where(sequelize.fn('LOWER', sequelize.col('place')), 'LIKE', '%' + place.toLowerCase() + '%')
      }
    });
    res.status(200).json(habitat);
  }
  
  
//Leer random
async function getHabitatRandom(req, res) {
    const habitat = await sequelize.models.habitats.findAll({
        order: sequelize.random(),
        limit: 1,
    });
    res.status(200).json(habitat);
}

// Leer todos los Habitats
async function getHabitats(req, res){
    const habitats = await sequelize.models.habitats.findAll();
    res.status(200).json(habitats);
}

// Actualizar Habitat
async function updateHabitat(req, res){
    const id = req.params.id;
    const habitat = req.body;
    await sequelize.models.habitats.update(habitat, { where: { id } });
    const habitat_updated = await sequelize.models.habitats.findByPk(id);
    res.status(200).json(habitat_updated);
}

// Eliminar Habitat
async function deleteHabitat(req, res){
    const id= req.params.id;
    const deleted = sequelize.models.habitats.destroy({
        where: { id }
    });
    res.status(200).json(deleted);
}

// Exportamos las funciones
module.exports = {
	createHabitat,
	getHabitat,
	getHabitats,
    getHabitatNames,
    getHabitatRandom,
    getHabitatByLetter,
	updateHabitat,
	deleteHabitat,
};