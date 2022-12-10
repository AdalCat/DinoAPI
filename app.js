//Dotenv
require('dotenv').config()

// helmet and cors
const helmet = require('helmet')
const cors = require('cors')
// Activamos Express
const express = require('express');

// Importamos Sequelize desde db.js
const sequelize = require('./config/db');

// Llamamos a las rutas
const routes = require('./routes');

// Llamamos al Auth
const auth = require('./config/auth');

//Swagger config
const swaggerOptions = require('./config/swagger');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// Definimos el uso de Express y de las rutas
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/', routes);
//app.use(auth.optional)

// Cargamos la vista del formulario
app.set('view engine', 'pug');

// Configuramos Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(helmet())
app.use(cors())

// Revisamos la conexión con la DB
try{
    sequelize.authenticate();
    sequelize.sync();
    console.log('Connected to DB');
} catch(error){
    console.log('Unable to connect to DB:', error);
}

app.listen(process.env['PORT'] || 3000, () => {
  console.log("Server listening on PORT", process.env['PORT']);
});
