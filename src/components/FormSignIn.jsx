import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import llamadoServicios from '../Services/llamados';


function FormSignIn() {
   const [Username, SetUserName]=useState()
   const [Password, SetPassword]=useState()
   const[usuarios, SetUsuarios]=useState()

   const navigate = useNavigate()

   useEffect(() => {

    async function fetchDataUsers() {
      const datos = await llamadoServicios.getUsers()
      SetUsuarios(datos)
    };
    fetchDataUsers();
   },[]);


  function nombre(evento) {
    SetUserName (evento.target.value)
  }


  function password(evento) {
    SetPassword (evento.target.value)
  }


  function inicia() {
    
const encontrado = usuarios.filter(usuario => usuario.nombre===Username && usuario.password===Password)

if (encontrado.length === 0) {
  console.log ("Usuario o Contraseña   incorrecto")
} else {
  navigate('/TodoList')
}

    


    
    

  }


  return (
    <div>
        <h1>Library <br /> Sign In</h1>

        <div>
        <label htmlFor="">Username:</label><br />
        <input value={Username} onChange={nombre} type="text" />
        </div>

        <div>
        <label htmlFor="">Password:</label><br />
        <input value={Password} onChange={password} type="password" name="" />
        </div>

        <input  onClick={inicia} type="button" value="Iniciar" />

        <p>¿No tienes una Cuenta? <br /> <Link to="/register">Crea una en Log In</Link> </p>
    
    </div>
  )
}

export default FormSignIn