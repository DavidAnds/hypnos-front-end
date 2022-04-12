import BackLogin from '../../Components/BackLogin/BackLogin';
import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';

export default function BackOffice() {
    return (
        <div className='h-screen relative'>
            <Navbar />
            <BackLogin/>

        </div>
    );
}
