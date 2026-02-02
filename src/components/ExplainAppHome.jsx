import React from 'react'
import "../Styles/ExplainAppHome.css"
import formImg from "../images/form-TodoList.png"
import listImg from "../images/list-TodoList.png"
import recipeImg from "../images/recipe-TodoList.png"
import stepImg from "../images/step-TodoList.png"



function ExplainAppHome() {
  return (
    <div className='contianerHome'>
        <div className='containerTitleHome'><h1 className='TitleHome'>Explanation of the Todo-List of Recipes</h1></div>

  <div className='containerAllCardsHome'>
        <div className='containerCardHome'>
            <h3 className='TitleExplainApp'>Recipe Creation Form</h3>
            <strong className='DescriptionApp'>
               In this form you will be able to create recipes, entering the Recipe Name,
               a Recipe Description and the Ingredients you will use.
               </strong>
            <div className='containerImgExplain'><img className='ImgExplain' src={formImg} alt="" /></div>
        </div>
         <div className='containerCardHome'>
            <h3 className='TitleExplainApp'> Recipe Counter </h3>
            <strong className='DescriptionApp'>
              In the ListCookingRecipe area you will find a counter which will keep track of the 
              recipes you complete.
            </strong>
            <div className='containerImgExplain'><img className='ImgExplain' src={listImg} alt="" /></div>
        </div>
         <div className='containerCardHome'>
            <h3 className='TitleExplainApp'>Get Recipe List</h3>
            <strong className='DescriptionApp'>
              In this same area, the record of the recipes you have generated in the form will be displayed.
            </strong>
            <div className='containerImgExplain'><img className='ImgExplain' src={recipeImg} alt="" /></div>
        </div>
          <div className='containerCardHome'>
            <h3 className='TitleExplainApp'>Add steps to the Recipe</h3>
            <strong className='DescriptionApp'>
              At the bottom of the recipe card you will find an option titled "add steps".
              Here you can open a form to add all the steps of the recipe you carry out.
            </strong>
            <div className='containerImgExplain'><img className='ImgExplain' src= {stepImg} alt="" /></div>
        </div>
  </div>

    </div>
  )
}

export default ExplainAppHome