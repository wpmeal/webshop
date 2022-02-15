import { AnyCnameRecord } from 'dns';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userCtx } from '../App';
import Login from '../components/Login';
import Products from '../components/Products';

export default function Home(props:any) {

    return (
<div className="wrapper">
            <header>
                <h2> Home  </h2>

                <userCtx.Consumer>
                {value => ( value.role == "admin" && <Link to="/admin">Admin Panel</Link>)}
                </userCtx.Consumer>
                <Login ></Login>

            </header>
            <main>
                <Products />
            </main>
            </div>
    );
}
