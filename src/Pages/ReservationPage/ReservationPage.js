import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import Calendar from 'react-calendar';
import { isWithinInterval } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../Components/Footer/Footer';
import Nav from '../../Components/Nav/Nav';
const getHotelUrl = '/api/hotel/getAll';
const getSuitesUrl = '/api/suite/getAll/';
const getSuiteUrl = '/api/suite/getOne/';
const getReservationUrl = '/api/reservation/getAllFromSuite/';
const createReservationUrl = '/api/reservation/createOne';

export default function () {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());
    const [hotels, setHotels] = useState([]);
    const [suites, setSuites] = useState();
    const [suitePrice, setSuitePrice] = useState('');
    const [hotelId, setHotelId] = useState('');
    const [suiteId, setSuiteId] = useState('');
    const [disabledRanges, setDisabledRanges] = useState([]);
    const [reservations, setReservations] = useState();

    const goToSignup = () => {
        navigate('/connexion');
    };

    useEffect(() => {
        axios.get(getHotelUrl).then((res) => setHotels(res.data));
    }, []);

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

    const handleHotelChange = (value) => {
        axios.get(getSuitesUrl + value).then((res) => setSuites(res.data));
    };

    const handleSuiteChange = (value) => {
        axios
            .get(getSuiteUrl + value)
            .then((res) => setSuitePrice(res.data.price));

        axios.get(getReservationUrl + value).then((res) => {
            setReservations(res.data);
        });
    };

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
        <div>
            <Nav />
            <div className='pt-20 max-w-screen-xl mx-auto'>
                <h1 className='t-gold t-josefin text-xl uppercase tracking-widest mx-2 sm:text-2xl sm:mx-4 lg:text-4xl '>
                    Réservation
                </h1>
                <h2 className='t-josefin t-light mx-2 sm:text-lg sm:mx-6 lg:text-2xl'>
                    Pour Réserver veuillez remplir ce formulaire
                </h2>

                <div className='flex justify-center'>
                    {!currentUser ? (
                        <div
                            onClick={goToSignup}
                            className='bg-gray-400 bg-opacity-25 py-32 mb-10 w-full flex items-center justify-center mt-4 hover:text-blue-800 cursor-pointer md:py-60 xl:py-80'
                        >
                            <button className='t-crimson text-xl'>
                                Pour reserver, connectez vous!
                            </button>
                        </div>
                    ) : (
                        <form
                            className='px-2 py-2 lg:flex lg:justify-between lg:w-3/4 lg:py-10 xl:pb-20'
                            onSubmit={handleSubmit}
                        >
                            <div className='mt-2 '>
                                <p className='text-lg t-crimson t-bold mb-2'>
                                    Séléctionner un hôtel
                                </p>
                                <select
                                    name='hotelId'
                                    id='hotelId'
                                    value={hotelId}
                                    required
                                    onChange={(e) => {
                                        setHotelId(e.target.value);

                                        handleHotelChange(e.target.value);
                                    }}
                                >
                                    {!hotels
                                        ? ''
                                        : hotels.map((hotel) => (
                                              <option
                                                  value={hotel.id}
                                                  key={uuidv4()}
                                              >
                                                  {hotel.name}
                                              </option>
                                          ))}
                                </select>
                            </div>
                            <div className='mt-4 '>
                                <p className='text-lg t-crimson t-bold mb-2'>
                                    Séléctionner une Suite
                                </p>
                                <select
                                    name='suiteId'
                                    id='suiteId'
                                    value={suiteId}
                                    onChange={(e) => {
                                        setSuiteId(e.target.value);

                                        handleSuiteChange(e.target.value);
                                    }}
                                    required
                                >
                                    {!suites
                                        ? ''
                                        : suites.map((suite) => (
                                              <option
                                                  value={suite.id}
                                                  key={uuidv4()}
                                              >
                                                  {suite.title}
                                              </option>
                                          ))}
                                </select>
                                <p className='text-lg t-crimson t-bold mb-2 mt-4'>
                                    Prix de la nuit:
                                </p>
                                <p className='text-xl t-josefin mb-2'>
                                    {suiteId ? `${suitePrice} €` : ''}
                                </p>
                            </div>
                            <div className='mt-6 mx-2'>
                                <p className='text-lg t-crimson t-bold mb-2'>
                                    Séléctionner la date de votre séjour.
                                </p>
                                <Calendar
                                    selectRange={true}
                                    value={date}
                                    onChange={setDate}
                                    className='mx-auto'
                                    minDate={new Date()}
                                    tileDisabled={tileDisabled}
                                />
                                <button className='block px-4 py-2 t-josefin text-sm uppercase bg-gray-900 text-white mx-auto mt-4 hover:bg-white hover:text-black hover:border hover:border-black sm:mt-8'>
                                    Réserver
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
