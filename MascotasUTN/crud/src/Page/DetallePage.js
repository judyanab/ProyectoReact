import React, { useEffect, useContext } from 'react'
import Loader from '../components/Loader';
import { PetsContext } from '../context/PetsContext';
import { useParams } from 'react-router-dom'
const DetallePage = () => {
  const { getDetailMascota, URLPETS, mascota } = useContext(PetsContext)
  const { id } = useParams()
  useEffect(() => {
    getDetailMascota(URLPETS, id)
  }, [])
  return (
    <>
      <h1>detalle</h1>
      {
        mascota === "" ?
          (<h1>Mascota no encontrada</h1>) : (
            mascota ? (
              <>
                <p>{mascota.nombre}</p>
                <p>{mascota.edad}</p>
                <p>{mascota.tipo}</p>
                <p>{mascota.vacunado}</p>
                <p>{mascota.observaciones}</p>
              </>
            ) : <Loader />
          )
      }
    </>
  )
}

export default DetallePage