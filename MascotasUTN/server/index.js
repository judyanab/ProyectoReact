const { PORT } = require('./utils/config');
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const { mongoose } = require('./utils/database')
const cors = require("cors")

//configuracion
app.set('port', PORT)

//middlewares

//morgan registra la informacion de solicitudes HTTP
app.use(morgan('dev'))

//analiza el cuerpo de la solicitud en formato json 
app.use(express.json());

//con cors estás permitiendo que tu aplicación acepte solicitudes desde dominios/origenes diferentes al de tu servidor
app.use(cors())

//rutas importadas 
app.use('/', require('./routes/animals.routes'))
app.use('/', require('./routes/user.routes'))
app.use('/', require('./routes/login.routes'))

//iniciar el servidor
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
})