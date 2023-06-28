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
//importación del componente Login
import Login from './Login';
//importacion del componente de contexto
import { PetsContext } from '../context/PetsContext';
//importacion de useParams
import {useParams} from 'react-router-dom'

const HomePage = () => {
  //desestructuracion de los datos que contiene mi componente de contexto
  const { Loading, getMascotas,URLPETS,getMascota} = useContext(PetsContext)
  //desestructuracion de useParams del id
  const {id}= useParams()
  //creación de useEffect para generar la lista de perros con todos los animales o con uno solo
  useEffect(() => {
    !id?getMascotas(URLPETS):getMascota(URLPETS,id)
  },[id]);

  return (
    <>{
    //condicional para renderizar la página si existe en el localStorage el token, de no serlo se renderiza el componente Login
    localStorage.getItem("token")===(undefined || null)?<Login/>:
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