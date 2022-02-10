import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Products from './components/Products';

import './style.css'
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './components/Login';

function App() {


return (<>


<Routes>
  <Route path="/" element={<Home/>}></Route>
  <Route path="/cart" element={<Cart/>}></Route>

  
</Routes>  

        <section>
   Copyright © April 2021 | Omar Mahrous
    </section>


</>
   
  )
}

export default App;
