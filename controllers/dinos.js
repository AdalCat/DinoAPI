// Importamos los modelos
const { Op } = require("sequelize");
const sequelize = require("../config/db");
const Dino = require('../models/dinos');

// Creando Dino
function createDino(req, res){
    const body = req.body;
    sequelize.models.dinos.create(body).then(dino => {
        res.status(201).json(dino);
    });
}

// Leer un solo Dino, por ID
async function getDino(req, res){
    
    const id = req.params.id;
    const dino = await sequelize.models.dinos.findOne({where:{id},
        include: [
            
            {model: sequelize.models.habitats, attributes: ['id', 'place']},
            {model: sequelize.models.historicalperiods, attributes: ['id', 'name']}
          ]
    });
    if (dino) {
        res.status(200).json(dino);
    } else  {
        res.status(404).end();
    }
}

//Leer un solo Dino, por NAME
async function getDinoNames(req, res) {
    const name = req.params.name;
    const dino = await sequelize.models.dinos.findOne({
      where: {
        name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')
      }, include: [
        { model: sequelize.models.habitats, attributes: ['id', 'place']}
      ],
    });
    res.status(200).json(dino);
}

//Leer varios dinos por búsqueda de nombre
async function getDinoByLetter(req, res) {
    const name = req.params.name;
    const dino = await sequelize.models.dinos.findAll({
        limit: 5,
        where: {
            name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')
      }
    });
    res.status(200).json(dino);
  }
  
  
//Leer random
async function getDinoRandom(req, res) {
    const dino = await sequelize.models.dinos.findAll({
        order: sequelize.random(),
        limit: 1,
    });
    res.status(200).json(dino);
}

// Leer todos los Dinos
async function getDinos(req, res){
    
    let dinos = await sequelize.models.dinos.findAll({
        include: [
            
            {model: sequelize.models.habitats, attributes: ['id', 'place']},
            {model: sequelize.models.historicalperiods, attributes: ['id', 'name']}

          ]
    });
    res.status(200).json(dinos);
}

// Actualizar Dino
async function updateDino(req, res){
    const id = req.params.id;
    const dino = req.body;
    await sequelize.models.dinos.update(dino, { where: { id } });
    const dino_updated = await sequelize.models.dinos.findByPk(id);
    res.status(200).json(dino_updated);
}

// Eliminar Dino
async function deleteDino(req, res){
    const id= req.params.id;
    const deleted = sequelize.models.dinos.destroy({
        where: { id }
    });
    res.status(200).json(deleted);
}

// Exportamos las funciones
module.exports = {
	createDino,
	getDino,
	getDinos,
    getDinoNames,
    getDinoRandom,
    getDinoByLetter,
	updateDino,
	deleteDino,
};