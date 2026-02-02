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
            <strong className='DescriptionApp'>Description</strong>
            <div className='containerImgExplain'><img className='ImgExplain' src={formImg} alt="" /></div>
        </div>
         <div className='containerCardHome'>
            <h3 className='TitleExplainApp'> Recipe Counter </h3>
            <strong className='DescriptionApp'>Description</strong>
            <div className='containerImgExplain'><img className='ImgExplain' src={listImg} alt="" /></div>
        </div>
         <div className='containerCardHome'>
            <h3 className='TitleExplainApp'>Get Recipe List</h3>
            <strong className='DescriptionApp'>Description</strong>
            <div className='containerImgExplain'><img className='ImgExplain' src={recipeImg} alt="" /></div>
        </div>
          <div className='containerCardHome'>
            <h3 className='TitleExplainApp'>Add steps to the Recipe</h3>
            <strong className='DescriptionApp'>Desription</strong>
            <div className='containerImgExplain'><img className='ImgExplain' src= {stepImg} alt="" /></div>
        </div>
  </div>

    </div>
  )
}

export default ExplainAppHome