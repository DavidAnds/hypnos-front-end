import React, { useContext, useState } from 'react';
import logo from './hypnos-logo-1.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../Context/AuthContext';

export default function Navbar() {
    const { currentUser } = useContext(AuthContext);
    const showModal = useSelector(state => state)

    const dispatch = useDispatch();

    const toggleSignIn = () => {
        dispatch({
            type: 'TOGGLEIN',
        });
    };

    const toggleSignUp = () => {
        dispatch({
            type: 'TOGGLEUP',
        });
    };

    return (
        <nav className='absolute top-0 inset-x-0 py-8 px-14 flex justify-center items center'>
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
                            className={showModal.showLogin ?'mr-4 t-crimson text-xl underline underline-offset-8': 'mr-4 t-crimson text-xl'}
                            onClick={toggleSignIn}
                        >
                            Connexion
                        </button>
                        <button
                            className={showModal.showSignUp ?'mr-4 t-crimson text-xl underline underline-offset-8': 'mr-4 t-crimson text-xl'}
                            onClick={toggleSignUp}
                        >
                            Inscription
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}