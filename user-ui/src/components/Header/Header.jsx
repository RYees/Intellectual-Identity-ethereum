import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import {CgProfile} from 'react-icons/cg';
// import '../css/Header.css';
import {logo} from "../../assets/index";

const Header = () => {
  const [show, setShow] = useState(false);
  function view() {
      setShow(!show);
  }
  return (
    <header 
    data-testid='header-start'
    className='header top-0 fixed z-10 flex justify-between bg-gray-100 shadow-xl opacity-75 w-full py-3 text-white px-8'
    >
      {/* <div className='flex justify-between'> */}
      <div><Link to="/"><img src={logo} alt="home-image" className='cursor-pointer h-14 rounded-full'/></Link> </div>
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
         
          <li>
               <CgProfile size={37} 
               onClick={view}
               className="text-black hover:text-gray-600 transition duration-5"        
               />

              {show ? <ul className='-ml-32'>
              <li className='hover:brightness-125 text-center text-lg bg-gray-600 px-10 cursor-pointer py-1 mb-1'><Link to="/mynfts">My Nft</Link></li>
              <li className='hover:brightness-125 text-center text-lg bg-gray-600 px-10 cursor-pointer py-1'><Link to="/mybidding">My Bids</Link></li>
            </ul> : null}
          </li>

        </ul>
      </nav>
    {/* </div> */}
    </header>
  )
}

export default Header