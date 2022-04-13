import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
const baseUrl = '/api/user/login';

export default function Login() {
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
            navigate('/')
        });

    };

    return (
        <form
            className='form-auth t-crimson px-4 sm:px-10'
            onSubmit={handleSubmit}
        >
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
                    className='border-solid border border-gray-600 block w-full py-2 px-2 mt-1'
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
                    className='border-solid border border-gray-600 block w-full py-2 px-2 mt-1'
                />
            </div>
            <button className='block px-4 py-2 t-josefin text-sm uppercase bg-black text-white mx-auto mt-4 hover:bg-white hover:text-black hover:border hover:border-black sm:mt-8'>
                Se connecter
            </button>
            <div>{error}</div>
        </form>
    );
}
