import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { PetsContext } from '../context/PetsContext';

const Header = ({ titulo }) => {
  const {setUser} = useContext(PetsContext)
  const history = useHistory()
  const logOut = () => {
    localStorage.removeItem("token")
    setUser("")
    history.push("/")
  }
  return (
    <header>
      <h1>{titulo}</h1>
      <button onClick={logOut}>salir sesion</button>
    </header>
  )
}

export default Header