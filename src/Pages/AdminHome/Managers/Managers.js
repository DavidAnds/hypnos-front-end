import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../../../Context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
const getUrl = '/api/back/user/getAll';

export default function Managers() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [managers, setManagers] = useState();

    useEffect(() => {
        axios.get(getUrl).then((res) => {
            setManagers(res.data);
        });
    }, []);

    return (
        <div>
            <h2 className='text-3xl t-josefin ml-10  xl:ml-20 xl:text-5xl'>Managers</h2>

            <div className='hidden grid-cols-6 px-2 mt-20 sm:grid'>
                <div className=' flex justify-center'>
                    <h3 className='text-xl t-crimson t-bold'>Nom</h3>{' '}
                </div>
                <div className=' flex justify-center'>
                    <h3 className='text-xl t-crimson t-bold'>Prénom</h3>{' '}
                </div>
                <div className=' flex justify-center'>
                    <h3 className='text-xl t-crimson t-bold'>Email</h3>{' '}
                </div>
                <div className='col-span-3  pl-10 lg:pl-20'>
                    <h3 className='text-xl t-crimson t-bold'>Hôtel</h3>
                </div>
            </div>

            {!managers
                ? ''
                : managers.map((manager) => (
                      <div
                          className='grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-6 px-2 mt-4 items-center'
                          key={uuidv4()}
                      >
                          <div className='hidden flex justify-center py-4 sm:flex'>
                              <p className='t-crimson text-center'>
                                  {manager.lastName}
                              </p>
                          </div>
                          <div className=' hidden flex justify-center py-4 sm:flex'>
                              <p className='t-crimson text-center'>
                                  {manager.firstName}
                              </p>
                          </div>
                          <div className='col-span-2 flex justify-center py-4 sm:col-span-1'>
                              <p className='t-crimson text-center'>
                                  {manager.email}
                              </p>
                          </div>
                          <div className='hidden col-span-1 pl-10 py-4 sm:flex'>
                              <p className='t-crimson'>{manager.hotel.name}</p>
                          </div>
                          <div className='col-span-1  flex justify-center items-center'>
                              <Link
                                  to={`./${manager.id}`}
                                  state={manager}
                                  className='block text-sm px-2 py-2 h-10 t-josefin  bg-gold text-white hover:bg-white hover:text-black hover:border hover:border-black xl:px-8 xl:text-md '
                              >
                                  Modifier
                              </Link>
                          </div>
                          <div className='col-span-1  flex justify-center items-center'>
                              <Link
                                  to={`./delete/${manager.id}`}
                                  className='block text-sm px-2 py-2 h-10 t-josefin  bg-red-500 text-white  hover:bg-white hover:text-red-500 hover:border hover:border-red-500  xl:px-8 xl:text-md'
                              >
                                  Supprimer
                              </Link>
                          </div>
                      </div>
                  ))}

            <Link
                to='./create'
                className='block py-2 max-w-xs flex justify-center t-josefin text-sm uppercase t-josefin bg-gold text-white mx-10 mt-8 mb-8 hover:bg-white hover:text-black hover:border hover:border-black lg:py-4 lg:w-1/3 lg:ml-20'
            >
                Créer un nouveau manager
            </Link>
        </div>
    );
}
