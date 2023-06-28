import React, { useContext } from 'react'
import Row from './Row'
import './Tabla.css';
import { PetsContext } from '../context/PetsContext';
//recibe en data array peliculas dde crud
const Tabla = () => {

  const { mascotas, deleteMascota, URLPETS } = useContext(PetsContext)

  return (
    <>
      <h2>Lista de mascotas:</h2>
      <table>
        <thead>
          <tr>
            <th>nombre</th>
            <th>edad</th>
            <th>tipo</th>
            <th>vacunado</th>
            <th>observaciones</th>
          </tr>
        </thead>
        <tbody>
          {
            mascotas.length ? (
              mascotas.map((mascota) => {
                return (
                  <Row key={mascota.nombre}
                    mascota={mascota}
                    URLPETS={URLPETS}
                    deleteMascota={deleteMascota}
                  />)
              })
            ) : (<tr><td colSpan="3">  <h2>No hay data</h2> </td></tr>)
          }
        </tbody>
      </table>
    </>
  )
}

export default Tabla