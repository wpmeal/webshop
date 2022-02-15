import React, { createContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Products from './components/Products';

import './style.css'
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './components/Login';
import UserClass from './core/UserClass';
import Admin from './pages/Admin';
import { RecoilRoot } from 'recoil';




  function App() {
/*
  const [user, setUser]:any = useState({}) 

  const userClass = new UserClass()

  const logeedInUser:any =  userClass.getLoggedInUser()

  console.log(logeedInUser)


 function getLoggedInUser(){
  const logeedInUser =  userClass.getLoggedInUser()
  
  console.log(logeedInUser)
  
  return  logeedInUser
  
  
  }

 useEffect( ()=>{
  let result =   getLoggedInUser()

  setUser(result)
},[]) */
 

return (
    <RecoilRoot>



<Routes>
  <Route path="/" element={<Home/>}></Route>
  <Route path="/cart" element={<Cart/>}></Route>
  <Route path="/admin" element={<Admin/>}></Route>


  
</Routes>  

        <section>
   Copyright © April 2021 | Omar Mahrous
    </section>


</RecoilRoot>

   
  )
}

export default App;
