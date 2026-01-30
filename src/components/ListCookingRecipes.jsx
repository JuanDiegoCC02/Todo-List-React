import React, { useEffect, useState } from 'react'
import { deleteRecipes, getRecipes, updateRecipes } from '../Services/llamadosRecipes'
import "../Styles/ListCookingRecipes.css"

function ListCookingRecipes() {
           
    const [recipes, setRecipes] = useState([])

    const [newStepText, setNewStepText] = useState("")
    const [newStepPriority, setNewStepPriority] = useState("Medium")
    const [currentRecipeID, setCurrentRecipeID] = useState(null)
    
    const [editName,setEditName] = useState("")
    const [editIngredients,setEditIngredients] = useState("")
    const [editDescription, setEditDescription] = useState("")
   
    const [reload,setReload] = useState(false)
    const [editingRecipeId, setEditingRecipeId] = useState(null);
    const [showAddCookingProcess, setShowAddCookingProcess] = useState(false)

    const [editingStepId, setEditingStepId] = useState(null); 
    const [editStepText, setEditStepText] = useState("");    
    const [editStepPriority, setEditStepPriority] = useState("Medium");

    
    const handleAddStep = async (recipeId) => {
    if (!newStepText.trim()) {
        alert("Complete the text for step.");
        return;
    }

    // 1- create new step
    const newStep = {
        stepId: Date.now(), 
        text: newStepText,
        priority: newStepPriority,
        isCompleted: false
    };

    // 2- request recipe update
    const recipeIndex = recipes.findIndex(r => r.id === recipeId);
    if (recipeIndex === -1) return;

    const currentSteps = recipes[recipeIndex].Steps || []; 
    const updatedSteps = [...currentSteps, newStep];
    await updateRecipes({ Steps: updatedSteps }, recipeId);
    
    const updatedRecipes = [...recipes];
    updatedRecipes[recipeIndex].Steps = updatedSteps;
    setRecipes(updatedRecipes);

    setNewStepText("");
    setNewStepPriority("Medium"); 
    setShowAddCookingProcess(false);
    setCurrentRecipeID(null);
    };

    const handleToggleAddStep = (recipeId) => {
    if (currentRecipeID === recipeId) {
        setShowAddCookingProcess(false);
        setCurrentRecipeID(null);
    } else {
        setShowAddCookingProcess(true);
        setCurrentRecipeID(recipeId);
    }
};


    // recipe status handle function
    const handleRecipeCheck = async (id, index) => {
        const updateCookingRecipes =  [...recipes]
        updateCookingRecipes[index].completeRecipe = !updateCookingRecipes[index].completeRecipe
        await updateRecipes(
            {"completeRecipe": updateCookingRecipes[index].completeRecipe}, id
        )
        setRecipes(updateCookingRecipes)
    }

    // recipe steps handle function
     const handleSaveStep = async (recipeId) => {
            if (!editStepText.trim()) {
                alert("Full edition to continue.");
                return;
            }
    
            // 1. Encuentra el índice de la receta
            const recipeIndex = recipes.findIndex(r => r.id === recipeId);
            if (recipeIndex === -1) return;
    
            // 2. Map para modificar el paso específico
            const updatedSteps = recipes[recipeIndex].Steps.map(step => {
                if (step.stepId === editingStepId) {
                    return {
                        ...step,
                        text: editStepText,
                        priority: editStepPriority
                    };
                }
                return step;
            });
    
            // 3. update a el JSON Server
            await updateRecipes({ Steps: updatedSteps }, recipeId);
    
            // 4. update local state
            const updatedRecipes = [...recipes];
            updatedRecipes[recipeIndex].Steps = updatedSteps;
            setRecipes(updatedRecipes);
    
            // 5. reloat  de edición
            setEditingStepId(null);
            setEditStepText("");
            setEditStepPriority("Medium");
        };
        const handleEditStep = (step) => {
              setEditingStepId(step.stepId); 
              setEditStepText(step.text);    
              setEditStepPriority(step.priority); 
            };
        const handleDeleteStep = async (recipeId, stepIdToDelete) => {
            const recipeIndex= recipes.findIndex(r => r.id === recipeId);
        if (recipeIndex === -1) return;
        
        const currentSteps = recipes[recipeIndex].Steps || [];
        const updatedSteps = currentSteps.filter(step => step.stepId !== stepIdToDelete);
        await updateRecipes({ Steps: updatedSteps }, recipeId);

      
        const updatedRecipes = [...recipes];
        updatedRecipes[recipeIndex].Steps = updatedSteps;
        setRecipes(updatedRecipes);

     
    };
    
   // logic para iniciar la edición de RECETA
      const handleEditRecipe = (recipe) => {
        // Si ya está en edicion, la cerramos
        if (editingRecipeId === recipe.id) {
            setEditingRecipeId(null);
        } else {
            // else si no cargar para abrir el modo edición para esta receta
            setEditingRecipeId(recipe.id);
            // Pre-cargamos los valores actuales
            setEditName(recipe.nameRecipe);
            setEditIngredients(recipe.ingredientsRecipe);
            setEditDescription(recipe.descriptionRecipe);
        }
      };
        function editFunctRecipe(id) {
           const editRecipe = {
              "nameRecipe":editName,
              "ingredientsRecipe":editIngredients,
              "descriptionRecipe" : editDescription
            }   
            updateRecipes(editRecipe, id)
            setEditingRecipeId(null)
            setReload(!reload);
          }
  
      

            // function delete
      async function deleteFunctRecipe(id) {
            await deleteRecipes(id)
           setReload(!reload)
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

    <div className='allListRecipeContainer'>

        <h1 className='titleNewRecipes'>New Cook Recipes</h1>

        <div className='containerCountRecipes'>
            <h3 className='titleCountRecipes'>Recipes Count Check</h3>
            <h4 className='countRecipesCheck'>{completedCount}</h4>
        </div>


     <ul className='UlListRecipes'>   
        {recipes.map ((recipe,index) => (
        <li className='LiListRecipes' key={index}>
        <strong className='infoListRecipe'> Name:</strong> {recipe.nameRecipe} <br />

        <strong className='infoListRecipe'> Description:</strong> {recipe.descriptionRecipe} <br />

        <strong className='infoListRecipe'> Ingredients:</strong>  {recipe.ingredientsRecipe} <br />

     
         <div>
        <label className='LbRecipeCheck' htmlFor="">Recipe Check</label>
        <input className='btnCheckbox'
         type="checkbox" 
         name="recipeCheck" 
         id="recipeCheck" 
         checked={recipe.completeRecipe}
         onChange={()=>handleRecipeCheck(recipe.id,index)}

        />
       
        
        
        <button 
            className='btnEdit' 
            onClick={() => handleEditRecipe(recipe)}
        >
            {editingRecipeId === recipe.id ? 'Close Edit' : 'Edit'}
        </button>
        
        {editingRecipeId === recipe.id &&
        <>
        <input className='InpFormStep' onChange={(e)=> setEditName(e.target.value)} value={editName} type="text" placeholder='name' />
        <input className='InpFormStep' onChange={(e)=> setEditIngredients(e.target.value)} value={editIngredients} type="text" placeholder='ingredients'/>
        <input className='InpFormStep' onChange={(e)=> setEditDescription(e.target.value)} value={editDescription} type="text" placeholder='description'/>
       
        <button className='btnSaveEdit' onClick={()=>editFunctRecipe(recipe.id)}>Complete Edit</button>
        </>
        }
        <button className='btnDelete' onClick={e=>deleteFunctRecipe(recipe.id)}>Delete</button>
    </div>

     
{/* access from card steps CookingRecipes */}
<div className='allCardSteps'>
    <button 
        className='btnShowAddCookingProcess' 
        onClick={() => handleToggleAddStep(recipe.id)} 
    >
        {currentRecipeID === recipe.id && showAddCookingProcess ? 'Close' : 'Add steps'}
    </button>
    
    {/* show Create steps cooking recipe*/}
    {showAddCookingProcess && currentRecipeID === recipe.id && (
        <div className='containerFormAddStep'>
            <hr className='hrCardAddStep'/>

            <h4 className='titleNewStep'>New step</h4>
            
            {/*  step text input */}
            <label className='LbFormStep' htmlFor={`step-text-${recipe.id}`}>Step Cooking Recipe  </label>
            <input 
                type="text" 
                className='InpFormStep'
                id={`step-text-${recipe.id}`}
                value={newStepText}
                onChange={(e) => setNewStepText(e.target.value)}
                placeholder="Example: Wash the lemons and grate only the green outer part, not the white inner part."
            /> 
            
            {/* select from priority */}
            <label className='LbFormStep' htmlFor={`step-priority-${recipe.id}`}>Priority</label>
            <select
                id={`step-priority-${recipe.id}`}
                value={newStepPriority}
                onChange={(e) => setNewStepPriority(e.target.value)}
            >
                <option className='optFormStep' value="High">High</option>
                <option className='optFormStep' value="Medium">Medium</option>
                <option className='optFormStep' value="Low">Low</option>
            </select>

            {/* btn save new step */}
            <button className='btnSaveStep' onClick={() => handleAddStep(recipe.id)}> Save Step </button>
            <hr className='hrCardAddStep'/>
        </div>
    )}
   
    {recipe.Steps && recipe.Steps.length > 0 && (
    <>
        <h4 className='titleStepsCookingRecipe'>Steps Cooking Recipe:</h4>
        <ul className='UlListSteps'>
            {recipe.Steps.map((step, stepIndex) => (
                <li className='LiStepsCookingRecipe' key={stepIndex}>
{/*Show edit steps*/}
            {editingStepId === step.stepId ? ( 
                <div className='containerEditStep'>
                    <input 
                        type="text"
                        className='InpFormStep EditStepText'
                        value={editStepText} 
                        onChange={(e) => setEditStepText(e.target.value)} 
                        placeholder="Update description of steps"
                    />
                    <select className='OptFormStep EditStepPriority' value={editStepPriority} onChange={(e) => setEditStepPriority(e.target.value)}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                    <button className='btnSaveStep' onClick={() => handleSaveStep(recipe.id)}> Save </button>
                    <button className='btnCancelEdit' onClick={() => setEditingStepId(null)}> Cancel </button>
                </div>
            ) : (
   
                <>
                    {step.text} <span className={`priority-${step.priority}`}>[{step.priority}]</span>
                    <button className='btnEditStep' onClick={() => handleEditStep(step)}> Edit Step </button>
                    <button 
                     className='btnDeleteStep' 
                     onClick={() => handleDeleteStep(recipe.id, step.stepId)}
                    >Delete Step</button>
                </>
            )}
        </li> 
    ))}
    </ul>
    </> 
    )}
</div>


        </li> 
    ))}
    </ul>

   
    </div>
  )
}

export default ListCookingRecipes