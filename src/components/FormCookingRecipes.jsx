    import React, { useEffect, useState } from 'react'
    import { deleteRecipes, getRecipes, postRecipes, updateRecipes } from '../Services/llamadosRecipes'
    
    import '../Styles/FormBooks.css'



    function FormCookingRecipes() {
        
        const [nameRecipe, setNameRecipe]=useState()
        const [ingredientsRecipe, setIngredientsRecipe]=useState()
        const [cookingProcess, setCookingProcess] =useState()
        const [recipes, setRecipes] = useState([])

        const [showRecipes,setShowRecipes] = useState(false)
        
        const [editName,setEditName] = useState("")
        const [editIngredients,setEditIngredients] = useState("")
        const [editCookingProcess, setEditCookingProcess] = ("")
        
        const [reload,setReload] = useState(false)
        
        const [count, setCount] = useState(0)

        const [statusRecipe, setStatusRecipe]=useState()
        const [editStatusRecipe,setEditStatusRecipe] = useState("")

        const handleRecipeCheck = async(id, index) => {
            const updatedRecipes = [...recipes]
            updatedRecipes[index].completeRecipe = !updatedRecipes[index].completeRecipe
            await updateRecipes(
                {"completeRecipe": updatedRecipes[index].completeRecipe}, id)
            setRecipes(updatedRecipes);

            if (updatedRecipes[index].completeRecipe) {
                setCount(count + 1);
            } else {
                setCount(count - 1);
            }
        }

       

        

        function nameFunctRecipe(evento) {
            setNameRecipe(evento.target.value)
        }

        function ingredientsFunctRecipe(evento) {
            setIngredientsRecipe(evento.target.value)
        }

        function cookingProcessFunct(e) {
            setCookingProcess(e.target.value)
        }

        function statusFunctRecipe(evento) {
            setStatusRecipe(evento.target.value)
        }

        function editFunctName(evento){
            setEditName(evento.target.value)
        }
        function editFunctIngredients(evento){
            setEditIngredients(evento.target.value)
        }
        function editCookingProcessFunct(params) {
            
        }
        function editFunctStatus(evento){
            setEditStatusRecipe(evento.target.value)
        }

// Funcion delete
        function deleteFunctRecipe (id) {
            deleteRecipes(id)
            setReload(!reload);
        }   
// Funcion edit
    function editFunctRecipe(id) {
        const editRecipe = {
            "nameRecipe":editFunctName,
            "ingredientsRecipe":editFunctIngredients,
            "cookingProcess" : editCookingProcessFunct,
            "statusRecipe":editFunctStatus
        }   
        updateRecipes(editRecipe, id)
        setReload(!reload);
    }

    useEffect(()=>{
        async function list() {
            const data = await getRecipes ("recipes")
            setRecipes (data)
    }
    list()
    }, [reload] )

        function post() {          
            postRecipes( nameRecipe, ingredientsRecipe, cookingProcess, statusRecipe,false)
            setReload(!reload)
        }

    return (

        <div className='ContainerAllForm'> 

        <h1 className='TituloP'>Form New Cooking Recipes</h1>
        
        <div className='FormContainer' >
            <h1>Info Recipe</h1>
        <div className='FormNameBook'>
            <label htmlFor="">Name of Recipe</label><br />
            <input value={nameRecipe} onChange={nameFunctRecipe} type="text" />
        </div>

        <div>
            <label htmlFor="">Ingredients of Recipe</label><br />
            <input value={ingredientsRecipe} onChange={ingredientsFunctRecipe} type="text" />
        </div>
        
        <div>
            <label htmlFor="">Cooking Process of Recipe</label><br />
            <input value={cookingProcess} onChange={cookingProcessFunct} type="text" />
        </div>

        <div>
            <label htmlFor="">Status of Recipe</label><br />
            <input value={statusRecipe} onChange={statusFunctRecipe} type="text" />
        </div>

        <input onClick={post} type="button" value="Post" />
        <div><br />
        </div>
        <h3>Count Recipes Check</h3>
        <h4>{count}</h4>

        <br /> <hr  className='Line'/>

    <ul className='ListaBooks'>    
        <h1>New Recipes</h1>
        {recipes.map ((recipe,index) => (
        <li className='ContainerNewBook' key={index}>
        <strong>Recipe Name:</strong> <br /> {recipe.nameRecipe} <br />

        <strong>Recipe Ingredients:</strong> <br /> {recipe.ingredientsRecipe} <br />

        <strong>Recipe Cooking Process:</strong> <br /> {recipe.cookingProcess} <br />

        <strong>Recipe Status:</strong> <br /> {recipe.statusRecipe} <br />
        

<div>
        <label htmlFor="">Recipe Check</label>
        <input className='btnCheckbox'
         type="checkbox" 
         name="recipeCheck" 
         id="recipeCheck" 
         checked={recipe.completeRecipe}
         onChange={()=>handleRecipeCheck(recipe.id,index)}

        />
       
        
        <button className='btnDelete' onClick={e=>deleteFunctRecipe(recipe.id)}>Delete</button>
        <button className='btnEdit' onClick={()=>setShowRecipes(!showRecipes)}>Edit</button>
        {showRecipes &&
        <>
        <input onChange={(e)=> editName} type="text" placeholder='name' />
        <input onChange={(e)=> editIngredients} type="text" placeholder='ingredients'/>
        <input onChange={(e)=> editCookingProcess} type="text" placeholder='cookingProcess'/>
        <input  onChange={(e)=> editStatusRecipe} type="text" placeholder='status'/>
        <button onClick={()=>editFunctRecipe(recipe.id)}>Complete Edit</button>
        </>
        }
</div>
        </li> 
    ))}
    </ul>

    </div>

        </div>

    )
    }

    export default FormCookingRecipes