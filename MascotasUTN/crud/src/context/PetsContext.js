import React, { createContext, useState } from 'react'
//exporto la creacion de mi componente de contexto
export const PetsContext = createContext()

//acá guardaré toda la información útil que utilizaré en varios componentes
export const PetsContextProvider = ({ children }) => {
  //estado de mi array de mascotas
  const [mascotas, setMascotas] = useState([])
  //estado de mi objeto mascota
  const [mascota, setMascota] = useState({})
  //estado de carga
  const [Loading, setLoading] = useState(false)
  //estado del nombre de usuario
  const [user, setUser] = useState("")

  //ruta principal backend
  const URLPETS = process.env.REACT_APP_API_MAINPATH

  const getMascotas = async (URL) => {
    setLoading(true);
    fetch(URL)
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res.status);
      })
      .then((data) => {
        setMascotas(data)
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const getMascota = async (URL, id) => {
    setLoading(true);
    fetch(URL + id)
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res.status);
      })
      .then((data) => {
          return setMascotas(mascotas.filter(p => p._id === data._id))
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const getDetailMascota = (URL, id) => {
    setLoading(true);
    fetch(URL + id)
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res.status);
      })
      .then((data) => {
        setMascota(data)
      })
      .finally(() => {
        setLoading(false);
      })
  }
  const createMascota = async (newMascota, url) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(newMascota)
      });
      const data = await res.json();
      setMascotas((mascotas) => [...mascotas, data]);
      alert("alta OK")
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };


  const updateMascota = async (url, mascotaUpdate) => {
    try {
      setLoading(true);
      const res = await fetch(url + mascotaUpdate._id, {
        method: "PUT",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(mascotaUpdate)
      });
      const data = await res.json();
      setMascotas((mascotas) => {
        return mascotas.map((mascota) => mascota._id === mascotaUpdate._id ? data : mascota)
      }) 
      alert(`La mascota ${mascotaUpdate.nombre} ha sido actualizada`)
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }

  const deleteMascota = async (id, url) => {
    try {
      await fetch(url + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", },
      })
      const mascotasActualizadas = mascotas.filter((mascota) => mascota._id !== id);
      console.log(url + "/" + id)
      setMascotas((mascotas) => mascotasActualizadas);
      alert(`Mascota con ID ${id} eliminada exitosamente.`);
    }
    catch (err) {
      console.error(err)
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <PetsContext.Provider value={{ mascota, mascotas, setMascotas, Loading, setLoading, getMascotas, getMascota, getDetailMascota, createMascota, updateMascota, deleteMascota, URLPETS,user,setUser}}>
      {children}
    </PetsContext.Provider>
  )
}
