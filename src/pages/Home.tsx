import React from 'react';
import { Link } from 'react-router-dom';
import Products from '../components/Products';

export default function Home() {
    return (
<div className="wrapper">
            <header>
                <Link to="varukorg"><i id="basket" className="fa badge">&#xf07a;</i></Link>
            </header>
            <main>
                <Products />
            </main>
            </div>
    );
}
