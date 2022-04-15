import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
const deleteUrl = '/api/suite/deleteOne/';

export default function DeleteSuite() {
    const {id} = useParams()
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext);

    const deleteSuite = () => {
        axios
        .delete(deleteUrl + id, {
            headers: {
                authorization: `Bearer ${currentUser.token}`,
            },
        })
        .then((res) => {
            navigate('../suites');
        });
    };

    const cancelDelete = () => {
        navigate('../suites')
    };
    return (
        <div>
            <h2 className='text-3xl t-josefin ml-10  xl:ml-20 xl:text-5xl'>Supprimer une suite</h2>

            <p className='mt-10 mx-4 text-xl t-crimson'>
                Voulez vous vraiment supprimer cette suite ?
            </p>
            <div className='flex flex-col md:flex-row mx-4'>
                <button
                    onClick={deleteSuite}
                    className='block px-20 py-3 text-lg t-josefin uppercase text-white mt-8 bg-red-500 text-white hover:bg-white hover:text-red-500 hover:border hover:border-red-500'
                >
                    Supprimer
                </button>
                <button
                    onClick={cancelDelete}
                    className='block px-20 py-3 text-lg t-josefin uppercase text-white  md:ml-10 mt-8 bg-gold text-white hover:bg-white hover:text-black hover:border hover:border-black'
                >
                    Annuler
                </button>
            </div>
        </div>
    );
}
