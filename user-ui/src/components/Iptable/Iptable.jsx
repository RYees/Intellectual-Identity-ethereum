import React from 'react'
import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Iptable = ({data}) => {
  
  function vals (valk){
    const val = parseInt(valk);
    let result = epochTohumanReadble(val)
    return result;
  }
  
  const epochTohumanReadble = (timestamp) => {        
    let epoch = timestamp;
    let currentTimestamp = epoch;
    let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)
   // let time =  date.split(' ')[1];
    return date;
   // console.log('timt',time)
  //  const [hour, minute, second] = time.split(':');        
  }

  function status (statusNumber) {
    if(statusNumber === 0){
     return <div className="font-semibold">Pending</div>;
    } else if (statusNumber === 1){
      //Show();
      return <div className="text-green-800 font-semibold">Accepted</div>;
    } else if (statusNumber === 2){
     return <div className="text-red-800 font-semibold">Rejected</div>;
    }
  }

  function Show(item) {
    const c = status(item.status[item.status.length-1]);
    if(c.props.children === "Accepted"){
      return(
        <NavLink to={{ pathname:`/bidregister/${item.IPname}/${item.user}`}}  state={{item}}> 
        <button
          className='ml-2 my-2 bg-black text-gray-100 transition duration-150 ease-out hover:ease-in
          py-1 px-6 mt-5 rounded text-gray-900'>
          Bid
        </button>
      </NavLink>
      )  
    }
  }

  function Url(item) {
    const c = status(item.status[item.status.length-1]);
    if(c.props.children === "Accepted"){
      return(
        item.allIpInfoURL
      )  
    }
  }
 

  return (
    <div>
    <div>
    <NavLink to={{ pathname:`/ipregister`}}> 
       <button 
       data-testid='button-one'
       className='flex justify-end float-right mb-3 bg-black transition duration-150 ease-out hover:ease-in
       px-3 py-2 rounded text-white hover:brightness-105 transition duration-150 ease-in-out shadow-lg'>
       <FaPlus className='inline text-white mt-1 mr-1'/> Register IPs
       </button>
    </NavLink>
    </div>
    <table className='table table-striped mx-8 mt-24 shadow-lg'>
        <thead>
          <tr className=''>
            <th className='text-gray-900'>ID</th>
            <th className='text-gray-900'> Ip Name </th>
            <th className='text-gray-900'> Full Name</th>
            <th className='text-gray-900'> Country Name</th>
            <th className='text-gray-900'> Address</th>
            <th className='text-gray-900'> Status</th>
            <th className='text-gray-900'> Url</th>
            <th className='text-gray-900'> Date</th>
            <th className='text-gray-900'></th>
          </tr>
        </thead>
        <tbody className='bg-gray-100'>
          
        {data.map((item,index) => ( 
            <tr key={index}>
              <td >{index}</td>
              <td >{item.IPname}</td>    
              <td className='text-black'>{item.fullname}</td>  
              <td className='text-black'>{item.country}</td>  
              <td className='text-black'>{item.addressplace}</td>  
              <td className='text-black'>{status(item.status[item.status.length-1])}</td> 
              <td>{Url(item)}</td>   
              <td>{vals(item.timestamp['_hex'])}</td>
              <td>{Show(item)}</td>            
              </tr>
         ))
         }         
        </tbody>
      </table> 
    </div>
  )
}

export default Iptable