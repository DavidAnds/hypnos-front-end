import React, { useContext, useState } from 'react';
import logo from './hypnos-logo-1.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../Context/AuthContext';

export default function Navbar() {
    const { currentUser } = useContext(AuthContext);


    return (
        <nav className='fixed top-0 inset-x-0 py-8 px-14 flex justify-center items center'>
            <Link to='/'>
                <div className='w-48 border border-black border-4 px-4 py-2 bg-white'>
                    <img src={logo} alt='' />
                </div>
            </Link>

            <div className='ml-auto flex items-center '>
                {currentUser ? (
                    <p className='t-crimson text-xl'>Hypnos {currentUser.role}</p>
                ) : (
                    <div>
                        <button
                            className='mr-4 t-crimson text-xl underline underline-offset-8'
                        >
                            Connexion
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
