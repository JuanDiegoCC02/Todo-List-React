import React from 'react'
import FormRegister from '../components/FormRegister'
import NavTodoListRecipes from '../components/NavTodoListRecipes'

function Register() {
  return (
    <div>
      <nav>
        <NavTodoListRecipes/>
      </nav>
      <main>
         <FormRegister/>
        </main>
      
    </div>
  )
}

export default Register