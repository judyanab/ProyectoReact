import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { PetsContext } from '../context/PetsContext';

const Login = () => {
    const { setUser, user } = useContext(PetsContext)
    const [log, setLog] = useState(true)
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()
    const inicioDeSesion = async (e) => {
        e.preventDefault()
        fetch(process.env.REACT_APP_API_MAINPATH_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName: userName, password: password })
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    alert("el usuario y/o contraseña es incorrecto, por favor intentalo de nuevo")
                    setUserName("")
                    setPassword("")
                }
            })
            .then((data) => {
                localStorage.setItem("token", data.token)
                setUser(data.userName)
            })
            .catch((error) => {
                console.error('Error al enviar la solicitud:', error);
            });
    }

    const crearSesion = async (e) => {
        e.preventDefault()
        if (userName !== "" || password !== "" || password.length >= 8) {
            fetch(process.env.REACT_APP_API_MAINPATH_CREATEUSER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userName: userName, password: password })
            })
                .then((response) => {
                    if (response.ok) {
                        alert("has creado una cuenta")
                    } else {
                        alert("este usuario ya existe, por favor escribe uno diferente")
                    }
                    setUserName("")
                    setPassword("")
                })
                .catch((error) => {
                    console.error('Error al enviar la solicitud:', error);
                });
        }
        else {
            alert("los campos no deben estar vacios y tu contraseña debe tener 8 o más caracteres")
        }
    }
    useEffect(() => {
        if (localStorage.getItem("token") !== null) { history.push("/home") }
        console.log(user)
    }, [user, history])
    return (
        <>{log ?
            <>
                <p>inicia sesion</p>
                <form onSubmit={inicioDeSesion}>
                    <input className="input"
                        type='text'
                        name="usuario"
                        placeholder='usuario'
                        autoComplete='off'
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)}
                    />
                    <input className="input"
                        type='password'
                        name="password"
                        placeholder='password'
                        autoComplete='off'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <input type='Submit' defaultValue="Iniciar sesion" className='button' />
                </form>
                <button onClick={() => { setLog(false) }}>todavia no tienes una cuenta?. Ir a crear sesion</button>
            </>
            :
            <><p>crea una cuenta</p>
                <form onSubmit={crearSesion}>
                    <input className="input"
                        type='text'
                        name="usuario"
                        placeholder='usuario'
                        autoComplete='off'
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)}
                    />
                    <input className="input"
                        type='password'
                        name="password"
                        placeholder='password'
                        autoComplete='off'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <input type='Submit' defaultValue="crear sesion" className='button' />
                </form>
                <button onClick={() => { setLog(true) }}>Ir a inciar sesion</button>
            </>
        }
        </>
    )
}

export default Login