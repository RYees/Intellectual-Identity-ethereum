import React from 'react'
import { FaEnvelope, FaPhone, FaFacebook, FaYoutube, FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import '../../css/App.css';

const Footer = () => {
  return (
    <div className='bg-black h-full w-full'>
    <div className='foot text-gray-700 flex justify-around'>
      <div className="py-5 text-white">
        <p 
          data-testid='footer-one'
          className="text-4xl">
            IP
        </p> 
        <p
         data-testid='footer-one-text'
         className="text-lg my-2 leading-8"
        >
          Own your intellectual property<br></br>
          with the usecase of NFTs.
        </p>
        <div className="flex justify-between mt-4">
         <FaFacebook data-testid='icons' size={30} className="inline-block"/>
         <FaYoutube data-testid='icons' size={30} className="inline-block"/>
         <FaTwitter data-testid='icons' size={30} className="inline-block"/>
        </div>
      </div>

      <div className="py-5 text-white">
        <p 
          data-testid='footer-three'
          className="text-4xl">
            Service
        </p>

        <ul className="text-lg my-2 leading-8">
        <NavLink 
          className="navbar-item"
          activeclassname="is-active"
          to="/"
      
        >
        	<li data-testid='footer-link-one' className='cursor-pointer'>Ip registration</li>
        </NavLink>

        <NavLink 
          className="navbar-item"
          activeclassname="is-active"
          to="/bidders"
      
        >
        	<li data-testid='footer-link-two'>Bidders</li>
        </NavLink>
          {/* <li data-testid='footer-link-one'>Ip registration</li>
          <li data-testid='footer-link-two'>Bidders</li> */}
        </ul>
      </div>

      <div className="py-5 text-white">
        <p 
          data-testid='footer-four'
          className="text-4xl">
          Contact
        </p>
        <p className="text-lg my-2">
          <FaPhone data-testid='icon1'
          className="inline-block mr-2"/> 
          302-103-133
        </p>
        <p 
          className="text-lg my-2">
          <FaEnvelope data-testid='icon2'
          className="inline-block mr-2"/>
          ips@gov.com
        </p>
      </div>

    </div>
    </div>
  )
}

export default Footer