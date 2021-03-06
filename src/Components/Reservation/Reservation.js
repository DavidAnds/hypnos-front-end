import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import { isWithinInterval } from 'date-fns';
const createReservationUrl = '/api/reservation/createOne';
const getReservationUrl = '/api/reservation/getAllFromSuite/';

export default function Reservation(props) {
    const { currentUser } = useContext(AuthContext);
    const [date, setDate] = useState(new Date());
    const [disabledRanges, setDisabledRanges] = useState([]);
    const [reservations, setReservations] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(getReservationUrl + props.suiteId).then((res) => {
            setReservations(res.data);
            console.log(res.data);
        });
    }, [])

    useEffect(() => {
        if (reservations) {
            let allRanges = [];
            reservations.map((reservation) => {
                const range = [
                    new Date(reservation.startDate),
                    new Date(reservation.endDate),
                ];
                allRanges.push(range);
            });
            setDisabledRanges(allRanges);
        }
    }, [reservations]);
    

    function isWithinRange(date, range) {
        return isWithinInterval(date, { start: range[0], end: range[1] });
    }

    function isWithinRanges(date, ranges) {
        return ranges.some((range) => isWithinRange(date, range));
    }

    function tileDisabled({ date, view }) {
        // Add class to tiles in month view only
        if (view === 'month') {
            // Check if a date React-Calendar wants to check is within any of the ranges
            return isWithinRanges(date, disabledRanges);
        }
    }

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
                    suiteId: props.suiteId,
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
                    S??l??ctionner la date de votre s??jour.
                </p>
                <Calendar
                    value={date}
                    onChange={setDate}
                    className='mx-auto'
                    selectRange={true}
                    minDate={new Date()}
                    tileDisabled={tileDisabled}
                />
            </div>
            <button className='block px-4 py-2 t-josefin text-sm uppercase bg-gray-900 text-white mx-auto mt-4 hover:bg-white hover:text-black hover:border hover:border-black sm:mt-8'>
                R??server
            </button>
        </form>
    );
}
