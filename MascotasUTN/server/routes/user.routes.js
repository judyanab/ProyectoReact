//sirve para hacer rutas 
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
//modelos de esquema de cada collecion dentro de mi base de datos
const User = require('../models/User');
const { SECRET } = require("../utils/config")
router.get('/api/user', async (req, res) => {
    try {
        const Users = await User.find({})
        res.send(Users)
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener la mascota' });
    }
});

router.post("/api/user", async (req, res) => {
    try {
        const { userName, password } = req.body;
        //cantidad de vueltas de la encriptacion
        const saltRound = 10
        //encriptacion de password
        const passwordHash = await bcrypt.hash(password, saltRound);
        const user = new User({
            userName, passwordHash
        })
        const userSaved = await user.save()
        res.status(201).json(userSaved)
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
})


router.get('/:id', async (req, res) => {
    try {
        const Users = await User.findById(req.params.id)
        res.send(Users)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la mascota' });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndRemove(req.params.id)
        res.send(deleteUser)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la mascota' });
    }
})

module.exports = router;