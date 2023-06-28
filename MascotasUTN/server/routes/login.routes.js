//sirve para hacer rutas 
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
//modelos de esquema de cada collecion dentro de mi base de datos
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {SECRET} = require("../utils/config");

router.post("/api/login", async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({userName}) // busco el primer usuario
        const correctPassword = user===null?false: await bcrypt.compare(password,user.passwordHash)
        if (user && correctPassword){
        const userToken = {
            userName: user.userName,
            id: user._id
        };
        const token = await jwt.sign(userToken,SECRET)
        res.json({token,userName})
    }
    else{
        res.status(401).json({ error: 'Credenciales inválidas' });
    }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
})


module.exports = router;
