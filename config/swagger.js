const options = {
    swaggerDefinition: {
      info: {
        title: "Dino API",
        version: "1.0.5", 
        description:
         "API de dinosaurios creada para la fase 3 de Bedu proyecto de backend algunos links \n\n Links de consulta:\n\t - [Repositorio del proyecto](https://github.com/AdalCat/DinoAPI)\n\t- [Info de donosaurios](https://www-thoughtco-com.translate.goog/feathered-dinosaur-pictures-and-profile-4049097?_x_tr_sl=auto&_x_tr_tl=es&_x_tr_hl=es-419&_x_tr_pto=wapp)\n\t - [Carpeta de imagenes](https://gnzrms.xyz/dino-api/imgs/)",
      },
      //tags:{
       // name: "dinos",
        //description: "todo sobre dinosaurios",
      //},
    },
    apis: ['./routes/dinos.js',
    './routes/habitats.js'
  ]
  };
  
  module.exports = options;