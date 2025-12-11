async function getRecipes() {
    try {
        const response = await fetch('http://localhost:3000/recipes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }   
        });

        if (!response.ok) {
            throw new Error('Error fetching recipes');
        }

        const recipes = await response.json();
        return recipes;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}
export {getRecipes}

//////////LLAMADO POST//////////

async function postRecipes(nameRecipe,ingredientsRecipe, descriptionRecipe, completeRecipe) {
    try {
     
        const userData = { 
            nameRecipe,
            ingredientsRecipe,
            descriptionRecipe,
            completeRecipe
        
        };



        const response = await fetch("http://localhost:3000/recipes", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

     
        return await response.json();

        
    } catch (error) {
        console.error('Error posting user:', error);
        throw error;
    }
}

export{postRecipes}

//////////////LLAMADO UPDATE/////////////


async function updateRecipes(recipe, id) 
{
    try {

        const response = await fetch(`http://localhost:3000/recipes/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe)
        });
        return await response.json();
    } catch (error) {
        console.error('Error update book:', error);
        throw error;
    }
}

export{updateRecipes}



//////////////LLAMADO DELETE/////////////


async function deleteRecipes(id) {
    try {
        const response = await fetch(`http://localhost:3000/recipes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting user with id ${id}`);
        }

        return { message: `User with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
}

export { deleteRecipes };


