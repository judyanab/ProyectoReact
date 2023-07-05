import React, { createContext, useState } from 'react'
//exporto la creacion de mi componente de contexto
export const PetsContext = createContext()

//acá guardaré toda la información útil que utilizaré en varios componentes
export const PetsContextProvider = ({ children }) => {
  //estado de mi array de mascotas
  const [mascotas, setMascotas] = useState([])
  //estado de mi objeto mascota
  const [mascota, setMascota] = useState({})
  //estado de los tipos de mascotas
  const [tipos, setTipos] = useState([])
  //estado de carga
  const [Loading, setLoading] = useState(false)
  //estado del nombre de usuario
  const [user, setUser] = useState(undefined)
  //ruta principal backend
  const URLPETS = process.env.REACT_APP_API_MAINPATH
  // Authorization token
  const headers = {
    'Authorization': `Bearer ${ localStorage.getItem("token")}`,
    'Content-Type': 'application/json'
  };

  const getMascotas = async (URL) => {
    setLoading(true);
    fetch(URL, {
      method: 'GET',
      headers: headers
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res.status);
      })
      .then((data) => {
        setMascotas(data);
      })
      .catch((error)=>{
        alert("tu tiempo de sesion ha finalizado, por favor ingresa tu cuenta de nuevo")
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const getMascota = async (URL, id) => {
      setLoading(true);
      fetch(URL + id, {
        method: 'GET',
        headers: headers
      })
        .then((res) => {
          return res.ok ? res.json() : Promise.reject(res.status);
        })
        .then((data) => {
          return setMascotas(mascotas.filter(p => p._id === data._id))
        }).catch((error)=>{
          alert("tu tiempo de sesion ha finalizado, por favor ingresa tu cuenta de nuevo")
        })
        .finally(() => {
          setLoading(false);
        })
  }

 

  const getDetailMascota = (URL, id) => {
      setLoading(true);
      fetch(URL + id, {
        method: 'GET',
        headers: headers
      })
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
          headers: headers,
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
          headers: headers,
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
          headers: headers,
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
    }


  const getTypes = async () => {
    setLoading(true);
    fetch(URLPETS + "tipos", {
      method: 'GET',
      headers: headers
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res.status);
      })
      .then((data) => {
        setTipos(data)
      })
      .finally(() => {
        setLoading(false);
      })
};

  return (
    <PetsContext.Provider value={{ mascota, mascotas, setMascotas, Loading, setLoading, getMascotas, getMascota, getTypes, getDetailMascota, createMascota, updateMascota, deleteMascota, tipos, setTipos, URLPETS, user, setUser}}>
      {children}
    </PetsContext.Provider>
  )
}
