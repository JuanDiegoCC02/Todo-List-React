import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getUsers } from '../Services/llamados';


function FormSignIn() {
   const [Username, setUsername]=useState()
   const [Password, setPassword]=useState()
   const[users, setUsers]=useState()

   const navigate = useNavigate()

   useEffect(() => {
    async function fetchDataUsers() {
      const data = await getUsers()
      setUsers(data)
    };
    fetchDataUsers();
   },[]);


  function userName(evento) {
    setUsername (evento.target.value)
  }


  function password(evento) {
    setPassword (evento.target.value)
  }


  function enter() {
    const user = users.find(user => user.username===Username && user.password===Password)
    if (user) {
      localStorage.setItem("username", user.username)
      localStorage.setItem("email", user.email)
      localStorage.setItem("typeUser", user.typeUser)
      navigate('/')
    }else {
        console.log ("Invalid Credentials")
     }

  }


  return (
    <div>
        <h1>Library <br /> Sign In</h1>

        <div>
        <label htmlFor="">Username:</label><br />
        <input value={Username} onChange={userName} type="text" />
        </div>

        <div>
        <label htmlFor="">Password:</label><br />
        <input value={Password} onChange={password} type="password" name="" />
        </div>

        <input  onClick={enter} type="button" value="enter" />

        <p>Don't you have an account? <br /> <Link to="/register">Register</Link> </p>
    
    </div>
  )
}

export default FormSignIn