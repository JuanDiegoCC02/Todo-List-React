import React from 'react'
import FormSignIn from '../components/FormSignIn'
import NavTodoListRecipes from "../components/NavTodoListRecipes"

function SignIn() {
  return (
    <div>
      <nav>
        <NavTodoListRecipes/>
      </nav>
      <main>
      <FormSignIn/>
      </main>
        
    </div>
  )
}

export default SignIn