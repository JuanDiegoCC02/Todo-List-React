import React from 'react'
import formImgRecipes from '../images/formRecipes.png'
import listImgRecipes from '../images/listGetRecipes.png'


function ExplainAppHome() {
  return (
    <div>
        <div><h1>Explanation of the Todo-List of Recipes</h1></div>

  <div>
        <div>
            <h3>Recipe creation form</h3>
            <strong>Description</strong>
            <div><img src={formImgRecipes} alt="" /></div>
        </div><br /><br />
          <div>
            <h3>Get the Recipe list</h3>
            <strong>Desription</strong>
            <div><img src= {listImgRecipes} alt="" /></div>
        </div>
  </div>

    </div>
  )
}

export default ExplainAppHome