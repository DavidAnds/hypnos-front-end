import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Link } from 'react-router-dom';
const getSuitesUrl = 'http://localhost:8080/api/suite/getAll/';
const getHotelUrl = 'http://localhost:8080/api/hotel/getOne/';

export default function Suites() {
    let { currentUser } = useContext(AuthContext);
    const [suites, setSuites] = useState();

    const [hotelName, setHotelName] = useState('')

    useEffect(() => {
        axios
            .get(getSuitesUrl + currentUser.hotelId)
            .then((res) => setSuites(res.data));

        axios
            .get(getHotelUrl + currentUser.hotelId)
            .then((res) => setHotelName(res.data.name));

    }, []);

    return (
        <div className='w-full h-full'>
            <h2 className='text-5xl ml-20 t-josefin'>Les suites de <span className=''>{hotelName}</span></h2>

            <div className='grid grid-cols-8 px-2 mt-10'>
                <div className=' flex justify-center'></div>
                <div className=' flex justify-center'>
                    <h3 className='text-xl t-crimson t-bold'>Titre</h3>
                </div>
                <div className=' flex justify-center'>
                    <h3 className='text-xl t-crimson t-bold'>Prix</h3>
                </div>
                <div className=' flex justify-center'>
                    <h3 className='text-xl t-crimson t-bold'>lien booking</h3>
                </div>
                <div className=' flex justify-center col-span-2'>
                    <h3 className='text-xl t-crimson t-bold'>Description</h3>
                </div>
                <div className='col-span-2'></div>
            </div>

            {!suites
                ? 'waiting for data'
                : suites.map((suite) => (
                      <div
                          className='grid grid-cols-8 px-2 mt-4'
                          key={uuidv4()}
                      >
                          <div className=' flex justify-center'>
                              <img src={suite.imageURL} className='w-20 h-20'/>
                          </div>
                          <div className=' flex justify-center items-center'>
                              <h3 className='t-crimson text-center'>
                                  {suite.title}
                              </h3>
                          </div>
                          <div className=' flex justify-center items-center'>
                              <h3 className='t-crimson text-center'>
                                  {suite.price}
                              </h3>
                          </div>
                          <div className=' flex justify-center items-center'>
                              <h3 className='t-crimson text-center'>
                                  {suite.bookingLink}
                              </h3>
                          </div>
                          <div className=' flex justify-center items-center col-span-2'>
                              <h3 className='t-crimson text-sm text-center'>
                                  {suite.description}
                              </h3>
                          </div>
                          <div className='flex justify-around items-center col-span-2'>
                              <Link
                                  to={`./gallery/${suite.id}`}
                                  className='block px-2 py-2 text-sm t-josefin uppercase bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black'
                              >
                                  gallerie
                              </Link>
                              <Link
                                  to={`./${suite.id}`}
                                  state={suite}
                                  className='block px-2 py-2 text-sm t-josefin uppercase bg-gold text-white hover:bg-white hover:text-black hover:border hover:border-black'
                              >
                                  Modifier
                              </Link>
                              <Link
                                  to={`./delete/${suite.id}`}
                                  className='block px-2 py-2 text-sm t-josefin uppercase bg-red-500 text-white  hover:bg-white hover:text-red-500 hover:border hover:border-red-500'
                              >
                                  Supprimer
                              </Link>
                          </div>
                      </div>
                  ))}

            <Link
                to='./create'
                className='block py-2 w-1/3 flex justify-center t-josefin mb-10 uppercase t-josefin bg-gold text-white ml-20 mt-10 hover:bg-white hover:text-black hover:border hover:border-black '
            >
                Créer une nouvelles suites
            </Link>
        </div>
    );
}
