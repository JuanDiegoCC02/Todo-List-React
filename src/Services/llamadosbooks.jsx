async function getBooks() {
    try {
        const response = await fetch('http://localhost:3000/books', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }   
        });

        if (!response.ok) {
            throw new Error('Error fetching books');
        }

        const books = await response.json();
        return books;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}
export {getBooks}

//////////LLAMADO POST//////////

async function postBooks(namebook,autorbook,statusbook,borrowBook) {
    try {
     
        const userData = { 
            namebook,
            autorbook,
            statusbook,
            borrowBook
        
        };



        const response = await fetch("http://localhost:3000/books", {
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

export{postBooks}

//////////////LLAMADO UPDATE/////////////


async function updateBooks(book, id) 
{
    try {

        const response = await fetch(`http://localhost:3000/books/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        return await response.json();
    } catch (error) {
        console.error('Error update book:', error);
        throw error;
    }
}

export{updateBooks}



//////////////LLAMADO DELETE/////////////


async function deleteBooks(id) {
    try {
        const response = await fetch(`http://localhost:3000/books/${id}`, {
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

export { deleteBooks };


const llamadoBooks = {
    getBooks,
    postBooks,
    updateBooks,
    deleteBooks
};

export default llamadoBooks;