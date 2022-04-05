import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { AuthContext } from '../../Context/AuthContext';
import { Outlet } from 'react-router-dom';
const baseUrl = 'http://localhost:8080/api/back/user/refresh';


export default function ManagerHome() {
    const { login } = useContext(AuthContext);

    useEffect(() => {
        if (localStorage.token) {
            axios
                .get(baseUrl, {
                    headers: { authorization: `Bearer ${localStorage.token}` },
                })
                .then((res) => {
                    login(res.data);
                    localStorage.setItem('token', res.data.token);
                });
        }

    }, []);

    return (
        <div className='h-screen relative'>
            <Sidebar links={[, 'suites', 'mon Profil', 'mot De Passe']} />
            <Navbar />
            <div className='pl-80 pt-24 w-full h-full'>
                <Outlet />
            </div>
        </div>
    );
}
