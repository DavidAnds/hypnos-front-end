import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import cancel from './icon-cancel.png';
import hamburger from './icon-hamburger.png';

export default function Sidebar(props) {
    const [toggle, setToggle] = useState(false);
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/backOffice');
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
    };
    const toggleFunc = () => {
        setToggle(!toggle);
    };

    return (
        <div>
            <div className='fixed top-0 left-0 right-0 h-14 flex justify-end z-50 xl:hidden'>
                <button onClick={toggleFunc} className='mr-2 sm:mr-10 sm:mt-8'>
                    <img
                        src={toggle ? cancel : hamburger}
                        className={toggle ? 'w-8' : ''}
                        alt='icon for the menu'
                    />
                </button>
            </div>
            <div
                className={
                    toggle
                        ? 'fixed top-0 bottom-0 left-0 w-full bg-gold flex flex-col justify-center px-6 sm:w-60 transition'
                        : 'fixed top-0 bottom-0 left-0 w-full bg-gold flex flex-col justify-center px-6 transform -translate-x-full sm:w-60 xl:translate-x-0 transition'
                }
            >
                <nav className='mt-60'>
                    <p className='t-josefin text-xl'>Gérer les données:</p>
                    {props.links.map((link) => {
                        const urlLink = link.split(' ').join('');
                        return (
                            <Link
                            onClick={toggleFunc}
                                to={`./${urlLink}`}
                                key={uuidv4()}
                                className='block mt-3 text-xl t-josefin uppercase ml-2 hover:text-white'
                            >
                                {link}
                            </Link>
                        );
                    })}
                </nav>

                <button
                    className='block px-4 py-2 t-josefin uppercase mb-4 mt-auto t-josefin bg-black text-white mx-auto hover:bg-white hover:text-black hover:border hover:border-2 hover:border-black'
                    onClick={handleLogout}
                >
                    Déconnexion
                </button>
            </div>
        </div>
    );
}
