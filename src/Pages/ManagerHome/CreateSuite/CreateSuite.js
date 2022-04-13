import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
const createUrl = '/api/suite/createOne';

export default function CreateSuite() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [bookingLink, setBookingLink] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('bookingLink', bookingLink);

        axios
            .post(createUrl, formData, {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            })
            .then(() => {
                navigate('../suites');
            });
    };

    return (
        <div>
            <h2 className='text-5xl ml-20'>Creer une nouvelle suite</h2>
            <form className='px-16 mt-8' onSubmit={handleSubmit}>
                <div className='mt-2 '>
                    <label
                        htmlFor='Title'
                        className='text-2xl t-crimson t-bold'
                    >
                        Titre
                    </label>
                    <input
                        type='texte'
                        id='Title'
                        required
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                </div>
                <div className='mt-2 '>
                    <label
                        htmlFor='bookingLink'
                        className='text-2xl t-crimson t-bold'
                    >
                        Lien Booking
                    </label>
                    <input
                        type='texte'
                        id='bookingLink'
                        required
                        onChange={(e) => {
                            setBookingLink(e.target.value);
                        }}
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                </div>
                <div className='mt-2 '>
                    <label
                        htmlFor='price'
                        className='text-2xl t-crimson t-bold'
                    >
                        Prix
                    </label>
                    <input
                        type='number'
                        id='price'
                        onChange={(e) => {
                            setPrice(e.target.value);
                        }}
                        required
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                </div>
                <div className='mt-2 '>
                    <label htmlFor='file' className='text-2xl t-crimson t-bold'>
                        Ajouter une image pour la suite
                    </label>
                    <input
                        type='file'
                        id='file'
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                        }}
                        required
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                </div>
                <div className='mt-2 '>
                    <label
                        htmlFor='description'
                        className='text-2xl t-crimson t-bold'
                    >
                        description
                    </label>
                    <textarea
                        id='description'
                        required
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                </div>
                <div className='flex justify-end'>
                    <button className='block px-10 py-3 text-lg mr-8 mb-10 t-josefin uppercase bg-gold text-white mt-8 hover:bg-white hover:text-black hover:border hover:border-black'>
                        Créer la suite
                    </button>
                </div>
            </form>
        </div>
    );
}
