import { AnyCnameRecord } from 'dns';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loggedInState } from '../atoms/loggedInState';
import Login from '../components/Login';
import Products from '../components/Products';

export default function Home(props:any) {
    const [loggedInUser, setLoggedInUser]:any = useRecoilState(loggedInState);

    return (
<div className="wrapper">
            <header>
                <h2> Home  </h2>
                {loggedInUser.role == "admin" && <Link to="/admin">Admin Panel</Link>}
                <Login ></Login>

            </header>
            <main>
                <Products />
            </main>
            </div>
    );
}
