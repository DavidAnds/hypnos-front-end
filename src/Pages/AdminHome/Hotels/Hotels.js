import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../../../Context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
const baseUrl = 'http://localhost:8080/api/hotel/getAll';

export default function Hotels() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [hotels, setHotels] = useState();

    useEffect(() => {
        axios.get(baseUrl).then((res) => {
            setHotels(res.data);
            console.log(res.data);
        });
    }, []);

    return (
        <div>
            <h2 className='text-5xl ml-20'>Hotels</h2>

            <div className='grid grid-cols-7 px-10 mt-10'>
                <div className=' flex justify-center py-4'>
                    <h3 className='text-xl t-crimson t-bold'>Nom</h3>
                </div>
                <div className=' flex justify-center py-4'>
                    <h3 className='text-xl t-crimson t-bold'>Ville</h3>
                </div>
                <div className='flex justify-center py-4'>
                    <h3 className='text-xl t-crimson t-bold'>Adresse</h3>
                </div>
                <div className='col-span-4 pl-20 py-4'>
                    <h3 className='text-xl t-crimson t-bold'>Description</h3>
                </div>
            </div>

            {!hotels
                ? ''
                : hotels.map((hotel) => (
                      <div
                          className='grid grid-cols-7 px-10 mt-1'
                          key={uuidv4()}
                      >
                          <div className=' flex justify-center py-4'>
                              <p className='t-crimson text-center'>
                                  {hotel.name}
                              </p>
                          </div>
                          <div className=' flex justify-center py-4'>
                              <p className='t-crimson text-center'>
                                  {hotel.city}
                              </p>
                          </div>
                          <div className='flex justify-center py-4'>
                              <p className='t-crimson text-center'>
                                  {hotel.adress}
                              </p>
                          </div>
                          <div className='col-span-2 pl-6 py-4'>
                              <p className='t-crimson text-sm'>
                                  {!hotel.description
                                      ? 'No description'
                                      : hotel.description}
                              </p>
                          </div>
                          <div className='col-span-1  flex justify-center items-center'>
                              <Link
                                  to={`./${hotel.id}`}
                                  state={hotel}
                                  className='block px-4 py-2 h-10 t-josefin uppercase bg-gold text-white hover:bg-white hover:text-black hover:border hover:border-black'
                              >
                                  Modifier
                              </Link>
                          </div>
                          <div className='col-span-1  flex justify-center items-center'>
                              <Link
                                  to={`./delete/${hotel.id}`}
                                  className='block px-4 py-2 h-10 t-josefin uppercase bg-red-500 text-white  hover:bg-white hover:text-red-500 hover:border hover:border-red-500 '
                              >
                                  Supprimer
                              </Link>
                          </div>
                      </div>
                  ))}

            <Link
                to='./create'
                className='block py-2 w-1/3 flex justify-center t-josefin uppercase t-josefin bg-gold text-white ml-20 mt-10 hover:bg-white hover:text-black hover:border hover:border-black '
            >
                Ajouter un nouvel hotel
            </Link>
        </div>
    );
}
