import { AnyCnameRecord } from 'dns';
import React, { createContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';
import Products from '../components/Products';



export default function Admin(props:any) {

    return (
<div className="wrapper">
            <header>
                <h2> Home  </h2>

                <Login ></Login>
            </header>
            <main>
                <Products />
            </main>
            </div>

    );
}
