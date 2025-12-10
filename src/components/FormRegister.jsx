import React, {useState} from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { postUsers } from '../Services/llamados';


function FormRegister() {

        const[Username, setUserName]=useState()
        const[Email, setEmail]=useState()
        const[Password, setPassword]=useState()

        const navigate = useNavigate ()

        function userName(evento){
         setUserName(evento.target.value)
        }
        function email(evento){
          setEmail(evento.target.value)
        }
        function password(evento){
         setPassword(evento.target.value)
        }

        function register (){
         postUsers(Username, Email, Password, "User")
        navigate ('/signIn')
        }

    

  return (
    <div>
     <h1>Library <br /> Register</h1>
        <div>
          <label htmlFor="">Username:</label><br />
                <input value={Username} onChange={userName} type="text" />
        </div>
        <div>
          <label htmlFor="">Email:</label><br />
                <input value={Email} onChange={email} type="email" name="" id="email" />
        </div>
        <div>
          <label htmlFor="">Password:</label><br />
                <input value={Password} onChange={password} type="password" name="" id="password" />
        </div>
        <div>
          <label htmlFor="">Terms & Conditions</label>
                <input type="checkbox" name="" id="" />
        </div>

<input type="button" value="register" onClick={register} />

<p>Do you already have an account? <br /><Link to="/signin">Sign In</Link></p>

    </div>
  )
}

export default FormRegister