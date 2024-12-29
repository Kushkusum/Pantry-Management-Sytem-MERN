import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Inventory from '../pages/Inventory';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';


function Routing() {
  return (
    <Routes>
        <Route path='/' element={<Inventory/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
    </Routes>
  )
}

export default Routing