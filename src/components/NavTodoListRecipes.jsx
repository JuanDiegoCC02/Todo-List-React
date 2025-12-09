import React from 'react'
import { Link } from 'react-router-dom'

function NavTodoListRecipes() {
  return (
    <nav>
        <ul>
            <li><Link to="/">Home</Link> </li>
            <li><Link to="/recipesTodoList"> Cooking Recipes </Link></li>
        </ul>
    </nav>
  )
}

export default NavTodoListRecipes