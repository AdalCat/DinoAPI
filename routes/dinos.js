// Llamamos al Router de Express
const router = require("express").Router();

// Llamamos a las funciones
const {
  getDinoRandom,
  getDinoName,
  getDino,
  getDinos,
  createDino,
  updateDino,
  deleteDino,
} = require("../controllers/dinos");

router.get("/", getDinos);
//Aqui no sirve esa ruta
router.get("/dinos/:id", getDino);
// router.get('/dinos/:name', getDinoName)
router.post("/", createDino);
router.patch("/:id", updateDino);
router.delete("/:id", deleteDino);

module.exports = router;
