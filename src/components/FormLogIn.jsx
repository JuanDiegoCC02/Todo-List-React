import React, {useState} from 'react'
import llamadoServicios from '../Services/llamados';
import { Link, useNavigate } from 'react-router-dom';


function FormLogIn() {

        const[Username, SetUserName]=useState()
        const[Email, SetEmail]=useState()
        const[Password, SetPassword]=useState()

        const navigate = useNavigate ()

        function nombre(evento){
                SetUserName(evento.target.value)
        }
        function email(evento){
                SetEmail(evento.target.value)
        }
        function password(evento){
                SetPassword(evento.target.value)
        }

        function registrar (){
                llamadoServicios.postUsers(Username, Email, Password)

                navigate ('/SignIn')
        }

    

  return (
    <div>
     <h1>Log In</h1>
        <div>
          <label htmlFor="">Username:</label><br />
                <input value={Username} onChange={nombre} type="text" />
        </div>
        <div>
          <label htmlFor="">Email:</label><br />
                <input value={Email} onChange={email} type="email" name="" id="correo" />
        </div>
        <div>
          <label htmlFor="">Password:</label><br />
                <input value={Password} onChange={password} type="password" name="" id="contraseña" />
        </div>
        <div>
          <label htmlFor="">Terminos y Condiciones</label>
                <input type="checkbox" name="" id="" />
        </div>

<input type="button" value="Registrar" onClick={registrar} />

<p>¿Ya tienes una Cuenta? <br /><Link to="/SignIn">Ingresa en el Sign In</Link></p>

    </div>
  )
}

export default FormLogIn