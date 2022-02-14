import React, { createContext, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Products from './components/Products';

import './style.css'
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './components/Login';

export const userCtx = createContext({
  username: "",
  role: "",
})

const user ={
  username: "",
  role: "",

}
function App() {


return (<>
        <userCtx.Provider value={user}>


<Routes>
  <Route path="/" element={<Home/>}></Route>
  <Route path="/cart" element={<Cart/>}></Route>

  
</Routes>  

        <section>
   Copyright © April 2021 | Omar Mahrous
    </section>

</userCtx.Provider>
</>
   
  )
}

export default App;
