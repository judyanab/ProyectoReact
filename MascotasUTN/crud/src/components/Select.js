import React, { useEffect,useContext } from 'react'
import { PetsContext } from '../context/PetsContext'

const Select = ({ handleChange, tipoActual }) => {

  const {getTypes,tipos}=useContext(PetsContext)
  useEffect(() => {
    getTypes()
  }, []);
  return (
    <select name='tipo' onChange={handleChange} value={tipoActual}>
      {tipos.map((tipo) => (
        <option key={tipo._id} value={tipo.descripcion}>
          {tipo.descripcion}
        </option>
      ))}
    </select>

  )
}

export default Select