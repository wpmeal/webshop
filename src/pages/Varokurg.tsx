import React from 'react';
import { Link } from 'react-router-dom';
import VarukorgItems from '../components/VarukorgItems';


export default function Varukorg() {
    return (
           <div className="wrapper shopping-cart">

              <header>
             <Link to="/">Home</Link>

            <h2> Varukorg Items  </h2>
        </header>
        <main id="shopping-cart">
            
      <VarukorgItems />
    </main>
    </div>
        
    );
}
