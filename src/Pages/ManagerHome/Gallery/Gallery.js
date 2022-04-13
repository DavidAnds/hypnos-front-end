import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const createUrl = '/api/gallery/createOne';
const getImageUrl = '/api/gallery/getAll/';
const deleteImageUrl = '/api/gallery/deleteOne/';

export default function Gallery() {
    const { suiteId } = useParams();
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [images, setImages] = useState(null);

    const navigate = useNavigate();

    let { currentUser } = useContext(AuthContext);

    const toggleForm = () => {
        setToggle(!toggle);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', file);
        formData.append('description', description);
        formData.append('suiteId', suiteId);

        axios
            .post(createUrl, formData, {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            })
            .then(() => {
                toggleForm();
                window.location.reload(false);
            });
    };

    const handleDelete = (imageId) => {
        axios
            .delete(deleteImageUrl + imageId, {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            })
            .then(() => {
                window.location.reload(false);
            });
    };

    useEffect(() => {
        axios.get(getImageUrl + suiteId).then((res) => {
            setImages(res.data);
        });
    }, []);

    return (
        <div className='w-full h-full'>
            <h2 className='text-5xl ml-20 t-josefin'>La gallery</h2>

            <div className='grid justify-center gap-8 mx-8 max-w-screen-xl mt-6 sm:grid-cols-2  lg:grid-cols-3 xl:px-2'>
                {!images
                    ? 'null'
                    : images.map((image) => {
                          return (
                              <div
                                  className='border border-black flex flex-col justify-between'
                                  key={uuidv4()}
                              >
                                  <img
                                      src={image.imageURL}
                                      alt={image.description}
                                  />
                                  <div className='flex justify-between t-crimson h-30'>
                                      <button
                                          onClick={() => {
                                              handleDelete(image.id);
                                          }}
                                          className='block w-full flex py-2 justify-center t-josefin  uppercase t-josefin bg-red-500 text-white hover:bg-white hover:text-red-500 hover:border hover:border-red-500'
                                      >
                                          Supprimer
                                      </button>
                                  </div>
                              </div>
                          );
                      })}
            </div>

            <button
                onClick={toggleForm}
                className='block py-2 w-1/3 flex justify-center t-josefin mb-4 uppercase t-josefin bg-gold text-white ml-20 mt-10 hover:bg-white hover:text-black hover:border hover:border-black '
            >
                Ajouter une image
            </button>

            <form
                className={
                    toggle ? 'w-96 ml-24 border border-black p-4' : 'hidden'
                }
                onSubmit={handleSubmit}
            >
                <div className='mt-2 '>
                    <label htmlFor='file' className='text-2xl t-crimson t-bold'>
                        Ajouter une image pour la suite
                    </label>
                    <input
                        type='file'
                        id='file'
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                        }}
                        required
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                </div>
                <div className='mt-2 '>
                    <label
                        htmlFor='description'
                        className='text-2xl t-crimson t-bold'
                    >
                        description de l'image
                    </label>
                    <textarea
                        id='description'
                        required
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        className='border-solid border-2 border-gray-600 block w-full py-1 px-2 mt-1'
                    />
                </div>
                <div className='flex'>
                    <button className='block px-4 py-3 text-sm mb-4 mt-2 t-josefin uppercase bg-gold text-white  hover:bg-white hover:text-black hover:border hover:border-black'>
                        Ajouter l'image
                    </button>
                </div>
            </form>
        </div>
    );
}
