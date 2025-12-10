import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function NavTodoListRecipes() {
  const navigate = useNavigate ()
  const closeUser = ()=>{
    localStorage.clear();
    navigate("/")
  }
  return (
    <nav>
        <ul>
          {
            !localStorage.getItem("typeUser")&&(
            <>
           <li><Link to="/register">Register</Link></li>
           <li><Link to="signin">Sing In</Link></li>
           </>
           )
          }
           <li><Link to="/">Home</Link> </li>
          {
            localStorage.getItem("typeUser")&&(
            <>
            <li><Link to="/formRecipesPage"> Form Cooking Recipes </Link></li>
            <li><Link to="/listRecipesPage"> List Cooking Recipes </Link></li>

            <li><button className='btnCloseSession' onClick={closeUser}>Close Session</button></li>
           </>
           )
          }
        </ul>
    </nav>
  )
}

export default NavTodoListRecipes