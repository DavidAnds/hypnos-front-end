import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { AuthContext } from '../../Context/AuthContext';
import { Outlet } from 'react-router-dom';
const baseUrl = '/api/back/user/refresh';

export default function AdminHome() {
    const { currentUser, login } = useContext(AuthContext);

    useEffect(() => {
        if (localStorage.token) {
            axios
                .get(baseUrl, {
                    headers: { authorization: `Bearer ${localStorage.token}` },
                })
                .then((res) => {
                    login(res.data);
                    localStorage.setItem('token', res.data.token)
                });
        }
    }, []);

    return (
        <div className='h-screen relative'>
            <Sidebar links={['hotels', 'managers']} />
            <Navbar />
            <div className='pt-20 w-full h-full xl:pl-60'>
                <Outlet />
            </div>
        </div>
    );
}
