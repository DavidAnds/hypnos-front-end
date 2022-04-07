import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
const modifyUrl = 'http://localhost:8080/api/hotel/updateOne/';

export default function Hotel() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const location = useLocation()

    const [name, setName] = useState('');
    const [adress, setAdress] = useState('');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');
    const [imageDescription, setImageDescription] = useState();
    const [file, setFile] = useState(null);


    useEffect(() => {
        setName(location.state.name)
        setAdress(location.state.adress)
        setCity(location.state.city)
        setDescription(location.state.description)
        setImageDescription(location.state.imageDescription)
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', file);
        formData.append('adress', adress);
        formData.append('city', city);
        formData.append('description', description);
        formData.append('name', name);
        formData.append('imageDescription', imageDescription);


        axios
            .put(
                modifyUrl + id,
                formData,
                {
                    headers: {
                        authorization: `Bearer ${currentUser.token}`,
                    },
                }
            )
            .then((res) => {
                navigate('../hotels');
                console.log(res.data);
            });
    };

    return (
        <div>
            <h2 className='text-5xl ml-20'>Modifier un hotel</h2>
            <form className='px-16 mt-8' onSubmit={handleSubmit}>
                <div className='mt-2 '>
                    <label htmlFor='name' className='text-2xl t-crimson t-bold'>
                        Nom
                    </label>
                    <input
                        type='texte'
                        id='name'
                        value={name}
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
                        value={city}
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
                        value={adress}
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
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
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
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                </div>
                <div className='mt-2 '>
                    <label
                        htmlFor='description'
                        className='text-2xl t-crimson t-bold'
                    >
                        Description de l'image
                    </label>
                    <textarea
                        id='description'
                        value={imageDescription}
                        onChange={(e) => {
                            setImageDescription(e.target.value);
                        }}
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                </div>
                <button className='block px-20 py-3 text-lg t-josefin uppercase bg-gold text-white ml-auto mr-20 mt-8 mb-8 hover:bg-white hover:text-black hover:border hover:border-black'>
                    Modifier
                </button>
            </form>
        </div>
    );
}
