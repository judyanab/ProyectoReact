//modulo mongoose para conectar la base de datos de mongodb
const mongoose = require('mongoose')


//conexion a la base de datos
mongoose.connect(process.env.DB_URI)
    .then((db) => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });

module.exports = mongoose