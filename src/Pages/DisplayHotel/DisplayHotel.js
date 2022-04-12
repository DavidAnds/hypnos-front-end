import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';

const getSuitesUrl = 'http://localhost:8080/api/suite/getAll/';

export default function DisplayHotel() {
    const [hotel, setHotel] = useState({});
    const [suites, setSuites] = useState([]);
    const location = useLocation();

    useEffect(() => {
        setHotel(location.state);

        axios
            .get(getSuitesUrl + location.state.id)
            .then((res) => setSuites(res.data));
    }, []);

    return (
        <div>
            <Nav />

            <div className='pt-16 pb-8 bg-gray-100 sm:pt-20 lg:pt-24 lg:pb-14'>
                <div className='px-2 flex justify-between max-w-screen-xl md:px-8  xl:mx-auto xl:px-0'>
                    <h1 className='t-josefin text-xl t-gold sm:text-2xl lg:text-4xl'>
                        {hotel ? hotel.name : 'No data'}
                    </h1>
                </div>

                <div className='mt-2 md:px-8 md:mt-4 lg:flex lg:items-center lg:justify-center lg:gap-8 xl:mt-6'>
                    <div className='flex justify-center'>
                        <img
                            src={hotel ? hotel.imageURL : 'No data'}
                            alt={hotel ? hotel.imageDescription : 'No data'}
                            className='max-w-2xl max-h-60 md:max-h-80 lg:max-h-screen'
                        />
                    </div>
                    <div className='py-4 px-2 lg:w-1/2 xl:w-1/3'>
                        <h3 className='t-josefin t-light uppercase t-gold text-xl md:text-2xl'>
                            description
                        </h3>
                        <p className='t-crimson text-justify mt-2 max-w-screen-xl text-lg md:mt-4 lg:mt-6'>
                            {hotel ? hotel.description : 'No data'}
                        </p>
                        <p className='text-gray-900 t-crimson t-bold text-right mt-2 md:mt-4 lg:text-xl  lg:mt-6'>
                            {hotel.adress},{' '}
                            <span className='t-bold'>{hotel.city}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className='py-4 bg-gray-900'>
                <div className='px-2 mt-4 md:px-8 max-w-screen-xl xl:mx-auto xl:px-0'>
                    <h2 className='t-gold t-josefin text-xl uppercase tracking-widest  sm:text-2xl  lg:text-4xl '>
                        Nos suites
                    </h2>
                    <p className='text-white t-josefin t-light sm:text-xl lg:text-2xl'>
                        Découvrez toutes les suites de notre hotel
                    </p>
                </div>

                <div className='grid justify-center gap-8 mx-4 max-w-screen-xl mt-6 sm:grid-cols-2 lg:mx-20 lg:grid-cols-3 xl:mx-auto xl:px-2 cursor-pointer'>
                    {!suites
                        ? 'No data'
                        : suites.map((suite) => (
                              <Link
                                  to={`./${suite.id}`}
                                  state={suite}
                                  className='bg-white shadow-2xl lg:transform lg:hover:scale-125 hover:z-50 transition'
                                  key={uuidv4()}
                              >
                                  <img
                                      src={suite.imageURL}
                                      alt={`photo de ${suite.title}`}
                                  />
                                  <div className='flex px-1 py-1 justify-between items-center t-crimson'>
                                      <p className='t-bold text-gray-900 text-lg md:text-xl'>
                                          {suite.title}
                                      </p>
                                      <p className='ml-4 md:text-lg'>
                                          <span className='t-bold text-gray-900 tracking-widest mr-1'>
                                              {suite.price}€
                                          </span>
                                          / nuit
                                      </p>
                                  </div>
                              </Link>
                          ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
