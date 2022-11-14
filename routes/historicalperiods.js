// Llamamos al Router de Express
const router = require('express').Router();
const permission = require('../middlewares/permission')

// Llamamos a las funciones
const {
        createHistoricalPeriod,
        getHistoricalPeriod,
        getHistoricalPeriods,
        getHistoricalPeriodNames,
        getHistoricalPeriodRandom,
        getHistoricalPeriodByLetter,
        updateHistoricalPeriod,
        deleteHistoricalPeriod
}= require('../controllers/hitstoricalperiods')

const auth = require('../config/auth')

// Para crear un HistoricalPeriod
router.post('/',permission('admin'), createHistoricalPeriod);
/**
 * @swagger
 * /dinos:
 *     post:
 *       summary: Crear dinosaurio
 *       description: Agregar nuevo dinosaurio
 *       operationId: createHistoricalPeriod
 *       consumes:
 *       - application/json
 *       produces:
 *       - application/json
 *       parameters: 
 *       - in: body
 *         name: body
 *         description: Objeto que contiene al dinosaurio que sera agregado
 *         required: true
 *         schema:
 *           $ref: '#/definitions/dino'
 *       responses:
 *         201:
 *           description: Creado correctamente
 *           type: json
 */ 

// Para obtener todos los HistoricalPeriods
router.get('/', getHistoricalPeriods);
/**
 * @openapi
 * /dinos:
 *     get:
 *       summary: Listado de dinosauros
 *       description: Entrega la lista completa de los dinosaurios disponibles
 *       operationId: getHistoricalPeriods
 *       responses:
 *          200:
 *           description: Todos los dinosauros disponibles
 *           type: json
 */

/// Obtener un dino aleatorio ///
router.get('/random/',getHistoricalPeriodRandom);
/**
 * @openapi
 * /dinos/aleatorio:
 *     get:
 *       summary: Obtener un dinosaurio aleatorio
 *       description: Entrega un único dinosaurio aleatoriamente
 *       operationId: getHistoricalPeriodRandom
 *       produces:
 *       - application/json
 *       responses:
 *         200:
 *           description: HistoricalPeriodsaurio aleatorio encontrado    
 */

// Obtener un dino por nombre completo //
router.get('/name/:name', getHistoricalPeriodNames);
/**
 * @openapi
 * /dinos/nombre/{name}:
 *     get:
 *       summary: Obtener un dinosaurio por nombre
 *       description: Entrega un único dinosaurio por nombre de dinosaurio
 *       operationId: getHistoricalPeriodNames
 *       produces:
 *       - application/json
 *       parameters: 
 *       - name: name
 *         in: path
 *         description: nombre de dinosaurio a retornar
 *         required: true
 *         schema: 
 *           type: string
 *       responses:
 *         200:
 *           description: HistoricalPeriodsaurio encontrado por nombre
 *           schema:
 *             type: array
 *             items: 
 *               $ref: '#/definitions/dino'
 *         400:
 *           description: Nombre proporcionado invalido
 *         404:
 *           description: HistoricalPeriodsaurio no encontrado     
 */

// Obtener un dino por cualquier letra del nombre //
router.get('/letters/:letters', getHistoricalPeriodByLetter);
/**
 * @openapi
 * /dinos/letras/{letters}:
 *     get:
 *       summary: Filtrar listado de dinosaurios
 *       description: Entrega un listado de dinosaurios filtrado por parte de nombre que coincida con la busqueda (5 letras minimo)
 *       operationId: getHistoricalPeriodByLetter
 *       produces:
 *       - application/json
 *       parameters: 
 *       - name: name
 *         in: path
 *         description: porcion de nombre a buscar
 *         required: true
 *         schema: 
 *           type: string
 *       responses:
 *         200:
 *           description: Listado de dinosaurios que coinciden encontrados
 *           schema:
 *             type: array
 *             items: 
 *               $ref: '#/definitions/dino'
 *         400:
 *           description: Nombre proporcionado invalido
 *         404:
 *           description: Ningun dinosaurio encontrado     
 */

/// Obtener dinosaurio por ID ///
router.get('/id/:id', getHistoricalPeriod)
/**
 * @openapi
 * /dinos/{id}:
 *     get:
 *       summary: Obtener un dinosaurio por ID
 *       description: Entrega un único dinosaurio por ID
 *       operationId: getHistoricalPeriod
 *       produces:
 *       - application/json
 *       parameters: 
 *       - name: id
 *         in: path
 *         description: ID de dinosaurio a retornar
 *         required: true
 *         type: integer
 *         format: int64
 *       responses:
 *         200:
 *           description: HistoricalPeriodsaurio encontrado por ID
 *           schema:
 *             type: array
 *             items: 
 *               $ref: '#/definitions/dino'
 *         400:
 *           description: ID proporcionado invalido
 *         404:
 *           description: HistoricalPeriodsaurio no encontrado     
 */


/// Para actualizar un dinosaurio ///
router.patch('/:id',permission('admin'), updateHistoricalPeriod);
/**
 * @openapi
 * /dinos/{id}:
 *     patch:
 *       summary: Actualizar dinosaurio
 *       description: Actualizar algun parametro del dinosaurio
 *       operationId: actualizarHistoricalPeriod
 *       consumes: application/json
 *       produces: application/json
 *       parameters: 
 *       - in: body
 *         name: body
 *         description: Objeto con contenido del campo que se actualizara 
 *         required: true
 *         schema: 
 *           $ref: '#/definitions/dino'
 *       - name: id
 *         in: path
 *         description: Id del dinosaurio que se actualizara
 *         required: true
 *         type: integer
 *         format: int64
 *       responses:
 *         200:
 *           description: HistoricalPeriodsaurio actualizado
 *           type: json
 *         400: 
 *           description: ID invalido
 *         404:
 *           description: dinosaurio no encontrado
 */

/// Para eliminar un dinosaurio ///
router.delete('/:id',permission('admin'), deleteHistoricalPeriod);
/**
 * @openapi
 * /dinos/{id}:
 *     delete:
 *       summary: Borrar dinosaurio
 *       description: Eliminar dinosaurio seleccionado por ID
 *       operationId: deleteHistoricalPeriod
 *       produces: 
 *       - application/json
 *       parameters:
 *       - name: id
 *         in: path
 *         description: Id del dinosaurio a eliminar
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
 *           description: HistoricalPeriodsaurio no encontrado
 */


/// Ejemplo de cómo se obtiene a un dinosaurio ///
/**
 * @openapi
 *definitions: 
 *  dino:
 *    type: object
 *    properties: 
 *      name: 
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
 *      name: dino
 */


module.exports = router;