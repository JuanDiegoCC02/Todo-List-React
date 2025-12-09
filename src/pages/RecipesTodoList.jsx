import React from 'react'
import FormCookingRecipes from '../components/FormCookingRecipes'
import NavTodoListRecipes from '../components/NavTodoListRecipes'

import '../Styles/StyleTodoList.css'


function RecipesTodoList() {
  return (
    <div>
       <nav>
        <NavTodoListRecipes/>
        </nav>
        <main>
        <FormCookingRecipes/>
        </main>
        <footer>

        </footer>
    </div>
  )
}

export default RecipesTodoList