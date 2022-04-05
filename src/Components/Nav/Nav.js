import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import logo from './hypnos_logo.png'
import cancel from './icon-cancel.png'
import hamburger from './icon-hamburger.png'

export default function Nav() {
    const [toggleNav, setToggleNav] = useState(false)

    const toggleNavFunc = () => {
        setToggleNav(!toggleNav)
    }
  return (
    <div className='fixed top-0 right-0 left-0 bg-white py-2 px-4 flex justify-between lg:px-10 xl:px-40'>
        <Link to='/' className='w-28'>
            <img src={logo} alt="Logo d'hypnos" />
        </Link>
        
        <div className='md:hidden'>
            <button onClick={toggleNavFunc}>
                <img src={toggleNav ? cancel : hamburger} className={toggleNav ? 'w-8' : ''} alt="icon for the menu"/>
            </button>
        </div>

        <nav className={toggleNav? 'fixed top-12 right-0 left-0 md:hidden': 'fixed -top-96 right-0 left-0 md:hidden'}>
            <ul className='flex flex-col bg-white'>
                <li className='block py-1 t-crimson text-center text-xl w-full border-b hover:bg-gray-200'>David</li>
                <li className='block py-1 t-crimson text-center text-xl w-full border-b hover:bg-gray-200'>Roberta</li>
                <li className='block py-1 t-crimson text-center text-xl w-full border-b hover:bg-gray-200'>Jean lui</li>
                <li className='block py-1 t-crimson text-center text-xl w-full border-b hover:bg-gray-200'>Marge</li>
            </ul>
        </nav>

        <nav className= 'md:block hidden'>
            <ul className='flex bg-white'>
                <li className='block py-1 mx-4 t-crimson text-center text-xl hover:underline hover: underline-offset-8 '>David</li>
                <li className='block py-1 mx-4 t-crimson text-center text-xl hover:underline hover:underline-offset-8'>Roberta</li>
                <li className='block py-1 mx-4 t-crimson text-center text-xl hover:underline hover:underline-offset-8'>Jean lui</li>
                <li className='block py-1 mx-4 t-crimson text-center text-xl hover:underline hover:underline-offset-8'>Marge</li>
            </ul>
        </nav>




    </div>
  )
}
