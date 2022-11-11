// Importamos los modelos
const { Op } = require("sequelize");
const sequelize = require("../config/db");
const Dino = require("../models/dinos");

// Creando Dino
function createDino(req, res) {
  const body = req.body;
  Dino.create(body).then((dino) => {
    res.status(201).json(dino);
  });
}

// Leer un solo Dino, por ID
async function getDino(req, res) {
  const id = req.params.id;
  const dino = await Dino.findByPk(id);

  if (dino) {
    res.status(200).json(dino);
  } else {
    res.status(404).json({
      Message: "Dino no encontrado",
    });
  }
}

//Leer un solo Dino, por NAME
async function getDinoNames(req, res) {
  const name = req.params.name;
  const dino = await Dino.findOne({
    where: {
      name: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("name")),
        "LIKE",
        "%" + name.toLowerCase() + "%"
      ),
    },
  });
  if (dino) {
    res.status(200).json(dino);
  } else {
    res.status(404).json({
      Message: "Dino no encontrado",
    });
  }
}

//Leer varios dinos por búsqueda de nombre
async function getDinoByLetter(req, res) {
  const name = req.params.name;
  const dino = await Dino.findAll({
    limit: 5,
    where: {
      name: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("name")),
        "LIKE",
        "%" + name.toLowerCase() + "%"
      ),
    },
  });
  if (dino) {
    res.status(200).json(dino);
  } else {
    res.status(404).json({
      Message: "Dino no encontrado",
    });
  }
}

//Leer random
async function getDinoRandom(req, res) {
  const dino = await Dino.findAll({
    order: sequelize.random(),
    limit: 1,
  });
  res.status(200).json(dino);
}

// Leer todos los Dinos
async function getDinos(req, res) {
  const dinos = await Dino.findAll();
  res.status(200).json(dinos);
}

// Actualizar Dino
async function updateDino(req, res) {
  const id = req.params.id;
  const dino = req.body;
  await Dino.update(dino, { where: { id } });
  const dino_updated = await Dino.findByPk(id);
  res.status(200).json(dino_updated);
}

// Eliminar Dino
async function deleteDino(req, res) {
  const id = req.params.id;
  const deleted = Dino.destroy({
    where: { id },
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
