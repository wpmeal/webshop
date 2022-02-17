import React from 'react';
import { Link } from 'react-router-dom';
import CartItems from '../components/CartItems';
import Login from '../components/Login';


export default function Cart() {
  return (
    <div className="wrapper shopping-cart">

      <header>
        <div>
          <h2> Varukorg Items  </h2>
          <Link to="/">Home</Link>
        </div>
        <div>&nbsp;</div>
        <div>
          <Login ></Login>
        </div>


      </header>
      <main id="shopping-cart">

        <CartItems />
      </main>
    </div>

  );
}
