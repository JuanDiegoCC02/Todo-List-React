import React from 'react'
import HomeCookingRecipes from '../components/HomeCookingRecipes'
import NavTodoListRecipes from '../components/NavTodoListRecipes'

function HomeRecipes() {
  return (
    <div>
        <nav>
        <NavTodoListRecipes/>
        </nav>
        <main>
        <HomeCookingRecipes/>
        </main>
        <footer>

        </footer>
    </div>
  )
}

export default HomeRecipes