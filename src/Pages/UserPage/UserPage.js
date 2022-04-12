import React, {useState} from 'react';
import Login from '../../Components/Login/Login.js';
import SignUp from '../../Components/SignUp/SignUp.js';
import Nav from '../../Components/Nav/Nav';

export default function UserPage() {
  const [toggle, setToggle] = useState(true)

  const toggleFunc = () => {
    setToggle(!toggle)
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
  }
    return (
        <div className=''>
            <Nav />
            <div className='mx-2 mt-20 border pb-4 rounded-lg overflow-hidden max-w-xl md:mx-auto'>
              <div className='flex justify-end'>
                <button onClick={toggleFunc} className={toggle? 'text-sm border px-1 py-1 t-crimson bg-gray-100' : 'text-sm border px-1 py-1 t-crimson hover:bg-gray-100'}>Se connecter</button>
                <button onClick={toggleFunc} className={!toggle? 'text-sm border px-1 py-1 t-crimson bg-gray-100' : 'text-sm border px-1 py-1 t-crimson hover:bg-gray-100'}>Inscription</button>
              </div>
              <h1 className='t-josefin t-light text-gray-900 text-lg text-center mt-4 '>Hypnos - {toggle ? 'Connexion' : 'Inscription'} </h1>
                {toggle? <Login  /> : <SignUp props={toggleFunc}/>}
            </div>
        </div>
    );
}
