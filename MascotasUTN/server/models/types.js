const mongoose = require('mongoose')
const {Schema} = mongoose;



const TypesSchema = new Schema({
    descripcion:{type:String, required:true},
})

module.exports = mongoose.model('Types', TypesSchema)
