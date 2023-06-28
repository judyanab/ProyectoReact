import React, { useState, useContext, useEffect } from 'react'
import { PetsContext } from '../context/PetsContext';
import Select from './Select';
import { useParams } from 'react-router-dom'
// cambios en react

const inicialForm = {
  nombre: "",
  edad: "",
  tipo: "",
  vacunado: false,
  observaciones: ""
}

const Formulario = () => {
  const { createMascota, updateMascota, URLPETS, mascotas, setMascotas } = useContext(PetsContext)
  const [form, setForm] = useState(inicialForm);
  const { nombre, edad, tipo, vacunado, observaciones } = form;
  const [error, setError] = useState(false)
  const { id } = useParams()

  const stateForm = () => {
    //condicional del parámetro que captura el id del objeto
    if (id) {
      //Busca dentro del array de mascotas el objeto en común 
      const mascotaEncontrada = mascotas.find(m => m._id === id)
      //si está vacio el formulario me envía los datos al formulario
      if ((form.nombre === "")) {
        setForm({ ...form, ...mascotaEncontrada })
      }
    }
    else {
      //si no encuentra el parámetro id se inicia el formulario vacío
      handleReset()
    }
  }
  useEffect(() => {
    //ejecuta la funcion del estado del formulario
    stateForm()
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() === "" ||
      !edad.trim() ||
      !tipo === "Tipo" ||
      !observaciones.trim() === ""
    ) {
      setError(true)
      console.log(tipo)
      return;
    }
    else {
      setError(false) // vuelvo al estado original el campo error por si una vez entra al if cambia el estado lo vuelvo al estado original
      const newMascota = { ...form }
      if (id) {
        const findMascota = mascotas.find(m => m._id === id)
        setMascotas(mascotas => mascotas.map(m => m._id === id ? findMascota : m))
        updateMascota(URLPETS, { ...findMascota, ...newMascota })
      }
      else {
        createMascota(newMascota, URLPETS)
        setForm(inicialForm)
      }
    };
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.name === 'vacunado' ? e.target.checked : e.target.value })
  }

  const handleReset = () => {
    setForm(inicialForm);
  }
  return (
    <>
      {id === mascotas._id ? <h2>Alta mascota:</h2> : <h2>Update mascota</h2>}
      {error ? <p>DATOS INCORRECTOS</p> : null}
      <form >
        <input className="input"
          type='text'
          name="nombre"
          placeholder='nombre'
          autoComplete='off'
          value={form.nombre}
          onChange={handleChange}
        />
        <input className="input"
          type='number'
          name="edad"
          placeholder='edad'
          autoComplete='off'
          value={form.edad}
          onChange={handleChange}
        />
        <Select handleChange={handleChange} tipoActual={tipo} />
        <label>Vacunado?</label>
        <input
          type="checkbox"
          name='vacunado'
          onChange={handleChange}
          checked={vacunado}
        />
        <input type='text'
          className='input'
          name="observaciones"
          placeholder='observaciones'
          autoComplete='off'
          value={observaciones}
          onChange={handleChange}
        />
        <input type='Submit' defaultValue="Enviar" onClick={handleSubmit} className='button' />
        <input type='Reset' defaultValue="Limpiar" onClick={handleReset} className='button' />
      </form>
    </>
  )
}

export default Formulario