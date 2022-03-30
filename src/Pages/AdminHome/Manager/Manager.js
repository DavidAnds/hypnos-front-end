import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
const modifyUrl = 'http://localhost:8080/api/back/user/updateInfo/';
const getHotelUrl = 'http://localhost:8080/api/hotel/getAll';

export default function Manager() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const location = useLocation();

    const [hotels, setHotels] = useState();
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [hotelId, setHotelId] = useState('');

    useEffect(() => {
        setLastName(location.state.lastName);
        setFirstName(location.state.firstName);
        setEmail(location.state.email);
        setHotelId(location.state.hotelId);

        axios.get(getHotelUrl).then((res) => {
            setHotels(res.data);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .put(
                modifyUrl + id,
                {
                    lastName,
                    firstName,
                    email,
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

    return (
        <div>
            <h2 className='text-5xl ml-20'>Modifer manager</h2>
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
                        Prènom
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
                <div className='mt-2 '>
                    <p className='text-2xl t-crimson t-bold mb-2'>
                        Séléctionner un hôtel
                    </p>
                    <select
                        name='hotelId'
                        id='hotelId'
                        value={hotelId}
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
                    Modifier les informations du manager
                </button>
            </form>
        </div>
    );
}