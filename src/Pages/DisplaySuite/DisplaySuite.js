import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';
import Reservation from '../../Components/Reservation/Reservation';
const getImageUrl = '/api/gallery/getAll/';

export default function DisplaySuite() {
    const [suite, setSuite] = useState({});
    const [images, setImages] = useState();
    const [imageIndex, setImageIndex] = useState(0);

    const location = useLocation();
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const goToSignup = () => {
        navigate('/connexion');
    };

    useEffect(() => {
        axios.get(getImageUrl + location.state.id).then((res) => {
            setImages(res.data);
        });

        setSuite(location.state);
    }, []);

    const plusOneIndex = () => {
        if (imageIndex >= images.length - 1) {
            setImageIndex(0);
        } else {
            setImageIndex(imageIndex + 1);
        }
        console.log(imageIndex);
    };

    const minusOneIndex = () => {
        if (imageIndex <= 0) {
            setImageIndex(images.length - 1);
        } else {
            setImageIndex(imageIndex - 1);
        }
    };

    return (
        <div className='min-h-screen'>
            <Nav />
            <div className='pt-14 max-w-screen-xl mx-auto md:grid md:grid-cols-5 md:pt-12 lg:pb-4 '>
                <div className='md:col-span-3 md:flex md:flex-col-reverse md:justify-center'>
                    <div className='relative lg:mb-8 lg:w-3/4 lg:mx-auto '>
                        <div className='absolute w-4/5 flex justify-between top-2/4 left-1/2 transform -translate-x-1/2'>
                            <button
                                onClick={minusOneIndex}
                                className='py-2 px-2 text-xl border border-black block rounded-xl hover:bg-gray-100'
                            >
                                {'<'}{' '}
                            </button>
                            <button
                                onClick={plusOneIndex}
                                className='py-2 px-2 text-xl border border-black block rounded-xl hover:bg-gray-100'
                            >
                                {'>'}
                            </button>
                        </div>
                        <img
                            src={
                                !images
                                    ? suite.imageURL
                                    : images[imageIndex].imageURL
                            }
                            alt={suite.title}
                            className='w-full object-cover md:max-h-80 md:max-h-screen'
                        />
                    </div>
                    <div className='px-2 py-4 md:px-8 md:flex items-center justify-between'>
                        <h1 className='t-josefin text-2xl t-gold sm:text-2xl'>
                            {suite.title}
                        </h1>
                        <p className='t-crimson ml-2 text-gray-900'>
                            <span className='t-bold text-gray-900 tracking-widest mr-1'>
                                {suite.price}€
                            </span>
                            / nuit
                        </p>
                    </div>
                </div>

                <div className='border-t px-2 pt-4 pb-4 max-w-screen-xl md:px-8 md:col-span-5 md:order-1 xl:mx-auto xl:px-0'>
                    <h3 className='t-josefin t-light uppercase te t-gold text-xl md:text-2xl'>
                        En savoir plus
                    </h3>
                    <p className='t-crimson text-justify px-2 mt-2'>
                        {suite.description}
                        {suite.description}
                    </p>

                    <div className='text-center mt-4'>
                        <a
                            href='#'
                            className=' text-sm italic tracking-widest text-gray-700 t-josefin hover:text-blue-800'
                        >
                            {suite.bookingLink}
                        </a>
                    </div>
                </div>

                <div className='border-t px-2 py-4 md:px-8 md:col-span-2 md:border-l lg:border-t-0'>
                    <h3 className='t-josefin t-light uppercase te t-gold text-xl md:text-2xl'>
                        Reservation
                    </h3>

                    <div className='md:h-5/6'>
                        {!currentUser ? (
                            <div onClick={goToSignup} className='bg-gray-400 bg-opacity-25 h-40 w-full flex items-center justify-center mt-4 hover:text-blue-800 cursor-pointer md:h-full'>
                                <button
                                    className='t-crimson text-xl'
                                >
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
