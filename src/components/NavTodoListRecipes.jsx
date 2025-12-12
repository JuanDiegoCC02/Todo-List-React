import React from 'react'
import "../Styles/NavTodoListRecipes.css"
import { Link, useNavigate } from 'react-router-dom'

function NavTodoListRecipes() {
  const navigate = useNavigate ()
  const closeUser = ()=>{
    localStorage.clear();
    navigate("/")
  }
  return (
    <nav className='navAllContainer'>
        <ul className='navUl'>
          {
            !localStorage.getItem("typeUser")&&(
            <>
          <li className='navLi'><Link to="/register">Register</Link></li>
          <li className='navLi'><Link to="signin">Sing In</Link></li>
          </>
          )
          }
          <li className='navLi'><Link to="/">Home</Link> </li>
          {
            localStorage.getItem("typeUser")&&(
            <>
            <li className='navLi'><Link to="/formRecipesPage"> Form Cooking Recipes </Link></li>
            <li className='navLi'><Link to="/listRecipesPage"> List Cooking Recipes </Link></li>

            <li className='navLi'><button className='btnCloseSession' 
                onClick={closeUser}>Close Session</button></li>
          </>
          )
          }
        </ul>
    </nav>
  )
}

export default NavTodoListRecipes