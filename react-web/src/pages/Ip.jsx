import React, { useState, useContext, useEffect } from "react";
import { FaHourglass} from "react-icons/fa";
import Register from '../components/Ipregister.jsx';
import Getips from '../components/Getips.jsx';
import '../css/App.css';
import { TransactionContext } from '../context/TransactionContext';

const Ip = () => {
  const { data, getAllIps, countAccepted, accept, countRejected, reject, countPend, pend } = useContext(TransactionContext);
  useEffect(()=>{
  //  getAllIps();
    countAccepted();
    countRejected();
    countPend();
  });
  
  return (
    <>
    <div className='mb-96 mt-20'>
      <div className='flex justify-between'>
      <p className='mx-4 py-4 text-3xl cursor-pointer'>Intellectual Properties</p>
      {/* <button className='mt-8 mx-10 bg-gray-300 py-4 cursor-pointer border-none hover:brightness-105'><FaPlus className='inline'/> Register IPs</button> */}
      <Register/>
      </div>

      <div className='flex gap-14 mx-5 mb-10 my-5'>
        <div className='box hover:brightness-105 transition duration-150 ease-out hover:ease-in border border-10 border-gray-300 rounded-lg bg-white w-56 p-2'>
         <h3 className="text-sm flex justify-between"> Total Ips <FaHourglass className="text-cyan-700 text-3xl"/></h3> 
         <br></br><span className='text-bold text-black text-4xl'>{pend + accept + reject}</span></div>
        <div className='box hover:brightness-105 transition duration-150 ease-out hover:ease-in border border-10 border-gray-300 rounded-lg bg-white w-56 p-2'>
        <h3 className="text-sm flex justify-between"> Total Pendings <FaHourglass className="text-cyan-700 text-3xl"/></h3>
         <br></br><span className='text-bold text-black text-4xl'>{pend}</span></div>
        <div className='box hover:brightness-105 transition duration-150 ease-out hover:ease-in border border-10 border-gray-300 rounded-lg bg-white w-56 p-2'>
        <h3 className="text-sm flex justify-between"> Total Approves<FaHourglass className="text-cyan-700 text-3xl"/></h3> 
         <br></br><span className='text-bold text-black text-4xl'>{accept}</span></div>
        <div className='box hover:brightness-105 transition duration-150 ease-out hover:ease-in border border-10 border-gray-300 rounded-lg bg-white w-56 p-2'>
        <h3 className=" flex justify-between text-sm"> Total Rejects <FaHourglass className="text-cyan-700 text-3xl"/></h3>
         <br></br><span className='text-bold text-black text-4xl'>{reject}</span></div>
      </div>

      {/* <div className='mb-10 mt-20'>
        <input type="text" placeholder='Search...' className="alinput px-3 py-3 rounded-full"/>
        <FaSearch size={40}/>
      </div> */}
    <div>
      {/* <div>
      {Object.keys(data).map((key) => {
         return (
           <div className="flex" key={key}>
              <h1 className="flex">{key}</h1>
              {data[key]['member'].map((dataItem) => {
                return (
                 <span key={dataItem.id}>{dataItem}</span>
                )
               })}
           </div>
         )
       })}
     </div>
    */}
    <button onClick={getAllIps}>click</button>
    <table className='table table-striped'>
        <thead>
          <tr className='text-white'>
            <th>ID</th>
            <th> Employee Public Key </th>
            <th> Detail </th>
          </tr>
        </thead>
        <tbody className='bg-gray-100'>

         {data.map((item,index) => ( 
            <tr key={index}>
              <td className="">{index}</td>
              {/* <td>{item}</td>  */}
              {data[index]['member'].map((i) => {
                return (<td>{i}</td>)
              })}
                           
      
            </tr>
         ))
         }
         
        </tbody>
      </table> 
    </div>
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