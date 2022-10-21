import React from 'react'
import { Link } from 'react-router-dom';
// import '../css/Header.css';
import logo from "../../assets/I.png";

const Header = () => {
  return (
    <header 
    data-testid='header-start'
    className='header top-0 fixed z-10 flex justify-between bg-cyan-900 opacity-75 w-full py-3 text-white px-8'
    >
      
      <div><Link to="/"><img src={logo} alt="home-image" className='cursor-pointer h-14 rounded-full'/></Link> </div>
      <nav className=''>
        <ul className='flex justify-between gap-16 mt-3 text-xl font-serif'>
          {/* <li className=''>
            <Link className='hover:text-black' to="/">Home</Link>
          </li> */}

          {/* <li>
            <Link className='hover:text-black' to="/">Ips</Link>
          </li> */}

          {/* <li>
            <Link className='hover:text-black' to="/bidders">Bidders</Link>
          </li> */}

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