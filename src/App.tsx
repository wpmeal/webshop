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

export const userCtx = createContext({
  username: "",
  address: "",
  role: "",
})



  function App() {

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
},[]) 
 

return (<>
        <userCtx.Provider value={logeedInUser}>


<Routes>
  <Route path="/" element={<Home/>}></Route>
  <Route path="/cart" element={<Cart/>}></Route>
  <Route path="/admin" element={<Admin/>}></Route>


  
</Routes>  

        <section>
   Copyright © April 2021 | Omar Mahrous
    </section>

</userCtx.Provider>
</>
   
  )
}

export default App;
