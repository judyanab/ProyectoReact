//importacion de react - react,useEffect y useContext
import React, { useEffect, useContext } from 'react'
//importación del componente header
import Header from '../components/Header';
//importación del componente formulario
import Formulario from '../components/Formulario'
//importación del componente Tabla
import Tabla from '../components/Tabla'
//importación del componente Loader
import Loader from '../components/Loader'
//importacion del componente de contexto
import { PetsContext } from '../context/PetsContext';
//importacion de useParams
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const HomePage = () => {
  //desestructuracion de los datos que contiene mi componente de contexto
  const { Loading, getMascotas, URLPETS, getMascota } = useContext(PetsContext)
  //desestructuracion de useParams del id
  const { id } = useParams()
  const history=useHistory()
  //creación de useEffect para generar la lista de perros con todos los animales o con uno solo
  useEffect(() => {
    if(localStorage.getItem("token")!==null){
    !id ? getMascotas(URLPETS) : getMascota(URLPETS, id)
    }
    else{
      history.push("/")
    }
  }, [id,localStorage]);

  return (
    <>{
      <div className='container'>
        <Header titulo={"MASCOTAS"} />
        <section>
          <Formulario /><br></br>
          {
            // si esta cargando o sea el set state de Loading es true paso loader.js sino TABLA
            Loading ? <Loader /> : (<Tabla />)
          }
        </section>
      </div>
    }
    </>
  )
}

export default HomePage