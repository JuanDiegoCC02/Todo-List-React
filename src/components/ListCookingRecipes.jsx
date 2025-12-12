import React, { useEffect, useState } from 'react'
import { deleteRecipes, getRecipes, updateRecipes } from '../Services/llamadosRecipes'
import "../Styles/ListCookingRecipes.css"

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
    setNewStepPriority("Media");
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
    <div className='allListRecipeContainer'>

    <div className='containerCountRecipes'>
        <h3 className='titleCountRecipes'>Count Recipes Check</h3>
        <h4 className='countRecipesCheck'>{completedCount}</h4>
    </div>


        <ul className='UlListRecipes'>    
        <h1 className='titleNewRecipes'>New Recipes</h1>
        {recipes.map ((recipe,index) => (
        <li className='LiListRecipes' key={index}>
        <strong className='infoListRecipe'>Recipe Name:</strong> <br /> {recipe.nameRecipe} <br />

        <strong className='infoListRecipe'>Recipe Ingredients:</strong> <br /> {recipe.ingredientsRecipe} <br />

        <strong className='infoListRecipe'>Recipe Description:</strong> <br /> {recipe.descriptionRecipe} <br />

     
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
            
            {/*  step text input */}
            <label className='LbFormStep' htmlFor={`step-text-${recipe.id}`}>Step Cooking Recipe  </label>
            <input 
                type="text" 
                className='InpFormStep'
                id={`step-text-${recipe.id}`}
                value={newStepText}
                onChange={(e) => setNewStepText(e.target.value)}
                placeholder="Ej: Lavar y cortar las verduras"
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

            {/* btn save step */}
            <button className='btnSaveStep'
                onClick={() => handleAddStep(recipe.id)}
            >
                Save Step
            </button>
            <hr className='hrCardAddStep'/>
        </div>
    )}
    {/* show getting steps*/}
    {recipe.Steps && recipe.Steps.length > 0 && (
    <>
        <h4 className='titleStepsCookingRecipe'>Steps Cooking Recipe:</h4>
        <ul className='UlListSteps'>
            {recipe.Steps.map((step, stepIndex) => (
                <li className='LiStepsCookingRecipe' key={stepIndex}>
                     {step.text} [{step.priority}]
                    
                </li>
            ))}
        </ul>
    </>
    )}
</div>


        
    {/*Card settings Recipe*/}
    <div>
        <label className='LbRecipeCheck' htmlFor="">Recipe Check</label>
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
        <input className='InpFormStep' onChange={(e)=> setEditName(e.target.value)} value={editName} type="text" placeholder='name' />
        <input className='InpFormStep' onChange={(e)=> setEditIngredients(e.target.value)} value={editIngredients} type="text" placeholder='ingredients'/>
        <input className='InpFormStep' onChange={(e)=> setEditDescription(e.target.value)} value={editDescription} type="text" placeholder='description'/>
       
        <button className='btnSaveEdit' onClick={()=>editFunctRecipe(recipe.id)}>Complete Edit</button>
        </>
        }
    </div>
        </li> 
    ))}
    </ul>

   
    </div>
  )
}

export default ListCookingRecipes