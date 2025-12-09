import React from 'react';
import Register from '../pages/Register';
import SignIn from '../pages/SignIn';
import RecipesTodoList from '../pages/RecipesTodoList';
import HomeRecipes from '../pages/HomeRecipes';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function Routing() {


  return (
    <div>
      <Router>
        <Routes>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<HomeRecipes/>}/>
            <Route path="/recipesTodoList" element={<RecipesTodoList/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default Routing