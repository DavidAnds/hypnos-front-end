import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Footer from '../../Components/Footer/Footer';
import Nav from '../../Components/Nav/Nav';
const getReservationsURL = '/api/reservation/getAll/';
const deleteReservationUrl = '/api/reservation/deleteOne/';

export default function MyAccount() {
    const [reservations, setReservations] = useState();
    const [reservationsToDelete, setReservationsToDelete] = useState('');
    const [toggleModal, settoggleModal] = useState(false);
    const [verify3Days, setverify3Days] = useState(false);

    let { currentUser } = useContext(AuthContext);

    useEffect(() => {
        axios
            .get(getReservationsURL + currentUser.id)
            .then((res) => setReservations(res.data));
    }, [reservationsToDelete]);

    const setUpCancel = (id, startDate) => {
        const days3InMs = 3 * 24 * 60 * 60 * 1000;
        const dateStart = new Date(startDate).getTime();
        const today = new Date().getTime();

        if (dateStart - today >= days3InMs) {
            settoggleModal(!toggleModal);
            setReservationsToDelete(id);
        } else {
            settoggleModal(!toggleModal);
            setverify3Days(true);
        }
    };

    const validate = () => {
        axios
            .delete(deleteReservationUrl + reservationsToDelete, {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            })
            .then(() => {
                settoggleModal(!toggleModal);
                setReservationsToDelete('');
                setverify3Days(false);
            });
    };

    const cancel = () => {
        setReservationsToDelete('');
        settoggleModal(!toggleModal);
        setverify3Days(false);
    };

    return (
        <div className='relatif'>
            <Nav />
            <div
                onClick={cancel}
                className={
                    toggleModal
                        ? 'bg-gray-900 bg-opacity-25 absolute top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
                        : 'hidden'
                }
            >
                {' '}
                <div className='border bg-gray-900 px-10 py-10'>
                    <p className='text-center text-white t-crimson'>
                        {verify3Days
                            ? 'Il reste moins de 3 jours avant votre séjour, vous ne pouvez plus annuler'
                            : 'Voulez vous annuler votre réservation?'}
                    </p>
                    <div
                        className={
                            verify3Days
                                ? 'flex justify-center mt-8'
                                : 'flex justify-between mt-8'
                        }
                    >
                        <button
                            onClick={validate}
                            className={
                                verify3Days
                                    ? 'hidden'
                                    : 'inline-block px-10 py-2 t-josefin bg-red-500 text-white transition hover:bg-white hover:text-black hover:border hover:border-black'
                            }
                        >
                            Oui
                        </button>
                        <button
                            onClick={cancel}
                            className='inline-block px-10 py-2  t-josefin bg-gold text-white transition hover:bg-white hover:text-black hover:border hover:border-black'
                        >
                            {verify3Days ? 'Quitter' : 'Non'}
                        </button>
                    </div>
                </div>
            </div>

            <div className='pt-20 pb-10 max-w-screen-xl mx-auto'>
                <h1 className='t-gold t-josefin text-xl uppercase tracking-widest mx-2 sm:text-2xl sm:mx-4 lg:text-4xl '>
                    Mon compte
                </h1>
                <h2 className='t-josefin t-light mx-2 sm:text-lg sm:mx-6 lg:text-2xl'>
                    Bienvenue, {currentUser.firstName} {currentUser.lastName}
                </h2>

                <h3 className='t-josefin t-light uppercase t-gold text-xl mt-16 mx-2 md:text-2xl'>
                    Mes Réservation
                </h3>
                <p className='t-crimson mx-3 '>
                    Vous pouvez annulez la réservation jusqu’à 3 jours avant le
                    début de votre séjour.
                </p>

                <div className='grid gap-6 justify-items-center mt-6 sm:grid-cols-2 sm:mx-auto lg:grid-cols-3 lg:mx-20 lg:justify-center-start xl:px-2 cursor-pointer '>
                    {!reservations ? (
                        <h3>Vous n'avez aucune réservations</h3>
                    ) : (
                        reservations.map((reservation) => (
                            <div
                                className='bg-gray-300 w-72 py-4 px-4 t-crimson text-lg'
                                key={uuidv4()}
                            >
                                <p className='t-bold'>
                                    {reservation.suite.hotel.name}
                                </p>
                                <p className='t-bold'>
                                    {reservation.suite.title}
                                </p>
                                <p className='t-bold'>Dates :</p>
                                <p className='t-bold text-center'>
                                    {reservation.startDate.split(', ')[0]} -{' '}
                                    {reservation.endDate.split(', ')[0]}
                                </p>
                                <div className='w-full flex justify-center mt-2 mb-2 '>
                                    <button
                                        onClick={() =>
                                            setUpCancel(
                                                reservation.id,
                                                reservation.startDate
                                            )
                                        }
                                        className='inline-block px-10 py-1 text-sm t-josefin bg-red-500 text-white transition hover:bg-white hover:text-black hover:border hover:border-black'
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
