import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import logo from './hypnos_logo.png';
import cancel from './icon-cancel.png';
import hamburger from './icon-hamburger.png';

export default function Nav() {
    const [toggleNav, setToggleNav] = useState(false);

    const { currentUser, logout } = useContext(AuthContext);
    const navigate = useNavigate()

    const toggleNavFunc = () => {
        setToggleNav(!toggleNav);
    };

    const handleLogout =  () => {
        logout()
        localStorage.removeItem('token')
        localStorage.removeItem('currentUser')
        navigate('/connexion')

    }

    return (
        <div className='border-b fixed top-0 right-0 left-0 z-50 bg-white py-2 px-4 flex justify-between lg:px-10 xl:px-40'>
            <Link to='/' className='w-28'>
                <img src={logo} alt="Logo d'hypnos" />
            </Link>

            <div className='md:hidden'>
                <button onClick={toggleNavFunc}>
                    <img
                        src={toggleNav ? cancel : hamburger}
                        className={toggleNav ? 'w-8' : ''}
                        alt='icon for the menu'
                    />
                </button>
            </div>

            <nav
                className={
                    toggleNav
                        ? 'fixed top-12 right-0 left-0 transition transform translate-y-0 md:hidden'
                        : 'fixed top-12 transform -translate-y-52 right-0 left-0 transition md:hidden'
                }
            >
                <ul className='flex flex-col bg-white'>
                    <Link
                        to='/'
                        className='block py-1 t-crimson text-center text-xl w-full border-b transition hover:bg-gray-200'
                    >
                        Accueil
                    </Link>
                    <Link
                            to='/reservation'
                            className='block py-1 t-crimson text-center text-xl w-full border-b transition hover:bg-gray-200'
                        >
                            réservation
                        </Link>
                    {!currentUser ? (
                        <Link
                        to='/connexion'
                        className='block py-1 t-crimson text-center text-xl w-full border-b transition hover:bg-gray-200'
                    >
                        Connexion
                    </Link>
                    ) : (
                        <button onClick={handleLogout} className='block py-1 t-crimson text-center text-xl w-full border-b transition hover:bg-gray-200'>Déconnexion</button>
                    )}

                </ul>
            </nav>

            <nav className='md:block hidden'>
                <ul className='flex bg-white'>
                    <Link
                        to='/'
                        className='block py-1 mx-4 t-crimson text-center text-xl transition hover:underline hover:underline-offset-8 '
                    >
                        Accueil
                    </Link>
                    <Link
                        to='/reservation'
                        className='block py-1 mx-4 t-crimson text-center text-xl transition hover:underline hover:underline-offset-8'
                    >
                        réservation
                    </Link>
                    {!currentUser ? (
                        <Link
                        to='/connexion'
                        className='block py-1 mx-4 t-crimson text-center text-xl transition hover:underline hover:underline-offset-8'
                    >
                        Connexion
                    </Link>
                    ) : (
                        <button onClick={handleLogout} className='block py-1 mx-4 t-crimson text-center text-xl transition hover:underline hover:underline-offset-8'>Déconnexion</button>
                    )}
                </ul>
            </nav>
        </div>
    );
}
