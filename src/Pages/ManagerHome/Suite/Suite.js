import React, {useState, useEffect, useContext} from 'react'
import { AuthContext } from '../../../Context/AuthContext';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
const modifyUrl = '/api/suite/updateOne/';

export default function Suite() {
    const {id} = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    let {currentUser} = useContext(AuthContext)

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [bookingLink, setBookingLink] = useState('');
    const [file, setFile] = useState();

    useEffect(() => {
        setTitle(location.state.title);
        setPrice(location.state.price);
        setDescription(location.state.description);
        setBookingLink(location.state.bookingLink);

    }, []);

    const handleSubmit = e => {
        e.preventDefault()

        const formData = new FormData()
        if (file) {
            formData.append('image', file)
        }
        
        formData.append('title', title)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('bookingLink', bookingLink)

        axios
            .put(
                modifyUrl + id,
                    formData,
                {
                    headers: {
                        authorization: `Bearer ${currentUser.token}`
                    },
                }
            )
            .then((res) => {
                navigate('../suites');
            });
    }
  return (
    <div>
            <h2 className='text-3xl t-josefin ml-10  xl:ml-20 xl:text-5xl'>Modifier les informations de la suite</h2>
            <form className='px-4 mt-8 lg:px-10 xl:px-20' onSubmit={handleSubmit}>
                <div className='mt-2 '>
                    <label
                        htmlFor='Title'
                        className='text-2xl t-crimson t-bold'
                    >
                        Titre
                    </label>
                    <input
                        type='texte'
                        id='Title'
                        value={title}
                        required
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                </div>
                <div className='mt-2 '>
                    <label
                        htmlFor='bookingLink'
                        className='text-2xl t-crimson t-bold'
                    >
                        Lien Booking
                    </label>
                    <input
                        type='texte'
                        id='bookingLink'
                        value={bookingLink}
                        required
                        onChange={(e) => {
                            setBookingLink(e.target.value);
                        }}
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                </div>
                <div className='mt-2 '>
                    <label
                        htmlFor='price'
                        className='text-2xl t-crimson t-bold'
                    >
                        Prix
                    </label>
                    <input
                        type='number'
                        id='price'
                        value={price}
                        required
                        onChange={(e) => {
                            setPrice(e.target.value);
                        }}
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                </div>
                <div className='mt-2 '>
                    <label
                        htmlFor='file'
                        className='text-2xl t-crimson t-bold'
                    >
                        Modifier image
                    </label>
                    <input
                        type='file'
                        id='file'
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                        }}
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                </div>
                <div className='mt-2 '>
                    <label
                        htmlFor='description'
                        className='text-2xl t-crimson t-bold'
                    >
                        description
                    </label>
                    <textarea
                        id='description'
                        value={description}
                        required
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                </div>
                <div className='flex justify-end'>
                    <button className='block py-2 px-4 max-w-xs flex justify-center t-josefin uppercase t-josefin bg-gold text-white mx-auto mt-8 mb-8 hover:bg-white hover:text-black hover:border hover:border-black lg:py-4 lg:w-1/3 lg:ml-auto lg:mr-20'>
                        Modifier la suite
                    </button>
                </div>
            </form>
        </div>
  )
}
