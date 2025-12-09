import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import SignIn from '../pages/SignIn';
import FormRecipesPage from '../pages/FormRecipesPage';
import HomeRecipes from '../pages/HomeRecipes';
import ListRecipesPage from '../pages/ListRecipesPage';





function Routing() {


  return (
    <div>
      <Router>
        <Routes>
            <Route path='/signIn' element={<SignIn/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<HomeRecipes/>}/>
            <Route path="/formRecipesPage" element={<FormRecipesPage/>}/>
            <Route path="/listRecipesPage" element={<ListRecipesPage/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default Routing