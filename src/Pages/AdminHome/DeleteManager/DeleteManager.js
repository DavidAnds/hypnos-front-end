import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
const deleteUrl = 'http://localhost:8080/api/back/user/deleteOne/';

export default function DeleteManager() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const deleteManager = () => {
       
        axios
            .delete(deleteUrl + id, {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            })
            .then((res) => {
                navigate('../Managers');
                console.log(res.data);
            });
    };

    const cancelDelete = () => {
        navigate('../Managers')
    }

    return (
        <div>
            <h2 className='text-5xl ml-20'>Supprimer un manager</h2>

            <p className='mt-20 ml-10 text-xl t-crimson'>
                Voulez vous vraiment supprimer ce manager ?
            </p>
            <div className='flex ml-20'>
                <button
                    onClick={deleteManager}
                    className='block px-20 py-3 text-lg t-josefin uppercase text-white mt-8 bg-red-500 text-white hover:bg-white hover:text-red-500 hover:border hover:border-red-500'
                >
                    Supprimer
                </button>
                <button
                    onClick={cancelDelete}
                    className='block px-20 py-3 text-lg t-josefin uppercase text-white  ml-10 mt-8 bg-gold text-white hover:bg-white hover:text-black hover:border hover:border-black'
                >
                    Annuler
                </button>
            </div>
        </div>
    );
}
