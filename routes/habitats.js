// Llamamos al Router de Express
const router = require('express').Router();

// Llamamos a las funciones
const {
        createHabitat,
        getHabitat,
        getHabitats,
        getHabitatNames,
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
 * /dinos:
 *     post:
 *       summary: Crear dinosaurio
 *       description: Agregar nuevo dinosaurio
 *       operationId: createHabitat
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

// Para obtener todos los Habitats
router.get('/', getHabitats);
/**
 * @openapi
 * /dinos:
 *     get:
 *       summary: Listado de dinosauros
 *       description: Entrega la lista completa de los dinosaurios disponibles
 *       operationId: getHabitats
 *       responses:
 *          200:
 *           description: Todos los dinosauros disponibles
 *           type: json
 */

/// Obtener un dino aleatorio ///
router.get('/aleatorio/', getHabitatRandom);
/**
 * @openapi
 * /dinos/aleatorio:
 *     get:
 *       summary: Obtener un dinosaurio aleatorio
 *       description: Entrega un único dinosaurio aleatoriamente
 *       operationId: getHabitatRandom
 *       produces:
 *       - application/json
 *       responses:
 *         200:
 *           description: Habitatsaurio aleatorio encontrado    
 */

// Obtener un dino por nombre completo //
router.get('/nombre/:name', getHabitatNames);
/**
 * @openapi
 * /dinos/nombre/{name}:
 *     get:
 *       summary: Obtener un dinosaurio por nombre
 *       description: Entrega un único dinosaurio por nombre de dinosaurio
 *       operationId: getHabitatNames
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
router.get('/letras/:name', getHabitatByLetter);
/**
 * @openapi
 * /dinos/letras/{name}:
 *     get:
 *       summary: Filtrar listado de dinosaurios
 *       description: Entrega un listado de dinosaurios filtrado por parte de nombre que coincida con la busqueda (5 letras minimo)
 *       operationId: getHabitatByLetter
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
router.get('/:id', getHabitat)
/**
 * @openapi
 * /dinos/{id}:
 *     get:
 *       summary: Obtener un dinosaurio por ID
 *       description: Entrega un único dinosaurio por ID
 *       operationId: getHabitat
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


/// Para actualizar un dinosaurio ///
router.patch('/:id', updateHabitat);
/**
 * @openapi
 * /dinos/{id}:
 *     patch:
 *       summary: Actualizar dinosaurio
 *       description: Actualizar algun parametro del dinosaurio
 *       operationId: actualizarHabitat
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
 *           description: Habitatsaurio actualizado
 *           type: json
 *         400: 
 *           description: ID invalido
 *         404:
 *           description: dinosaurio no encontrado
 */

/// Para eliminar un dinosaurio ///
router.delete('/:id', deleteHabitat);
/**
 * @openapi
 * /dinos/{id}:
 *     delete:
 *       summary: Borrar dinosaurio
 *       description: Eliminar dinosaurio seleccionado por ID
 *       operationId: deleteHabitat
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
 *           description: Habitatsaurio no encontrado
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