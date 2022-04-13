import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const createUrl = '/api/back/user/SignUp';
const getHotelUrl = '/api/hotel/getAll';

export default function CreateManager() {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [hotels, setHotels] = useState();

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hotelId, setHotelId] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(
                createUrl,
                {
                    lastName,
                    firstName,
                    email,
                    password,
                    hotelId,
                },
                {
                    headers: {
                        authorization: `Bearer ${currentUser.token}`,
                    },
                }
            )
            .then((res) => {
                navigate('../managers');
            });
    };

    useEffect(() => {
        axios.get(getHotelUrl).then((res) => {
            setHotels(res.data);
        });
    }, []);

    return (
        <div>
            <h2 className='text-5xl ml-20'>Nouveau manager</h2>
            <form className='px-16 mt-8' onSubmit={handleSubmit}>
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
                        Prènom
                    </label>
                    <input
                        type='texte'
                        id='firstName'
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
                        required
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                </div>
                <div className='mt-2 '>
                    <label
                        htmlFor='password'
                        className='text-2xl t-crimson t-bold'
                    >
                        Mot de passe
                    </label>
                    <input
                        type='password'
                        id='password'
                        required
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                </div>
                <div className='mt-2 '>
                    <p className='text-2xl t-crimson t-bold mb-2'>
                        Séléctionner un hôtel
                    </p>
                    <select
                        name='hotelId'
                        id='hotelId'
                        required
                        onChange={(e) => {
                            setHotelId(e.target.value);
                        }}
                    >
                        {!hotels
                            ? ''
                            : hotels.map((hotel) => (
                                  <option value={hotel.id} key={uuidv4()}>
                                      {' '}
                                      {hotel.name}
                                  </option>
                              ))}
                    </select>
                </div>
                <button className='block px-20 py-3 text-lg t-josefin uppercase bg-gold text-white ml-auto mr-20 mt-8 hover:bg-white hover:text-black hover:border hover:border-black'>
                    Créer un nouveau manager
                </button>
            </form>
        </div>
    );
}
