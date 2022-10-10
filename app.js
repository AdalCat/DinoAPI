//Dotenv
require('dotenv').config()

// Activamos Express
const express = require('express');

// Importamos Sequelize desde db.js
const sequelize = require('./config/db');

// Llamamos a las rutas
const routes = require('./routes');

//Swagger config
const swaggerOptions = require('./config/swagger');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// Definimos el uso de Express y de las rutas
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/', routes);

// Cargamos la vista del formulario
app.set('view engine', 'pug');

// Configuramos Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Revisamos la conexión con la DB
try{
    sequelize.authenticate();
    sequelize.sync();
    console.log('Connected to DB');
} catch(error){
    console.log('Unable to connect to DB:', error);
}

app.listen(process.env['PORT'] || 3030, ()=> {
  console.log("Server listing on PORT", process.env['PORT']);
});

/* const PORT = 3000;
app.listen(PORT, ()=> {
    console.log("Server listing on PORT 3000");
});  */
