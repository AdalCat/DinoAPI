const router = require("express").Router();
const dinos = require("./dinos");

//Llamar funciones

const {
  getDinoRandom,
  getDinoNames,
  getDino,
  getDinos,
  createDino,
  updateDino,
  deleteDino,
} = require("../controllers/dinos");
//----

router.get("/", (req, res) => {
  res.render("index");
});

router.use("/dinos", dinos);

//RUTAS
router.get("/dinos/random", getDinoRandom);
router.get("/dinos/n/:name", getDinoNames);
router.get("/dinos/i/:id", getDino);
//---

module.exports = router;
