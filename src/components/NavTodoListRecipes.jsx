import React from 'react'
import { Link } from 'react-router-dom'

function NavTodoListRecipes() {
  return (
    <nav>
        <ul>
          {
            !localStorage.getItem("typeUser")&&(
            <>
           <li><Link to="/register">Register</Link></li>
           <li><Link to="singin">Sing In</Link></li>
           </>
           )
          }
           <li><Link to="/">Home</Link> </li>
          {
            localStorage.getItem("typeUser")&&(
            <>
            <li><Link to="/formRecipesPage"> Form Cooking Recipes </Link></li>
            <li><Link to="/listRecipesPage"> List Cooking Recipes </Link></li>
           </>
           )
          }
        </ul>
    </nav>
  )
}

export default NavTodoListRecipes