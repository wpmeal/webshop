import React from 'react';
import { Link } from 'react-router-dom';
import CartItems from '../components/CartItems';


export default function Cart() {
    return (
           <div className="wrapper shopping-cart">

              <header>
             <Link to="/">Home</Link>

            <h2> Varukorg Items  </h2>
        </header>
        <main id="shopping-cart">
            
      <CartItems />
    </main>
    </div>
        
    );
}
