import React from 'react'
import "../Styles/ExplainAppHome.css"
import formImgRecipes from '../images/formRecipes.png'
import listImgRecipes from '../images/listGetRecipes.png'


function ExplainAppHome() {
  return (
    <div>
        <div className='containerTitleHome'><h1 className='TitleHome'>Explanation of the Todo-List of Recipes</h1></div>

  <div className='containerAllCardsHome'>
        <div className='containerCardHome'>
            <h3 className='TitleExplainApp'>Recipe creation form</h3>
            <strong className='DescriptionApp'>Description</strong>
            <div className='containerImgExplain'><img className='ImgExplain' src={formImgRecipes} alt="" /></div>
        </div><br /><br />
          <div className='containerCardHome'>
            <h3 className='TitleExplainApp'>Get the Recipe list</h3>
            <strong className='DescriptionApp'>Desription</strong>
            <div className='containerImgExplain'><img className='ImgExplain' src= {listImgRecipes} alt="" /></div>
        </div>
  </div>

    </div>
  )
}

export default ExplainAppHome