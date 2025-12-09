import React from 'react';
import Register from '../pages/Register';
import SignIn from '../pages/SignIn';
import TodoList from '../pages/TodoList';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function Routing() {


  return (
    <div>
      <Router>
        <Routes>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/todolist" element={<TodoList/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default Routing