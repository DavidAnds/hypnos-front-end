import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

export default function Sidebar(props) {
    const {logout} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/backOffice')
        localStorage.removeItem('token')
        localStorage.removeItem('currentUser')
    }
    
    return (
        <div className='fixed top-0 bottom-0 left-0 w-80 bg-gold flex flex-col justify-center px-6'>
            <nav className='mt-60'>
                <p className='t-josefin text-xl'>Gérer les données:</p>
                {props.links.map((link) => {
                    const urlLink = link.split(' ').join('')
                    return <Link to={`./${urlLink}`} key={uuidv4()} className='block mt-3 text-xl t-josefin uppercase ml-2 hover:text-white' >{link}</Link>
                })}
            </nav>

            <button className='block px-4 py-2 t-josefin uppercase mb-4 mt-auto t-josefin bg-black text-white mx-auto hover:bg-white hover:text-black hover:border hover:border-2 hover:border-black' onClick={handleLogout}>
                Déconnexion
            </button>
        </div>
    );
}
