import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const baseUrl = '/back/user/login';

export default function BackLogin() {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(baseUrl, {
                email: email,
                password: password,
            })
            .then((res) => {
                login(res.data);
                localStorage.setItem('token', res.data.token);
                console.log(res.data);
                if (res.data.role === 'admin') {
                    navigate('./adminHome/hotels');
                } else {
                    navigate('./managerHome/suites');
                }
            });
    };

    return (
        <div className='border-solid border-2 border-black w-5/6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-xl'>
            <div className='bg-black py-2 px-4 md:py-4 '>
                <h2 className='text-white t-josefin md:text-xl  '>
                    Connexion
                </h2>
            </div>
            <form className='form-auth t-josefin px-4 sm:px-10' onSubmit={handleSubmit}>
                <div className='mt-4 sm:mt-8'>
                    <label htmlFor='email' className='md:text-lg'>
                        Email
                    </label>
                    <input
                        type='email'
                        id='email'
                        required
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className='border-solid border-2 border-gray-600 block w-full py-2 px-2 mt-1'
                    />
                </div>
                <div className='mt-4 sm:mt-8'>
                    <label htmlFor='password' className='md:text-lg'>
                        Mot de passe
                    </label>
                    <input
                        type='password'
                        id='password'
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className='border-solid border-2 border-gray-600 block w-full py-2 px-2 mt-1'
                    />
                </div>
                <button className='block px-4 py-4 t-josefin text-sm uppercase bg-black text-white mt-6 mb-4 ml-auto mr-4 hover:bg-white hover:text-black hover:border hover:border-black'>
                    Se connecter
                </button>
                <div>{error}</div>
            </form>
        </div>
    );
}
