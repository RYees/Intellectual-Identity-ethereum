import React, { useState, useContext, useEffect } from "react";
import { FaHourglass} from "react-icons/fa";
// import Getips from '../components/Getips.jsx';
import '../../css/App.css';
import { TransactionContext } from '../../context/TransactionContext';
import ChangeStatus from '../../components/ChangeStatus/ChangeStatus.jsx';

const Ip = () => {
  const { datas, getAllIps,changeStatus, countAccepted, accept, countRejected, reject, countPend, pend } = useContext(TransactionContext);
  useEffect(()=>{
    getAllIps();
    countAccepted();
    countRejected();
    countPend();
  });
  function vals (valk){
    const val = parseInt(valk);
    let result = epochTohumanReadble(val)
    return result;
  }
  const epochTohumanReadble = (timestamp) => {        
    let epoch = timestamp;
    let currentTimestamp = epoch;
    let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)
    let time =  date.split(' ')[1];
    return date;
    // console.log('timt',time)
    //  const [hour, minute, second] = time.split(':');        
  }

  function status (statusNumber) {
     if(statusNumber === 0){
      return <div className="font-semibold">Pending</div>;
     } else if (statusNumber === 1){
      return <div className="text-green-800 font-semibold">Accepted</div>;
     } else if (statusNumber === 2){
      return <div className="text-red-800 font-semibold">Rejected</div>;
     }
  }

  return (
    <>
    <div className='mb-96 mt-20'>
      <div className='flex justify-between'>
      <p className='mx-4 py-4 text-3xl cursor-pointer'>Intellectual Properties</p>
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
    <div>
      
    {/* <button onClick={getAllIps}>click</button> */}
    <table className='table table-striped mx-8 mt-24 shadow-lg'>
        <thead>
          <tr className=''>
            <th className=''>ID</th>
            <th className=''> Ip Name </th>
            <th className=''> Full Name</th>
            <th className=''> Country Name</th>
            <th className=''> Address</th>
            <th className=''> Metadata</th>
            <th className=''> Status</th>
            <th className=''> Date</th>
            <th className=''> </th>
          </tr>
        </thead>
        <tbody className='bg-gray-100'>

        {datas.map((item,index) => ( 
            <tr key={index}>
              <td >{index}</td>
              <td >{item.IPname}</td>    
              <td className='text-black'>{item.fullname}</td>  
              <td className='text-black'>{item.country}</td>  
              <td className='text-black'>{item.addressplace}</td>  
              <td className='text-black'>{item.allIpInfoURL}</td>  
              <td className='text-black'>{status(item.status[item.status.length-1])}</td>
              <td>{vals(item.timestamp['_hex'])}</td>
              <td className='text-center'><ChangeStatus/></td>
              </tr>
         ))
         }         
        </tbody>
      </table> 
    </div>
    <div className='flex'>    
        {/* <Getips/> */}
    </div>
  </div>
  </>
  )
}

export default Ip