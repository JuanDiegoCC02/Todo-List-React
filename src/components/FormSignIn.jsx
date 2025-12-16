import React, { useEffect, useState } from 'react'
import "../Styles/FormSignIn.css"
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
    <div className='containerAllFormSignIn'>
        <h1>Todo-List Cooking Recipes <br /> Sign In</h1>
      <div className='FormSignIn'><br />
        <div className='containerLb&InpSignIn'>
        <label className='LbFormSignIn' htmlFor="">Username:</label>
        <input className='InpFormSignIn' value={Username} onChange={userName} type="text" />
        </div><br />

        <div className='containerLb&InpSignIn'>
        <label className='LbFormSignIn' htmlFor="">Password:</label>
        <input className='InpFormSignIn' value={Password} onChange={password} type="password" name="" />
        </div><br />

        <input className='btnEnterSignIn' onClick={enter} type="button" value="Sign In" />

        <p className='LinkRegister'>Don't you have an account? <br /> <Link to="/register">Register</Link> </p>
    
    </div>
   </div>
  )
}

export default FormSignIn