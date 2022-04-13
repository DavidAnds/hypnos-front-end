import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Calendar from 'react-calendar';
const getHotelUrl = '/api/hotel/getAll';
const getSuitesUrl = '/api/suite/getAll/';

export default function Reservation() {
    const [date, setDate] = useState(new Date());
    const [hotelId, setHotelId] = useState([]);

    return (
        <form className='px-2 py-2'>
            <div className='mt-2 mx-2'>
                <p className='text-lg t-crimson t-bold mb-2'>
                    Séléctionner la date de votre séjour.
                </p>
                <Calendar value={date} onChange={setDate} className="mx-auto" />
            </div>
            <button className='block px-4 py-2 t-josefin text-sm uppercase bg-gray-900 text-white mx-auto mt-4 hover:bg-white hover:text-black hover:border hover:border-black sm:mt-8'>
                Réserver
            </button>
        </form>
    );
}
