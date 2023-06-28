import React, { useEffect, useState } from 'react'

const Select = ({ handleChange, tipoActual }) => {

  const [tipos, setTipos] = useState([])
  const URL = "http://localhost:8000/tipos"
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        await setTipos(data);
      } catch (error) {
        console.error('Error al obtener los tipos:', error);
      }
    };
    fetchData();
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