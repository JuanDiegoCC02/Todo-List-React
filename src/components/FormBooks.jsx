import React, { useEffect, useState } from 'react'
import llamadoBooks from '../Services/llamadosbooks'



function FormBooks() {
    
    const [NameBook, SetNameBook]=useState()
    const [AutorBook, SetAutorBook]=useState()
    const [StatusBook, SetStatusBook]=useState()
    const [mostrar,setMostrar] = useState(false)
    const [books, SetBooks] = useState([])
    const [editNombre,setEditNombre] = useState("")
    

    function namebook(evento) {
        SetNameBook(evento.target.value)
    }

    function autorbook(evento) {
        SetAutorBook(evento.target.value)
    }

    function statusbook(evento) {
        SetStatusBook(evento.target.value)
    }

    function eliminar (id) {
        llamadoBooks.deleteBooks(id)
        
    }   

function editar(id) {
    const book = {

    }
    
    llamadoBooks.updateBooks(newName, id)
}

useEffect(()=>{
    async function lista() {
        const datos = await llamadoBooks.getBooks ("books")
        SetBooks (datos)
    
}
lista()
}, [] )

    function post() {  
    
        
        llamadoBooks.postBooks( NameBook, AutorBook, StatusBook)
    }

  return (




    <div>

    <h1>Form News Books</h1>
    
    <div>
        <label htmlFor="">Name of Book</label><br />
        <input value={NameBook} onChange={namebook} type="text" />
    </div>

    <div>
        <label htmlFor="">Autor of Book</label><br />
        <input value={AutorBook} onChange={autorbook} type="text" />
    </div>

    <div>
        <label htmlFor="">Status of Book</label><br />
        <input value={StatusBook} onChange={statusbook} type="text" />
    </div>

    <input onClick={post} type="button" value="Post" />


    <div>

<ul>
  {books.map ((libro,index) => (
    <li key={index}>
      <strong>Book Name:</strong> {libro.namebook} <br />

      <strong>Book Author:</strong> {libro.autorbook} <br />

      <strong>Book Status:</strong> {libro.statusbook} <br />
      
      <button onClick={e=>eliminar(libro.id)}>Eliminar</button>
      <button onClick={()=>setMostrar(!mostrar)}>Editar</button>
      {mostrar &&
      <>
      <input type="text" placeholder='Nombre' />
      <input type="text" placeholder='Autor'/>
      <input type="text" placeholder='Estatus'/>
      </>
      }
      <input type="checkbox" name="" id="" />
      

     
    </li> 
  ))}
</ul>



</div>


    </div>



  )
}

export default FormBooks