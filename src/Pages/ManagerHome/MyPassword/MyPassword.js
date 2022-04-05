import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const modifyUrl = 'http://localhost:8080/api/back/user/updatePassword/';


export default function MyPassword() {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if(password !== confirmedPassword) {
            setError('Les mots de passe doivent être identiques !')

            return
        }

        axios
            .put(
                modifyUrl + currentUser.id,
                {
                   password
                },
                {
                    headers: {
                        authorization: `Bearer ${currentUser.token}`,
                    },
                }
            )
            .then((res) => {
                navigate('../suites');
            });
    };

    return (
        <div>
            <h2 className='text-5xl ml-20'>Changer votre mot de passe</h2>
            <form className='px-16 mt-8' onSubmit={handleSubmit}>
                <div className='mt-2 '>
                    <label
                        htmlFor='password'
                        className='text-2xl t-crimson t-bold'
                    >
                        Nouveau Mot de passe
                    </label>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        required
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                </div>
                <div className='mt-2 '>
                    <label
                        htmlFor='confirmedPassword'
                        className='text-2xl t-crimson t-bold'
                    >
                        Confirmer votre nouveau mot de passe
                    </label>
                    <input
                        type='password'
                        id='confirmedPassword'
                        value={confirmedPassword}
                        required
                        onChange={(e) => {
                            setConfirmedPassword(e.target.value);
                        }}
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                    <p className='t-josefin text-red-500 mt-2'>{error}</p>
                </div>
                <div className='flex justify-end'>
                    <button className='block px-10 py-3 text-lg mr-8 t-josefin uppercase bg-gold text-white mt-8 hover:bg-white hover:text-black hover:border hover:border-black'>
                        Modifier mot de passe
                    </button>
                </div>
            </form>
        </div>
    );
}
