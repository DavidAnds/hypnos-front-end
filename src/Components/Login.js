import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';


const baseUrl = 'http://localhost:8080/api/back/user/login';

export default function Login() {

    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const showModal = useSelector((state) => state);
    const navigate = useNavigate();

    const {login} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(baseUrl, {
                email: email,
                password: password,
            })
            .then((res) => {
                login(res.data)
                localStorage.setItem('token', res.data.token)
                console.log(res.data);
                if(res.data.role === 'admin'){
                    navigate('./adminHome/hotels')
                } else {
                    navigate('./managerHome/suites')
                }
            });
    };
    return (
        <div
            className=
                 'border-solid border-2 border-black w-1/3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '
        >
            <div className='bg-black text-white text-xl t-josefin '>
                <h2 className='py-4 px-6 t-josefin'>Back office</h2>
            </div>
            <form className='form-auth t-josefin px-8' onSubmit={handleSubmit}>
                <div className='mt-10 '>
                    <label htmlFor='email' className='text-lg'>
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
                <div className='mt-10 '>
                    <label htmlFor='password' className='text-lg'>
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
                <button className='block px-4 py-2 t-josefin uppercase bg-black text-white mt-10 mb-4 ml-auto mr-4 hover:bg-white hover:text-black  '>
                    Se connecter
                </button>
                <div>{error}</div>
            </form>
        </div>
    );
}
