import React, { useContext, useState } from 'react';
import logo from './hypnos-logo-1.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../Context/AuthContext';

export default function Navbar() {
    const { currentUser } = useContext(AuthContext);


    return (
        <nav className='fixed top-0 inset-x-0 py-2 px-2 flex justify-start items center sm:px-8 sm:py-4 xl:px-16 xl:justify-center'>
            <Link to='/'>
                <div className='w-28 border border-black border-4 px-1 py-1 bg-white sm:w-32 sm:px-2 sm:py-2 xl:w-40 xl:px-4 '>
                    <img src={logo} alt='' />
                </div>
            </Link>

            <div className='ml-auto flex items-center hidden xl:block'>
                {currentUser ? (
                    <p className='t-crimson sm:text-xl'>Hypnos {currentUser.role}</p>
                ) : (
                    <div>
                        <button
                            className='mr-4 t-crimson underline underline-offset-8 sm:text-xl'
                        >
                            Connexion
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
