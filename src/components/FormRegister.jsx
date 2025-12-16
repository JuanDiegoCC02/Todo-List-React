import React, {useState} from 'react'
import "../Styles/FormRegister.css"
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
    <div className='containerAllFormRegister'>
     <h1 className='titleTodoListRegister'>Todo-List Cooking Recipes <br /> Register</h1>

        <div className='formRegisterTodoList'>
          <div className='containerLb&InpRegister'>
          <label className='LbRegister' htmlFor="">Username:</label>
                <input className='InpRegister' value={Username} onChange={userName} type="text" />
         </div><br />

        <div className='containerLb&InpRegister'>
          <label className='LbRegister' htmlFor="">Email:</label>
                <input className='InpRegister' value={Email} onChange={email} type="email" name="" id="email" />
        </div><br />

        <div className='containerLb&InpRegister'>
          <label className='LbRegister' htmlFor="">Password:</label>
                <input className='InpRegister' value={Password} onChange={password} type="password" name="" id="password" />
        </div><br />

        <div className='containerLb&InpRegister'>
          <label className='LbRegister' htmlFor="">Terms & Conditions</label>
                <input className='checkboxRegister' type="checkbox" name="" id="" />
        </div>

      <input className='btnRegister' type="button" value="Register" onClick={register} />

      <p className='LinkSignIn'>Do you already have an account? <br /><Link to="/signin">Sign In</Link></p>
  </div>
 </div>
  )
}

export default FormRegister