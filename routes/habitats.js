// Llamamos al Router de Express
const router = require('express').Router();

// Llamamos a las funciones
const {
        createHabitat,
        getHabitat,
        getHabitats,
        getHabitatPlaces,
        getHabitatRandom,
        getHabitatByLetter,
        updateHabitat,
        deleteHabitat
}= require('../controllers/habitats')

const auth = require('../config/auth')

// Para crear un Habitat
router.post('/', createHabitat);
/**
 * @swagger
 * /habitats:
 *     post:
 *       summary: Crear habitat
 *       description: Agregar nuevo habitat
 *       operationId: createHabitat
 *       consumes:
 *       - application/json
 *       produces:
 *       - application/json
 *       parameters: 
 *       - in: body
 *         place: body
 *         description: Objeto que contiene al habitat que sera agregado
 *         required: true
 *         schema:
 *           $ref: '#/definitions/dino'
 *       responses:
 *         201:
 *           description: Creado correctamente
 *           type: json
 */ 

// Para obtener todos los Habitats
router.get('/', getHabitats);
/**
 * @openapi
 * /dinos:
 *     get:
 *       summary: Listado de dinosauros
 *       description: Entrega la lista completa de los habitats disponibles
 *       operationId: getHabitats
 *       responses:
 *          200:
 *           description: Todos los dinosauros disponibles
 *           type: json
 */

/// Obtener un dino aleatorio ///
router.get('/random/', getHabitatRandom);
/**
 * @openapi
 * /dinos/aleatorio:
 *     get:
 *       summary: Obtener un habitat aleatorio
 *       description: Entrega un único habitat aleatoriamente
 *       operationId: getHabitatRandom
 *       produces:
 *       - application/json
 *       responses:
 *         200:
 *           description: Habitatsaurio aleatorio encontrado    
 */

// Obtener un dino por nombre completo //
router.get('/place/:place', getHabitatPlaces);
/**
 * @openapi
 * /dinos/nombre/{place}:
 *     get:
 *       summary: Obtener un habitat por nombre
 *       description: Entrega un único habitat por nombre de habitat
 *       operationId: getHabitatPlaces
 *       produces:
 *       - application/json
 *       parameters: 
 *       - place: place
 *         in: path
 *         description: nombre de habitat a retornar
 *         required: true
 *         schema: 
 *           type: string
 *       responses:
 *         200:
 *           description: Habitatsaurio encontrado por nombre
 *           schema:
 *             type: array
 *             items: 
 *               $ref: '#/definitions/dino'
 *         400:
 *           description: Nombre proporcionado invalido
 *         404:
 *           description: Habitatsaurio no encontrado     
 */

// Obtener un dino por cualquier letra del nombre //
router.get('/letter/:letter', getHabitatByLetter);
/**
 * @openapi
 * /dinos/letras/{letter}:
 *     get:
 *       summary: Filtrar listado de habitats
 *       description: Entrega un listado de habitats filtrado por parte de nombre que coincida con la busqueda (5 letras minimo)
 *       operationId: getHabitatByLetter
 *       produces:
 *       - application/json
 *       parameters: 
 *       - place: place
 *         in: path
 *         description: porcion de nombre a buscar
 *         required: true
 *         schema: 
 *           type: string
 *       responses:
 *         200:
 *           description: Listado de habitats que coinciden encontrados
 *           schema:
 *             type: array
 *             items: 
 *               $ref: '#/definitions/dino'
 *         400:
 *           description: Nombre proporcionado invalido
 *         404:
 *           description: Ningun habitat encontrado     
 */

/// Obtener habitat por ID ///
router.get('/id/:id', getHabitat)
/**
 * @openapi
 * /dinos/{id}:
 *     get:
 *       summary: Obtener un habitat por ID
 *       description: Entrega un único habitat por ID
 *       operationId: getHabitat
 *       produces:
 *       - application/json
 *       parameters: 
 *       - place: id
 *         in: path
 *         description: ID de habitat a retornar
 *         required: true
 *         type: integer
 *         format: int64
 *       responses:
 *         200:
 *           description: Habitatsaurio encontrado por ID
 *           schema:
 *             type: array
 *             items: 
 *               $ref: '#/definitions/dino'
 *         400:
 *           description: ID proporcionado invalido
 *         404:
 *           description: Habitatsaurio no encontrado     
 */


/// Para actualizar un habitat ///
router.patch('/:id', permission('admin'),updateHabitat);
/**
 * @openapi
 * /dinos/{id}:
 *     patch:
 *       summary: Actualizar habitat
 *       description: Actualizar algun parametro del habitat
 *       operationId: actualizarHabitat
 *       consumes: application/json
 *       produces: application/json
 *       parameters: 
 *       - in: body
 *         place: body
 *         description: Objeto con contenido del campo que se actualizara 
 *         required: true
 *         schema: 
 *           $ref: '#/definitions/dino'
 *       - place: id
 *         in: path
 *         description: Id del habitat que se actualizara
 *         required: true
 *         type: integer
 *         format: int64
 *       responses:
 *         200:
 *           description: Habitatsaurio actualizado
 *           type: json
 *         400: 
 *           description: ID invalido
 *         404:
 *           description: habitat no encontrado
 */

/// Para eliminar un habitat ///
router.delete('/:id', permission('admin'),deleteHabitat);
/**
 * @openapi
 * /dinos/{id}:
 *     delete:
 *       summary: Borrar habitat
 *       description: Eliminar habitat seleccionado por ID
 *       operationId: deleteHabitat
 *       produces: 
 *       - application/json
 *       parameters:
 *       - place: id
 *         in: path
 *         description: Id del habitat a eliminar
 *         required: true
 *         type: integer
 *         format: int64
 *       responses:
 *         200:
 *           description: Objeto vacio
 *           type: json
 *         400:
 *           description: ID proporcionadio invalido
 *         404: 
 *           description: Habitatsaurio no encontrado
 */


/// Ejemplo de cómo se obtiene a un habitat ///
/**
 * @openapi
 *definitions: 
 *  dino:
 *    type: object
 *    properties: 
 *      place: 
 *        type: string
 *        example: Abrictosaurus
 *      habitat:
 *        type: string
 *        example: Bosques del sur de Africa
 *      historicalPeriod:
 *        type: string
 *        example: Inicio del Jurasico
 *      sizeAndWeight:
 *        type: string
 *        example: 4 pies de largo y 120 libras
 *      diet:
 *        type: string
 *        example: plantas
 *      characteristics:
 *        type: string
 *        example: Pequeno con pico y dientes
 *      description:
 *        type: string
 *        example: Las marcas de sus dientes lo permiten identificar
 *      image:
 *        type: string
 *    xml:
 *      place: dino
 */


module.exports = router;