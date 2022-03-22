import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
const baseUrl = 'http://localhost:8080/api/admin/signup';

export default function SignUp() {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');

    const showModal = useSelector((state) => state);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(baseUrl, {
                email: email,
                password: password,
            })
            .then((res) => {
                console.log(res.data);
            });
    };
    return (
        <div
            className={
                showModal.showSignUp
                    ? 'border-solid border-2 border-black w-1/3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '
                    : 'hidden'
            }
        >
            <div className='bg-black text-white text-xl t-josefin '>
                <h2 className='py-4 px-6 t-josefin'>Back office</h2>
            </div>
            <form className='form-auth t-josefin px-8' onSubmit={handleSubmit}>
                <div className='mt-6 flex justify-center'>
                    <div className=''>
                        <label htmlFor='firstName' className='text-lg'>
                            First Name
                        </label>
                        <input
                            type='firstName'
                            id='firstName'
                            required
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                            className='border-solid border-2 border-gray-600 block w-full py-2 px-2 mt-1'
                        />
                    </div>
                    <div className='ml-auto '>
                        <label htmlFor='lastName' className='text-lg'>
                            Last Name
                        </label>
                        <input
                            type='lastName'
                            id='lastName'
                            required
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                            className='border-solid border-2 border-gray-600 block w-full py-2 px-2 mt-1'
                        />
                    </div>
                </div>
                <div className='mt-4 '>
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
                <div className='mt-4 '>
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

                <div className='mt-4 '>
                    <label htmlFor='password' className='text-lg'>
                        Confirmer le mot de passe
                    </label>
                    <input
                        type='password'
                        id='password'
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className='border-solid border-2 border-gray-600 block w-full py-2 px-2 mt-1'
                    />
                </div>

                <button className='btn bg-black text-white mt-6 mb-4 ml-auto mr-4 hover:bg-white hover:text-black  '>
                    S'inscrire
                </button>

                <div>{error}</div>
            </form>
        </div>
    );
}
