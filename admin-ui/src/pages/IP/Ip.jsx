import React, { useState, useContext, useEffect } from "react";
import { FaHourglass} from "react-icons/fa";
// import Getips from '../components/Getips.jsx';
import { useNavigate, NavLink } from "react-router-dom";
import '../../css/App.css';
import { TransactionContext } from '../../context/TransactionContext';
import Status from '../../components/Status/Status.jsx';

const Ip = () => {
  const { connectWallet, datas, getAllIps,changeStatus, countAccepted, accept, countRejected, reject, countPend, pend } = useContext(TransactionContext);
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

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `bidders`; 
    navigate(path);
  }

  return (
    <>
    <div className='mb-96 mt-20'>
      <div className='flex justify-between'>
      <p className='mx-4 py-4 text-3xl cursor-pointer'>Intellectual Properties</p>
      <button
            onClick={connectWallet}
            data-testid='button-one'
            className='bg-black text-white transition duration-150 ease-out hover:ease-in
            p-4 mt-5 rounded-3xl text-gray-900 text-xl'>
            Connect Wallet
          </button>
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
              {/* <td className='text-center'><Status index={index}/></td> */}
              <td className='text-center'>
              <NavLink to={{ pathname:`/status/${index}/${item.user}`}}  state={{item,index}}> 
                <button
                  className='bg-black text-white transition duration-150 ease-out hover:ease-in
                  p-2 py-2 mt-5 rounded text-gray-900'>
                  Status
                </button>
              </NavLink>
              </td>

               <td className='text-center'>
              <NavLink to={{ pathname:`/mint/${index}/${item.user}`}}  state={{item,index}}> 
                <button
                  className='bg-black text-white transition duration-150 ease-out hover:ease-in
                  p-2 py-2 mt-5 rounded text-gray-900'>
                  Mint
                </button>
              </NavLink>
              </td>
              <td className='text-center'>
              <NavLink to={{ pathname:`/bidders/${index}/${item.user}`}}  state={{item}}> 
                <button
                  className='bg-black text-white transition duration-150 ease-out hover:ease-in
                  p-2 py-2 mt-5 rounded text-gray-900'>
                  Bidders
                </button>
              </NavLink>
              </td>
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