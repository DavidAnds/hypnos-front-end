import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import Reservation from '../../Components/Reservation/Reservation';
import home from './home-background.jpg';

export default function DisplaySuite() {
    const { currentUser } = useContext(AuthContext);

    return (
        <div>
            <Nav />
            <div className='pt-14 max-w-screen-xl mx-auto md:grid md:grid-cols-5 md:pt-12 lg:pb-14 '>
                <div className='md:col-span-3 md:flex md:flex-col-reverse'>
                    <div className='lg:mb-8 lg:w-3/4 lg:mx-auto '>
                        <img
                            src={home}
                            alt=''
                            className='w-full object-cover md:max-h-80 md:max-h-screen'
                        />
                    </div>
                    <div className='px-2 py-4 md:px-8 md:flex items-center justify-between'>
                        <h1 className='t-josefin text-2xl t-gold sm:text-2xl'>
                            Nom Suites
                        </h1>
                        <p className='t-crimson ml-2 text-gray-900'>
                            Adresse hotel, ville
                        </p>
                    </div>
                </div>

                <div className='border-t px-2 pt-4 pb-4 max-w-screen-xl md:px-8 md:col-span-5 md:order-1 xl:mx-auto xl:px-0'>
                    <h3 className='t-josefin t-light uppercase te t-gold text-xl md:text-2xl'>
                        En savoir plus
                    </h3>
                    <p className='t-crimson text-justify px-2 mt-2'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolores, hic. Dolorem id similique voluptatum doloribus
                        cum tempora aliquam magnam incidunt quidem beatae,
                        facere, voluptatem voluptatibus dignissimos ea nisi
                        totam laudantium dolore maiores, magni ullam? Quibusdam
                        ducimus, sequi, maiores neque quo provident atque,
                        temporibus impedit ipsa earum accusantium facere quod
                        qui.
                    </p>

                    <div className='text-center mt-4'>
                        <a href='#' className=' text-sm italic tracking-widest text-gray-700 t-josefin hover:text-blue-800'>Lien booking</a>
                    </div>
                </div>

                <div className='border-t px-2 py-4 md:px-8 md:col-span-2 md:border-l lg:border-t-0'>
                    <h3 className='t-josefin t-light uppercase te t-gold text-xl md:text-2xl'>
                        Reservation
                    </h3>

                    <div className='md:h-5/6'>
                        {!currentUser ? (
                            <div className='bg-gray-400 bg-opacity-25 h-40 w-full flex items-center justify-center mt-4 hover:text-blue-800 cursor-pointer md:h-full'>
                                <button className='t-crimson text-xl'>
                                    Pour reserver, connectez vous!
                                </button>
                            </div>
                        ) : (
                            <Reservation />
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
