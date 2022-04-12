import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../Components/Footer/Footer';
import Nav from '../../Components/Nav/Nav';
const getHotelUrl = 'http://localhost:8080/api/hotel/getAll';
const getSuitesUrl = 'http://localhost:8080/api/suite/getAll/';
const createReservationUrl = 'http://localhost:8080/api/reservation/createOne'

export default function () {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());
    const [hotels, setHotels] = useState([]);
    const [suites, setSuites] = useState();
    const [hotelId, setHotelId] = useState('');
    const [suiteId, setSuiteId] = useState('');


    const goToSignup = () => {
        navigate('/connexion');
    };

    useEffect(() => {
        axios.get(getHotelUrl).then((res) => setHotels(res.data));
    }, []);

    const handleHotelChange = (value) => {
        axios.get(getSuitesUrl + value).then((res) => setSuites(res.data));
    }; 

    const handleSubmit = (e) => {
        e.preventDefault()
        const SQLEndDate = date[1].toLocaleString("en-US").split(', ')
        const SQLStartDate = date[0].toLocaleString("en-US").split(', ')

        const startDate = SQLStartDate[0]
        const endDate = SQLEndDate[0]


        axios
        .post(createReservationUrl , {
            startDate,
            endDate,
            suiteId,
        }, {
            headers: {
                authorization: `Bearer ${currentUser.token}`,
            },
        })
        .then(() => {
            navigate('/')
        });
    
    }

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
                            className='bg-gray-400 bg-opacity-25 h-40 w-full flex items-center justify-center mt-4 hover:text-blue-800 cursor-pointer md:h-full'
                        >
                            <button className='t-crimson text-xl'>
                                Pour reserver, connectez vous!
                            </button>
                        </div>
                    ) : (
                        <form className='px-2 py-2' onSubmit={handleSubmit}>
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
                            <div className='mt-2 '>
                                <p className='text-lg t-crimson t-bold mb-2'>
                                    Séléctionner une Suite
                                </p>
                                <select
                                    name='suiteId'
                                    id='suiteId'
                                    value={suiteId}
                                    onChange={(e) => {
                                       setSuiteId(e.target.value)
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
                            </div>
                            <div className='mt-2 mx-2'>
                                <p className='text-lg t-crimson t-bold mb-2'>
                                    Séléctionner la date de votre séjour.
                                </p>
                                <Calendar selectRange={true} value={date} onChange={setDate} />
                            </div>
                            <button className='block px-4 py-2 t-josefin text-sm uppercase bg-gray-900 text-white mx-auto mt-4 hover:bg-white hover:text-black hover:border hover:border-black sm:mt-8'>
                                Réserver
                            </button>
                        </form>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
