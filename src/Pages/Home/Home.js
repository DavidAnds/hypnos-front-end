import React from 'react';
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import background from './home-background.jpg';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className='h-screen w-full'>
            <Nav />
            <div
                style={{ backgroundImage: `url(${background})` }}
                className='h-3/4 bg-cover bg-center flex items-center justify-center md:h-3/4 '
            >
                <div className='t-josefin  text-center bg-white bg-opacity-75 p-3 rounded sm:p-8  xl:p-10'>
                    <h1 className='uppercase text-xl sm:text-2xl lg:text-2xl'>
                        Bienvenue sur Hypnos !
                    </h1>
                    <h3 className='t-light text-2xl sm:text-4xl sm:mt-2 lg:text-4xl'>
                        Agence de réservation d'hôtel
                    </h3>
                </div>
            </div>

            <div className='bg-gray-100 py-10'>
                <div className='max-w-screen-xl mx-auto'>
                    <h2 className='t-gold t-josefin text-xl uppercase tracking-widest mx-2 sm:text-2xl sm:mx-4 lg:text-4xl '>
                        Nos hôtels
                    </h2>
                    <p className='t-josefin t-light mx-2 sm:text-lg sm:mx-6 lg:text-2xl'>
                        Découvrez l'ensemble des hôtels du groupe Hypnos.
                    </p>
                </div>

                <div className='grid justify-center max-w-screen-xl mt-6 gap-8 mx-4 md:grid-cols-2 lg:mx-20 xl:mx-auto xl:grid-cols-3'>
                    <div className='bg-white shadow-xl py-4 mx- max-w-xl md:mx-auto'>
                        <div className='mx-4 rounded '>
                            <img src={background} alt='image'/>
                        </div>

                        <div className='mt-4 px-4 t-crimson text-center flex flex-col items-center'>
                            <h2 className='t-josefin text-xl self-start'>
                                Nom de l'hôtel
                            </h2>
                            <p className=' mt-2 text-justify'>
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Earum praesentium quae
                                architecto magni fuga laborum dicta incidunt ab
                                aspernatur! Dolorum eveniet rerum minus
                                doloremque, eum unde exercitationem blanditiis
                                obcaecati natus?
                            </p>
                            <p className='mt-4 self-end'>
                                adresse de l'hotel, ville
                            </p>

                            <Link
                                to='/hotel'
                                className='inline-block px-2 py-3 text-sm t-josefin uppercase bg-gold text-white mt-6 mb-2 justify-self-end transition hover:bg-white hover:text-black hover:border hover:border-black'
                            >
                                Découvrir les suites
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
