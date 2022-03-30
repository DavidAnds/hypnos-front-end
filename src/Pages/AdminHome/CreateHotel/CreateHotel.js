import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const createUrl = 'http://localhost:8080/api/hotel/createOne';

export default function CreateHotel() {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const [name, setName] = useState();
    const [adress, setAdress] = useState();
    const [city, setCity] = useState();
    const [description, setDescription] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(
                createUrl,
                {
                    name,
                    adress,
                    city,
                    description,
                },
                {
                    headers: {
                        authorization: `Bearer ${currentUser.token}`,
                    },
                }
            )
            .then((res) => {
                navigate('../hotels');
            });
    };

    return (
        <div>
            <h2 className='text-5xl ml-20'>Nouvel hôtel</h2>
            <form className='px-16 mt-8' onSubmit={handleSubmit}>
                <div className='mt-2 '>
                    <label htmlFor='name' className='text-2xl t-crimson t-bold'>
                        Nom
                    </label>
                    <input
                        type='texte'
                        id='name'
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                </div>
                <div className='mt-2 '>
                    <label htmlFor='city' className='text-2xl t-crimson t-bold'>
                        City
                    </label>
                    <input
                        type='texte'
                        id='city'
                        onChange={(e) => {
                            setCity(e.target.value);
                        }}
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                </div>
                <div className='mt-2 '>
                    <label
                        htmlFor='adress'
                        className='text-2xl t-crimson t-bold'
                    >
                        Adress
                    </label>
                    <input
                        type='texte'
                        id='adress'
                        onChange={(e) => {
                            setAdress(e.target.value);
                        }}
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                </div>
                <div className='mt-2 '>
                    <label
                        htmlFor='description'
                        className='text-2xl t-crimson t-bold'
                    >
                        Description
                    </label>
                    <textarea
                        id='description'
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                </div>
                <button className='block px-20 py-3 text-lg t-josefin uppercase bg-gold text-white ml-auto mr-20 mt-8 hover:bg-white hover:text-black hover:border hover:border-black'>
                    Créer un nouvel hotel
                </button>
            </form>
        </div>
    );
}
