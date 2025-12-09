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
        function editCookingProcessFunct(e) {
            setEditCookingProcess(e.target.value)
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

        <input onClick={post} type="button" value="Post" /><br /><br />
        </div>

     </div>
    )
    }

    export default FormCookingRecipes