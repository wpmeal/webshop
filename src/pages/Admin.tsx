import { AnyCnameRecord } from 'dns';
import React, { createContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';
import Products from '../components/Products';



export default function Admin(props: any) {

    return (
        <div className="wrapper">
            <header>
                <div>
                    <h2> Admin Panel  </h2>
                    <Link to="/">Home</Link>
                </div>
                <div>&nbsp;</div>
                <div>
                    <Login ></Login>
                </div>     
                       </header>
            <main>
                <Products page="admin" />
            </main>
        </div>

    );
}
