import React from 'react'
import { Link } from 'react-router-dom';
// import '../css/Header.css';
import logo from "../../assets/I.png";

const Header = () => {
  return (
    <header 
    data-testid='header-start'
    className='header top-0 fixed z-10 flex justify-between bg-gray-100 shadow-xl opacity-75 w-full py-3 text-white px-8'
    >
      {/* <div className='flex justify-between'> */}
      <div> <img src={logo} alt="home-image" className='h-14 rounded-full'/></div>
      <nav className=''>
        <ul className='flex justify-between gap-16 mt-3 text-xl font-serif'>
          <li className=''>
            <Link className='hover:text-black text-gray-800' to="/">Home</Link>
          </li>

          <li>
            <Link className='hover:text-black text-gray-800' to="/ips">Ips</Link>
          </li>

          <li>
            <Link className='hover:text-black text-gray-800' to="/bidders">Bidders</Link>
          </li>
         {/* 
          <li>
            <Link className='hover:text-black' to="/contact">Contact Us</Link>
          </li> */}

        </ul>
      </nav>
    {/* </div> */}
    </header>
  )
}

export default Header