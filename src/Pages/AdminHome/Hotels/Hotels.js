import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, Link } from 'react-router-dom';
const baseUrl = '/api/hotel/getAll';

export default function Hotels() {

    const navigate = useNavigate();
    const [hotels, setHotels] = useState();

    useEffect(() => {
        axios.get(baseUrl).then((res) => {
            setHotels(res.data);
        });
    }, []);

    return (
        <div>
            <h2 className='text-3xl t-josefin ml-10  xl:ml-20 xl:text-5xl'>Hotels</h2>

            <div className='hidden grid-cols-8 px-2 mt-10 lg:grid'>
                <div className=' flex justify-center py-4'>
                   
                </div>
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
                          className='grid grid-cols-3 grid-rows-2 px-2 mt-4 sm:grid-rows-1 sm:grid-cols-6 sm:items-center lg:grid-cols-8'
                          key={uuidv4()}
                      >
                          <div className=' row-span-2 flex justify-center py-4 sm:row-span-1'>
                              <img src={hotel.imageURL} alt={hotel.imageDescription} />
                          </div>
                          <div className='col-span-2 flex justify-start mx-4 py-4 sm:col-span-1 sm:justify-center'>
                              <p className='  t-crimson text-center'>
                                  {hotel.name}
                              </p>
                          </div>
                          <div className='hidden flex justify-center py-4 sm:block'>
                              <p className='t-crimson text-center'>
                                  {hotel.city}
                              </p>
                          </div>
                          <div className='hidden flex justify-center py-4 sm:block'>
                              <p className='t-crimson text-center'>
                                  {hotel.adress}
                              </p>
                          </div>
                          <div className='hidden col-span-2 pl-6 py-4 lg:block'>
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
                                  className='block text-sm px-2 py-2 h-10 t-josefin  bg-gold text-white hover:bg-white hover:text-black hover:border hover:border-black xl:px-8 xl:text-md'
                              >
                                  Modifier
                              </Link>
                          </div>
                          <div className='col-span-1  flex justify-center items-center'>
                              <Link
                                  to={`./delete/${hotel.id}`}
                                  className='block text-sm px-2 py-2 h-10 t-josefin  bg-red-500 text-white  hover:bg-white hover:text-red-500 hover:border hover:border-red-500 xl:px-8 xl:text-md '
                              >
                                  Supprimer
                              </Link>
                          </div>
                      </div>
                  ))}

            <Link
                to='./create'
                className='block py-2 max-w-xs flex justify-center t-josefin text-sm uppercase t-josefin bg-gold text-white mx-10 mt-4 mb-8 hover:bg-white hover:text-black hover:border hover:border-black lg:py-4 lg:w-1/3 lg:ml-20'
            >
                Ajouter un nouvel hotel
            </Link>
        </div>
    );
}
