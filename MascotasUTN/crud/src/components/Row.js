import React from 'react'
import "../App.css";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom'

const Row = ({ mascota, deleteMascota, URLPETS }) => {

  const { _id, nombre, edad, tipo, vacunado, observaciones } = mascota;
  const { id } = useParams()

  return (
    <tr>
      <td>{nombre}</td>
      <td>{edad}</td>
      <td>{tipo}</td>
      <td>{vacunado ? "Si" : "No"}</td>
      <td>{observaciones}</td>
      <td>
        {id === _id ?
          <Link to={`/`} className='button'>cancel</Link>
          :
          <>
            <Link to={`/update/${_id}`} className='button'>update</Link>        <button onClick={() => deleteMascota(mascota._id, URLPETS)} className='button'>Delete</button>
            <Link className="button" to={`/detail/${_id}`}>Detalle</Link>
          </>
        }
      </td>
    </tr>
  )
}

export default Row