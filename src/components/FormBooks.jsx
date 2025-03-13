    import React, { useEffect, useState } from 'react'
    import llamadoBooks, { updateBooks } from '../Services/llamadosbooks'
    
    import '../Styles/FormBooks.css'



    function FormBooks() {
        
        const [NameBook, SetNameBook]=useState()
        const [AutorBook, SetAutorBook]=useState()
        const [StatusBook, SetStatusBook]=useState()
        const [mostrar,setMostrar] = useState(false)
        const [books, SetBooks] = useState([])
        const [editNombre,setEditNombre] = useState("")
        const [editAutor,setEditAutor] = useState("")
        const [editStatus,setEditStatus] = useState("")
        const [recarga,setRecarga] = useState(false)
        const [bookCheck, setBookCheck] = useState("")
        const [count, setCount] = useState(0)


        const handleBookCheck = async(id, index) => {
            const updatedBooks = [...books]

            updatedBooks[index].borrowBook = !updatedBooks[index].borrowBook
            await updateBooks(
                {"borrowBook": updatedBooks[index].borrowBook}, id)
            SetBooks(updatedBooks);
            if (updatedBooks[index].borrowBook) {
                setCount(count + 1);
            } else {
                setCount(count - 1);
            }
        }

       

        

        function namebook(evento) {
            SetNameBook(evento.target.value)
        }

        function autorbook(evento) {
            SetAutorBook(evento.target.value)
        }

        function statusbook(evento) {
            SetStatusBook(evento.target.value)
        }

        function newname(evento){
            setEditNombre(evento.target.value)
        }
        function newauthor(evento){
            setEditAutor(evento.target.value)
        }
        function newestatus(evento){
            setEditStatus(evento.target.value)
        }

        function eliminar (id) {
            llamadoBooks.deleteBooks(id)
            setRecarga(!recarga);
        }   
// Funcion Editar
    function editar(id) {
        const libroEditar = {
            "namebook":editNombre,
            "autorbook":editAutor,
            "statusbook":editStatus
        }   
        llamadoBooks.updateBooks(libroEditar, id)
        setRecarga(!recarga);
    }

    useEffect(()=>{
        async function lista() {
            const datos = await llamadoBooks.getBooks ("books")
            SetBooks (datos)
    }
    lista()
    }, [recarga] )

        function post() {          
            llamadoBooks.postBooks( NameBook, AutorBook, StatusBook,false)
            setRecarga(!recarga)
        }

    return (

        <div className='ContainerAllForm'> 

        <h1 className='TituloP'>Form News Books</h1>
        
        <div className='FormContainer' >
            <h1>Info Books</h1>
        <div className='FormNameBook'>
            <label htmlFor="">Name of Book</label><br />
            <input value={NameBook} onChange={namebook} type="text" />
        </div>

        <div>
            <label htmlFor="">Author of Book</label><br />
            <input value={AutorBook} onChange={autorbook} type="text" />
        </div>

        <div>
            <label htmlFor="">Status of Book</label><br />
            <input value={StatusBook} onChange={statusbook} type="text" />
        </div>

        <input onClick={post} type="button" value="Post" />
        <div><br />
        </div>
        <h3>Count Books Check</h3>
        <h4>{count}</h4>

        <br /> <hr  className='Line'/>

    <ul className='ListaBooks'>    
        <h1>News Books</h1>
    {books.map ((libro,index) => (
        <li className='ContainerNewBook' key={index}>
        <strong>Book Name:</strong> <br /> {libro.namebook} <br />

        <strong>Book Author:</strong> <br /> {libro.autorbook} <br />

        <strong>Book Status:</strong> <br /> {libro.statusbook} <br />
        

<div>
        <label htmlFor="">Book Check</label>
        <input className='btnCheckbox'
         type="checkbox" 
         name="bookCheck" 
         id="bookCheck" 
         checked={libro.borrowBook}
         onChange={()=>handleBookCheck(libro.id,index)}

        />
       
        
        <button className='btnDelete' onClick={e=>eliminar(libro.id)}>Delete</button>
        <button className='btnEdit' onClick={()=>setMostrar(!mostrar)}>Edit</button>
        {mostrar &&
        <>
        <input onChange={newname} type="text" placeholder='Nombre' />
        <input onChange={newauthor} type="text" placeholder='Autor'/>
        <input  onChange={newestatus} type="text" placeholder='Estatus'/>
        <button onClick={()=>editar(libro.id)}>EDITAR</button>
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

    export default FormBooks