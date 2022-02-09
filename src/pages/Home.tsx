import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';
import Products from '../components/Products';

export default function Home() {

    return (
<div className="wrapper">
            <header>
                <Link to="cart"><i id="basket" className="fa badge" data-value="0">&#xf07a;</i></Link>
                <Login />

            </header>
            <main>
                <Products />
            </main>
            </div>
    );
}
