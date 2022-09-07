import React from 'react';
import { FaPlus, FaCheck } from "react-icons/fa";
import '../css/App.css';
const User = () => {
  return (
    <div className='mb-96 mt-20'>
      <div className='flex justify-between'>
      <p className='mx-4 py-4 text-3xl'>Intellectual Properties</p>
      <button className='mt-8 mx-10 bg-gray-300 py-4 cursor-pointer border-none hover:brightness-105'><FaPlus className='inline'/> Register IPs</button>
      </div>

      <div className='flex gap-14 mx-5 mb-10 my-5'>
        <div className='box border border-10 border-gray-300 rounded-lg bg-white h-20 w-48 p-2'>Total IPs <br></br><span className='text-bold text-black text-4xl'>1000</span></div>
        <div className='box border border-10 border-gray-300 rounded-lg bg-white h-20 w-48 p-2'>Total Pendings <br></br><span className='text-bold text-black text-4xl'>500</span></div>
        <div className='box border border-10 border-gray-300 rounded-lg bg-white h-20 w-48 p-2'>Total Approves <br></br><span className='text-bold text-black text-4xl'>100</span></div>
        <div className='box border border-10 border-gray-300 rounded-lg bg-white h-20 w-48 p-2'>Total Rejects <br></br><span className='text-bold text-black text-4xl'>400</span></div>
      </div>

      <div className='mb-10 mt-20'>
        <input type="text" placeholder='Search...' className="alinput px-3 py-3 rounded-full"/>
        {/* <FaSearch size={40}/> */}
      </div>
    
    <div className='flex'>    
      <div className='bg-cyan-900 opacity-75 text-white shadow-lg w-48 h-60 px-2'>
      <h2 className='text-2xl'>Search By</h2>
        <ul className='my-5'>
          <li><FaCheck className='inline'/> IP-name</li>
          <li><FaCheck className='inline'/> Location</li>
          <li><FaCheck className='inline'/> Year</li>
          <li></li>
        </ul>
      </div>

      <table className='scrolltunnel'>
        {/* <caption className='my-10 text-3xl'>Intellectual properties</caption> */}
        <thead>
          <tr>
            <th scope="col">Band</th>
            <th scope="col">Year formed</th>
            <th scope="col">No. of Albums</th>
            <th scope="col">Most famous song</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Buzzcocks</th>
            <td>1976</td>
            <td>9</td>
            <td>Ever fallen in love</td>
          </tr>
          <tr>
            <th scope="row">The Clash</th>
            <td>1976</td>
            <td>6</td>
            <td>London Calling</td>
          </tr>

          <tr>
            <th scope="row">The Stranglers</th>
            <td>1974</td>
            <td>17</td>
            <td>No More Heroes</td>
          </tr>

          <tr>
            <th scope="row">The Stranglers</th>
            <td>1974</td>
            <td>17</td>
            <td>No More Heroes</td>
          </tr>

          <tr>
            <th scope="row">The Stranglers</th>
            <td>1974</td>
            <td>17</td>
            <td>No More Heroes</td>
          </tr>

        </tbody>
        {/* <tfoot>
          <tr>
            <th scope="row" colspan="2">Total albums</th>
            <td colspan="2">77</td>
          </tr>
        </tfoot> */}
      </table>
    </div>
  </div>
  )
}

export default User