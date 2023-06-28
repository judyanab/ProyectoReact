const mongoose = require('mongoose')
const {Schema} = mongoose;


const AnimalSchema = new Schema({
    nombre:{type:String, required:true},
    edad:{type:String, required:true},
    tipo:{ type:String, required: true},
    vacunado:{ type:Boolean, required: true},
    observaciones:{ type:String, required: true}
})

//exportacion del modelo
module.exports = mongoose.model('Animal', AnimalSchema)
