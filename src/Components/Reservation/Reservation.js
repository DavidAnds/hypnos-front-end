import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
const createReservationUrl = '/api/reservation/createOne';

export default function Reservation(props) {
    const { currentUser } = useContext(AuthContext);
    const [date, setDate] = useState(new Date());
    const [suiteId, setSuiteId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      setSuiteId(props.suiteId);
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const startDate = date[0].toLocaleString('en-US');
        const endDate = date[1].toLocaleString('en-US');

        axios
            .post(
                createReservationUrl,
                {
                    startDate,
                    endDate,
                    suiteId,
                },
                {
                    headers: {
                        authorization: `Bearer ${currentUser.token}`,
                    },
                }
            )
            .then(() => {
                navigate('/');
            });
    };

    return (
        <form onSubmit={handleSubmit} className='px-2 py-2'>
            <div className='mt-2 mx-2'>
                <p className='text-lg t-crimson t-bold mb-2'>
                    Séléctionner la date de votre séjour.
                </p>
                <Calendar
                    value={date}
                    onChange={setDate}
                    className='mx-auto'
                    selectRange={true}
                />
            </div>
            <button className='block px-4 py-2 t-josefin text-sm uppercase bg-gray-900 text-white mx-auto mt-4 hover:bg-white hover:text-black hover:border hover:border-black sm:mt-8'>
                Réserver
            </button>
        </form>
    );
}
