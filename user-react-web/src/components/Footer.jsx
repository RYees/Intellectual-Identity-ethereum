import React from 'react'
import { FaEnvelope, FaPhone, FaFacebook, FaYoutube, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='bg-gray-900 h-48 w-full'>
    <div className='text-gray-700 flex justify-around'>
      <div className="py-5 text-white">
        <p className="text-4xl">IP</p> 
        <p className="text-lg my-2 leading-8">Own your intellectual property<br></br> with the usecase of NFTs.</p>
        <div className="flex justify-between mt-4">
         <FaFacebook size={30} className="inline-block"/>
         <FaYoutube size={30} className="inline-block"/>
         <FaTwitter size={30} className="inline-block"/>
        </div>
      </div>

      <div className="py-5 text-white">
        <p className="text-4xl">Service</p>
        <ul className="text-lg my-2 leading-8">
          <li>Ip registration</li>
          <li>Bidders</li>
        </ul>
      </div>

      <div className="py-5 text-white">
        <p className="text-4xl">Contact</p>
        <p className="text-lg my-2"><FaPhone className="inline-block"/> 302-103-133</p>
        <p className="text-lg my-2"><FaEnvelope className="inline-block"/> ips@gov.com</p>
      </div>

    </div>
    </div>
  )
}

export default Footer