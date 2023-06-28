const {Schema, model} = require('mongoose');
const userSchema = new Schema({
    userName: { 
        type: String, 
        required: true,
    },
    passwordHash: {
        type: String, 
        required: true,
    },
});

// sobreescribo el metodo toJSON, el transform recibe un callback que es el document (es como esta guardado en BD)
// personaJSON es cdo lo transformo yo le digo como se parsea a JSON
userSchema.set("toJSON",{
    transform: (document, userJSON)=>{
    userJSON.id = document._id.toString();
    delete userJSON._id;
    delete userJSON.__v;
    delete userJSON.passwordHash;}
    });

const User = new model("User", userSchema)
module.exports = User;

