import React from 'react';
import { Link } from 'react-router-dom';
import CartItems from '../components/CartItems';
import Login from '../components/Login';


export default function Cart() {
    return (
           <div className="wrapper shopping-cart">

              <header>
             <Link to="/">Home</Link>

            <h2> Varukorg Items  </h2>
            <Login />

        </header>
        <main id="shopping-cart">
            
      <CartItems />
    </main>
    </div>
        
    );
}
