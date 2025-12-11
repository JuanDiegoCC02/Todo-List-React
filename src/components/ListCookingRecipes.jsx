import React, { useEffect, useState } from 'react'
import { deleteRecipes, getRecipes, updateRecipes } from '../Services/llamadosRecipes'

function ListCookingRecipes() {
           
    const [recipes, setRecipes] = useState([])

    const [newStepText, setNewStepText] = useState("")
    const [newStepPriority, setNewStepPriority] = useState("Media")
    const [currentRecipeID, setCurrentRecipeID] = useState(null)
    
    const [editName,setEditName] = useState("")
    const [editIngredients,setEditIngredients] = useState("")
    const [editDescription, setEditDescription] = useState("")
   
    const [reload,setReload] = useState(false)
    const [showRecipes,setShowRecipes] = useState(false)
    const [showAddCookingProcess, setShowAddCookingProcess] = useState(false)

    
    const handleAddStep = async (recipeId) => {
    // 1. Validar que haya texto
    if (!newStepText.trim()) {
        alert("El paso no puede estar vacío.");
        return;
    }

    // 2. Crear el nuevo objeto Step
    const newStep = {
        stepId: Date.now(), 
        text: newStepText,
        priority: newStepPriority,
        isCompleted: false
    };

    // 3. Encontrar la receta en el estado local
    const recipeIndex = recipes.findIndex(r => r.id === recipeId);
    if (recipeIndex === -1) return;
    
   
    const currentSteps = recipes[recipeIndex].Steps || []; 
    const updatedSteps = [...currentSteps, newStep];
    
    // 4. Persistir SOLO el array de Pasos en la DB/API
    // Asume que 'updateRecipes' acepta un objeto parcial y el ID.
    await updateRecipes({ Steps: updatedSteps }, recipeId);

    // 5. Actualizar el estado local de 'recipes'
    const updatedRecipes = [...recipes];
    updatedRecipes[recipeIndex].Steps = updatedSteps;
    setRecipes(updatedRecipes);

   
    setNewStepText("");
    setNewStepPriority("Media");
    setShowAddCookingProcess(false);
    setCurrentRecipeID(null);
    };

    const handleToggleAddStep = (recipeId) => {
    // Si ya está abierto para esta receta, ciérralo.
    if (currentRecipeID === recipeId) {
        setShowAddCookingProcess(false);
        setCurrentRecipeID(null);
    } else {
        // Ábrelo para la nueva receta.
        setShowAddCookingProcess(true);
        setCurrentRecipeID(recipeId);
    }
};


    // recipe status handle function
    const handleRecipeCheck = async (id, index) => {
        const updateCookingRecipes =  [...recipes]
        updateCookingRecipes[index].completeRecipe = !updateCookingRecipes[index].completeRecipe
        await updateRecipes(
            {"completeRecipe": updateCookingRecipes[index].completeRecipe}, id
        )
        setRecipes(updateCookingRecipes)
    }
    
      

    // function delete
            function deleteFunctRecipe (id) {
                deleteRecipes(id)
                setReload(!reload);
            }   
    // function edit
        function editFunctRecipe(id) {
            const editRecipe = {
                "nameRecipe":editName,
                "ingredientsRecipe":editIngredients,
                "descriptionRecipe" : editDescription,
                
            }   
            updateRecipes(editRecipe, id)
            setShowRecipes(false)
            setReload(!reload);
        }
    
        useEffect(()=>{
            async function list() {
                const data = await getRecipes ("recipes")
                setRecipes (data)
        }
        list()
        }, [reload] )
        const completedCount = recipes.filter(recipe => recipe.completeRecipe).length;
  return (
    <div>
        <ul className='ListaBooks'>    
        <h1>New Recipes</h1>
        {recipes.map ((recipe,index) => (
        <li className='ContainerNewBook' key={index}>
        <strong>Recipe Name:</strong> <br /> {recipe.nameRecipe} <br />

        <strong>Recipe Ingredients:</strong> <br /> {recipe.ingredientsRecipe} <br />

        <strong>Recipe Description:</strong> <br /> {recipe.descriptionRecipe} <br />

     
{/* access from card steps CookingRecipes */}
<div>
    <button 
        className='btnShowAddCookingProcess' 
        onClick={() => handleToggleAddStep(recipe.id)} 
    >
        {currentRecipeID === recipe.id && showAddCookingProcess ? 'Cerrar Formulario' : 'Add steps'}
    </button>
    
    {/* show Create steps cooking recipe*/}
    {showAddCookingProcess && currentRecipeID === recipe.id && (
        <div className='form-add-step'>
            <hr/>
            <h4>New step</h4>
            
            {/*  step text input */}
            <label htmlFor={`step-text-${recipe.id}`}>Cooking Step</label>
            <input 
                type="text" 
                id={`step-text-${recipe.id}`}
                value={newStepText}
                onChange={(e) => setNewStepText(e.target.value)}
                placeholder="Ej: Lavar y cortar las verduras"
            />
            
            {/* select from priority */}
            <label htmlFor={`step-priority-${recipe.id}`}>Priority</label>
            <select
                id={`step-priority-${recipe.id}`}
                value={newStepPriority}
                onChange={(e) => setNewStepPriority(e.target.value)}
            >
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
            </select>

            {/* btn save step */}
            <button 
                onClick={() => handleAddStep(recipe.id)}
            >
                Save Step
            </button>
            <hr/>
        </div>
    )}
    {/* show getting steps*/}
    {recipe.Steps && recipe.Steps.length > 0 && (
    <>
        <h4>Pasos de la Receta:</h4>
        <ul>
            {recipe.Steps.map((step, stepIndex) => (
                <li key={stepIndex}>
                    [**{step.priority}**] {step.text} 
                    
                </li>
            ))}
        </ul>
    </>
    )}
</div>


        
    {/*Card settings Recipe*/}
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
        <input onChange={(e)=> setEditName(e.target.value)} value={editName} type="text" placeholder='name' />
        <input onChange={(e)=> setEditIngredients(e.target.value)} value={editIngredients} type="text" placeholder='ingredients'/>
        <input onChange={(e)=> setEditDescription(e.target.value)} value={editDescription} type="text" placeholder='description'/>
       
        <button onClick={()=>editFunctRecipe(recipe.id)}>Complete Edit</button>
        </>
        }
    </div>
        </li> 
    ))}
    </ul>

    <div>
        <h3>Count Recipes Check</h3>
        <h4>{completedCount}</h4>
        </div>

    </div>
  )
}

export default ListCookingRecipes