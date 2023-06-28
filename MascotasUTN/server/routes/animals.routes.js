//sirve para hacer rutas 
const express = require('express');
const router = express.Router();

//modelos de esquema de cada collecion dentro de mi base de datos
const Animal = require('../models/animal');
const Type = require('../models/types')

router.get('/tipos', async (req, res) => {
    try {
        const types = await Type.find({})
        res.send(types)
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los tipos de mascotas' });
    }
});

router.post("/tipos", async (req, res) => {
    try {
        const { id, descripcion } = req.body
        const type = new Type({ id, descripcion })
        await type.save()
        res.send(type)
        res.json("recibido")
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear un tipo' });
    }
})

router.get('/', async (req, res) => {
    try {
        const Animals = await Animal.find({})
        res.send(Animals)
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener la mascota' });
    }
});

router.post("/", async (req, res) => {
    try {
        const { nombre, edad, tipo, vacunado, observaciones } = req.body
        const animal = new Animal({ nombre, edad, tipo, vacunado, observaciones })
        await animal.save()
        res.json(animal)
    }
    catch (error) {
        res.status(500).json({ error: 'Error al agregar las mascotas' });
    }
})


router.get('/:id', async (req, res) => {
    try {
        const Animals = await Animal.findById(req.params.id)
        res.send(Animals)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la mascota' });
    }
});



router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, edad, tipo, vacunado, observaciones } = req.body;
        const updatedAnimal = await Animal.findByIdAndUpdate(
            id,
            { nombre, edad, tipo, vacunado, observaciones },
            { new: true }
        );
        if (!updatedAnimal) {
            return res.status(404).json({ error: 'Animal no encontrado' });
        }
        res.json(updatedAnimal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el animal' });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleteAnimal = await Animal.findByIdAndRemove(req.params.id)
        res.send(deleteAnimal)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la mascota' });
    }
})

module.exports = router;