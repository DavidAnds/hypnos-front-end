import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const modifyUrl = '/api/back/user/updateInfo/';
const getUrl = '/api/back/user/getOne/';

export default function MyProfil() {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
            axios
                .get(getUrl + currentUser.id, {
                    headers: { authorization: `Bearer ${currentUser.token}` },
                })
                .then((res) => {
                    setLastName(res.data.lastName)
                    setFirstName(res.data.firstName)
                    setEmail(res.data.email)
                })

      
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
        .put(
            modifyUrl + currentUser.id,
            {
                lastName,
                firstName,
                email,
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
            <h2 className='text-3xl t-josefin ml-10  xl:ml-20 xl:text-5xl'>Mon Profil</h2>
            <form className='px-4 mt-8 lg:px-10 xl:px-20' onSubmit={handleSubmit}>
                <div className='mt-2 '>
                    <label
                        htmlFor='lastName'
                        className='text-2xl t-crimson t-bold'
                    >
                        Nom
                    </label>
                    <input
                        type='texte'
                        id='lastName'
                        value={lastName}
                        required
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                </div>
                <div className='mt-2 '>
                    <label
                        htmlFor='firstName'
                        className='text-2xl t-crimson t-bold'
                    >
                        Pr??nom
                    </label>
                    <input
                        type='texte'
                        id='firstName'
                        value={firstName}
                        required
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                </div>
                <div className='mt-2 '>
                    <label
                        htmlFor='email'
                        className='text-2xl t-crimson t-bold'
                    >
                        Email
                    </label>
                    <input
                        type='email'
                        id='email'
                        value={email}
                        required
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                </div>
                <div className='flex justify-end'>
                <button className='block py-2 px-4 max-w-xs flex justify-center t-josefin uppercase t-josefin bg-gold text-white mx-auto mt-8 mb-8 hover:bg-white hover:text-black hover:border hover:border-black lg:py-4 lg:w-1/3 lg:ml-auto lg:mr-20'>                        Modifier profil
                    </button>
                </div>
            </form>
        </div>
    );
}
