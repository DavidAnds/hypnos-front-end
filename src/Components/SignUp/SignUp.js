import React, { useState } from 'react';
import axios from 'axios';
const signupUrl = '/api/user/signup';

export default function SignUp(props) {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if(confirmedPassword !== password){
            return setError('Les mots de passes ne correspondent pas.')
        }

        axios
            .post(signupUrl, {
                email,
                firstName,
                lastName,
                password
            })
            .then(() => {
            });
    };

    return (
        <form
            className='form-auth t-crimson px-4 sm:px-10'
            onSubmit={handleSubmit}
        >
            <div className='flex mt-2 sm:mt-4'>
                <div className='w-1/2'>
                    <label htmlFor='lastName' className='md:text-lg'>
                        Nom
                    </label>
                    <input
                        type='text'
                        id='lastName'
                        required
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                        className='border-solid border border-gray-600 block w-full py-2 px-2 mt-1'
                    />
                </div>
                <div className='ml-2 w-1/2'>
                    <label htmlFor='firstName' className='md:text-lg'>
                        Prénom
                    </label>
                    <input
                        type='text'
                        id='firstName'
                        required
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                        className='border-solid border border-gray-600 block w-full py-2 px-2 mt-1'
                    />
                </div>
            </div>

            <div className='mt-2 sm:mt-4'>
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
            <div className='mt-2 sm:mt-4'>
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
            <div className='mt-2 sm:mt-4'>
                <label htmlFor='confirmedPassword' className='md:text-lg'>
                    Confirmer le mot de passe
                </label>
                <input
                    type='password'
                    id='confirmedPassword'
                    required
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                    className='border-solid border border-gray-600 block w-full py-2 px-2 mt-1'
                />
            </div>
            <button className='block px-8 py-2 t-josefin text-sm uppercase bg-black text-white mx-auto mt-4 hover:bg-white hover:text-black hover:border hover:border-black sm:mt-8'>
                S'inscrire
            </button>
            <div>{error}</div>
        </form>
    );
}
