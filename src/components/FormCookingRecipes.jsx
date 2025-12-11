    import React, { useState } from 'react'
    import { deleteRecipes, getRecipes, postRecipes, updateRecipes } from '../Services/llamadosRecipes'
    
    import '../Styles/FormRecipes.css'



    function FormCookingRecipes() {
        
        const [nameRecipe, setNameRecipe]=useState()
        const [ingredientsRecipe, setIngredientsRecipe]=useState()
        const [descriptionRecipe, setDescriptionRecipe] =useState()
        const [recipes, setRecipes] = useState([])

        
        const [reload,setReload] = useState(false)
        
       


        function nameFunctRecipe(evento) {
            setNameRecipe(evento.target.value)
        }

        function ingredientsFunctRecipe(evento) {
            setIngredientsRecipe(evento.target.value)
        }


        function descriptionFunctRecipe(evento) {
            setDescriptionRecipe(evento.target.value)
        }



        function post() {          
            postRecipes( nameRecipe, ingredientsRecipe, descriptionRecipe, false)
            setReload(!reload)
        }

    return (

        <div className='ContainerAllForm'> 

        <h1 className='TituloP'>Form New Cooking Recipes</h1>
        
        <div className='FormContainer' >
            <div className='containerFormRecipes'>
                <h3 className='tituloOnFormRecipes'>Info Recipe</h3>
            </div>

        <div className='containerUniqueFormRecipes'>
            <label className='labelFormRecipe' htmlFor="">Name of Recipe</label><br />
            <input className='inputFormRecipes' value={nameRecipe} onChange={nameFunctRecipe} type="text" />
        </div>

        <div className='containerUniqueFormRecipes'> 
            <label className='labelFormRecipe' htmlFor="">Ingredients of Recipe</label><br />
            <input className='inputFormRecipes'  value={ingredientsRecipe} onChange={ingredientsFunctRecipe} type="text" />
        </div>
        
        <div className='containerUniqueFormRecipes'>
            <label className='labelFormRecipe' htmlFor="">Description of Recipe</label><br />
            <input className='inputFormRecipes'  value={descriptionRecipe} onChange={descriptionFunctRecipe} type="text" />
        </div>

        

       

        <input className='btnPost' onClick={post} type="button" value="Post" /><br /><br />
        </div>

     </div>
    )
    }

    export default FormCookingRecipes