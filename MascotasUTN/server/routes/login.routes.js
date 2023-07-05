//sirve para hacer rutas 
const express = require('express');
const loginRouter = express.Router();
const bcrypt = require("bcrypt")
//modelos de esquema de cada collecion dentro de mi base de datos
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {SECRET} = require("../utils/config");

loginRouter.post("/api/login", async(req , resp, next)=>{

    try {
        const {userName, password} = req.body;
        const user = await User.findOne({userName});
        const userToken = {
            userName: user.userName,
            id: user._id,
        }
        //console.log(user)
        const correctPass = 
        user === null? false : await bcrypt.compare(password, user.passwordHash);
        if(!(user&&correctPass)){
            return next({name: "ValidationError", message: "Usuario o Pass incorrecto"})
        }
        // const token = await jwt.sign(userToken, SECRET, {expiresIn: "60s"});
        const token = await jwt.sign(userToken, SECRET);

        resp.status(200).json({
            token,
            userName
        })    
        
    } catch (error) {
        next(error);
    }

})

module.exports = loginRouter;
