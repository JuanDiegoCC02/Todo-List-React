    import React, { useState } from 'react'
    import { deleteRecipes, getRecipes, postRecipes, updateRecipes } from '../Services/llamadosRecipes'
    
    import '../Styles/FormRecipes.css'



    function FormCookingRecipes() {
        
        const [nameRecipe, setNameRecipe]=useState()
        const [ingredientsRecipe, setIngredientsRecipe]=useState()
        const [descriptionRecipe, setDescriptionRecipe] =useState()
     

        
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
            try {
            postRecipes( nameRecipe, ingredientsRecipe, descriptionRecipe, false)
              setReload(!reload)
                setNameRecipe("")
                setDescriptionRecipe("")
                setIngredientsRecipe("")
            } catch (error) {
                console.error("Post of the failed cooking recipe.", error);
                alert("Post of the Failed cooking recipe.")
            } 
          
        }

    return (

        <div className='ContainerAllForm'> 

        <h1 className='TituloP'>Form New Cooking Recipes</h1>
        
        <div className='FormContainer' >
            <div className='containerFormRecipes'>
                <h3 className='tituloOnFormRecipes'>Recipe Information</h3>
            </div>

        <div className='containerUniqueFormRecipes'>
            <label className='labelFormRecipe' htmlFor="">Name</label>
            <input className='inputFormRecipes' value={nameRecipe} onChange={nameFunctRecipe} type="text" />
        </div>

        <div className='containerUniqueFormRecipes'>
            <label className='labelFormRecipe' htmlFor="">Description</label>
            <input className='inputFormRecipes'  value={descriptionRecipe} onChange={descriptionFunctRecipe} type="text" />
        </div>

        <div className='containerUniqueFormRecipes'> 
            <label className='labelFormRecipe' htmlFor="">Ingredients</label>
            <input className='inputFormRecipes'  value={ingredientsRecipe} onChange={ingredientsFunctRecipe} type="text" />
        </div>
        

        <input className='btnPost' onClick={post} type="button" value="Create" /><br />
        </div>

     </div>
    )
    }

    export default FormCookingRecipes