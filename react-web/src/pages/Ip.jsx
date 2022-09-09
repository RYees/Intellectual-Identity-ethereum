import React, { useState, useEffect, useMemo } from "react";
import { FaCheck , FaHourglass} from "react-icons/fa";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import Register from '../components/Ipregister.jsx';
import Getips from '../components/Getips.jsx';
import '../css/App.css';
import axios from "axios";
import GlobalFilter  from "../components/GlobalFilter.jsx";

const Ip = () => {
  return (
    <>
    <div className='mb-96 mt-20'>
      <div className='flex justify-between'>
      <p className='mx-4 py-4 text-3xl'>Intellectual Properties</p>
      {/* <button className='mt-8 mx-10 bg-gray-300 py-4 cursor-pointer border-none hover:brightness-105'><FaPlus className='inline'/> Register IPs</button> */}
      <Register/>
      </div>

      <div className='flex gap-14 mx-5 mb-10 my-5'>
        <div className='box border border-10 border-gray-300 rounded-lg bg-white w-56 p-2'>
         <h3 className="text-sm flex justify-between"> Total Ips <FaHourglass className="text-cyan-700 text-3xl"/></h3> 
         <br></br><span className='text-bold text-black text-4xl'>1000</span></div>
        <div className='box border border-10 border-gray-300 rounded-lg bg-white w-56 p-2'>
        <h3 className="text-sm flex justify-between"> Total Pendings <FaHourglass className="text-cyan-700 text-3xl"/></h3>
         <br></br><span className='text-bold text-black text-4xl'>500</span></div>
        <div className='box border border-10 border-gray-300 rounded-lg bg-white w-56 p-2'>
        <h3 className="text-sm flex justify-between"> Total Approves<FaHourglass className="text-cyan-700 text-3xl"/></h3> 
         <br></br><span className='text-bold text-black text-4xl'>100</span></div>
        <div className='box border border-10 border-gray-300 rounded-lg bg-white w-56 p-2'>
        <h3 className=" flex justify-between text-sm"> Total Rejects <FaHourglass className="text-cyan-700 text-3xl"/></h3>
         <br></br><span className='text-bold text-black text-4xl'>400</span></div>
      </div>

      {/* <div className='mb-10 mt-20'>
        <input type="text" placeholder='Search...' className="alinput px-3 py-3 rounded-full"/>
        <FaSearch size={40}/>
      </div> */}
    
    <div className='flex'>    
      {/* <div className='bg-cyan-900 opacity-75 text-white shadow-lg w-48 h-60 px-2'>
      <h2 className='text-2xl'>Search By</h2>
        <ul className='my-5'>
          <li><FaCheck className='inline'/> IP-name</li>
          <li><FaCheck className='inline'/> Location</li>
          <li><FaCheck className='inline'/> Year</li>
          <li></li>
        </ul>
      </div>
      */}
        <Getips/>
    </div>
  </div>
  </>
  )
}

export default Ip