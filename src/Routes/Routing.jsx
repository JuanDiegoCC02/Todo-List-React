import React from 'react';
import LogIn from '../pages/LogIn';
import SignIn from '../pages/SignIn';
import TodoList from '../pages/TodoList';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function Routing() {


  return (
    <div>
      <Router>
        <Routes>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/todolist" element={<TodoList/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default Routing