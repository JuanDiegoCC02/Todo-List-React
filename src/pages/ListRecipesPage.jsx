import React from 'react'
import ListCookingRecipes from '../components/ListCookingRecipes'
import NavTodoListRecipes from '../components/NavTodoListRecipes'

function ListRecipesPage() {
  return (
    <div>
        <nav>
        <NavTodoListRecipes/>
        </nav>
        <main>
        <ListCookingRecipes/>
        </main>
        <footer>

        </footer>
    </div>
  )
}

export default ListRecipesPage