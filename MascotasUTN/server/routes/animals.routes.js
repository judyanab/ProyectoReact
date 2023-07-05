//sirve para hacer rutas 
const express = require('express');
const animalRouter = express.Router();
const jwt = require('jsonwebtoken');
//modelos de esquema de cada collecion dentro de mi base de datos
const Animal = require('../models/animal');
const Type = require('../models/types');
const {SECRET} = require("../utils/config");
const { verifyToken } = require('../utils/middlewares');

animalRouter.get('/tipos',verifyToken, async (req, res, next) => {
    try {
        const types = await Type.find({})
        res.send(types)
    }
    catch (err) {
        next(err);
    }
});

animalRouter.post("/tipos",verifyToken, async (req, res, next) => {
    try {
        const { id, descripcion } = req.body
        const type = new Type({ id, descripcion })
        await type.save()
        res.send(type)
        res.json("recibido")
    }
    catch (err) {
        console.error(err);
        next(err);
    }
})

animalRouter.get('/',verifyToken, async (req, res, next) => {
    try {
        const Animals = await Animal.find({})
        res.send(Animals)
    }
    catch (err) {
        next(err);
    }
});

animalRouter.post("/",verifyToken, async (req, res, next) => {
    try {
        const { nombre, edad, tipo, vacunado, observaciones } = req.body
        const animal = new Animal({ nombre, edad, tipo, vacunado, observaciones })
        await animal.save()
        res.json(animal)
    }
    catch (err) {
        next(err);
    }
})


animalRouter.get('/:id',verifyToken, async (req, res, next) => {
    try {
        const Animals = await Animal.findById(req.params.id)
        res.send(Animals)
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});

animalRouter.put('/:id',verifyToken, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, edad, tipo, vacunado, observaciones } = req.body;
        const updatedAnimal = await Animal.findByIdAndUpdate(
            id,
            { nombre, edad, tipo, vacunado, observaciones },
            { new: true }
        );
        if (!updatedAnimal) {
            return  next(err);
        }
        res.json(updatedAnimal);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

animalRouter.delete("/:id",verifyToken, async (req, res, next) => {
    try {
        const deleteAnimal = await Animal.findByIdAndRemove(req.params.id)
        res.send(deleteAnimal)
    }
    catch (err) {
        
        next(err);
    }
})

module.exports = animalRouter;