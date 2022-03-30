import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../../../Context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
const getUrl = 'http://localhost:8080/api/back/user/getAll';

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
        <div className='w-full h-full'>
            <h2 className='text-5xl ml-20'>Managers</h2>

            <div className='grid grid-cols-7 px-10 mt-10'>
                <div className=' flex justify-center'>
                    <h3 className='text-xl t-crimson t-bold'>Nom</h3>{' '}
                </div>
                <div className=' flex justify-center'>
                    <h3 className='text-xl t-crimson t-bold'>Prénom</h3>{' '}
                </div>
                <div className=' flex justify-center'>
                    <h3 className='text-xl t-crimson t-bold'>Email</h3>{' '}
                </div>
                <div className='col-span-4  pl-20'>
                    <h3 className='text-xl t-crimson t-bold'>Hôtel</h3>
                </div>
            </div>

            {!managers
                ? ''
                : managers.map((manager) => (
                      <div
                          className='grid grid-cols-7 px-10 mt-1'
                          key={uuidv4()}
                      >
                          <div className=' flex justify-center py-4'>
                              <p className='t-crimson text-center'>
                                  {manager.lastName}
                              </p>
                          </div>
                          <div className=' flex justify-center py-4'>
                              <p className='t-crimson text-center'>
                                  {manager.firstName}
                              </p>
                          </div>
                          <div className='flex justify-center py-4'>
                              <p className='t-crimson text-center'>
                                  {manager.email}
                              </p>
                          </div>
                          <div className='col-span-2 pl-10 py-4'>
                              <p className='t-crimson'>{manager.hotel.name}</p>
                          </div>
                          <div className='col-span-1  flex justify-center items-center'>
                              <Link
                                  to={`./${manager.id}`}
                                  state={manager}
                                  className='block px-4 py-2 h-10 t-josefin uppercase bg-gold text-white hover:bg-white hover:text-black hover:border hover:border-black'
                              >
                                  Modifier
                              </Link>
                          </div>
                          <div className='col-span-1  flex justify-center items-center'>
                              <Link
                                  to={`./delete/${manager.id}`}
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
                Créer un nouveau manager
            </Link>
        </div>
    );
}
