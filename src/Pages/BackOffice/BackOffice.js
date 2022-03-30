import Login from '../../Components/Login';
import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';

export default function BackOffice() {
    return (
        <div className='h-screen relative'>
            <Navbar />
            <Login />
        </div>
    );
}
