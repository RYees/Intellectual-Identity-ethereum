import React,{useContext, useEffect} from 'react';
import { TransactionContext } from '../../context/TransactionContext';
import '../../css/App.css';
import { useNavigate } from "react-router-dom";
import '../../css/Style.css';

const Bidder = () => {
  const { connectWallet, currentAccount, getBidders, bidData, countbidders,countbids} = useContext(TransactionContext);
  
  useEffect(()=>{
    getBidders(currentAccount);
    countbidders(currentAccount);
  },[]);

  function vals (valk){
      const val = parseInt(valk);
      return val;
  }
  
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/ips`; 
    navigate(path);
    navigate(0);
  }

  return (
    <>
     <div className='text-center'>
        <button
            data-testid="wallet"
            onClick={connectWallet}
            className='bg-gradient-to-r from-black via-gray-300 to-black transition duration-150 ease-out hover:ease-in
            p-4 rounded-3xl text-white text-2xl mt-36 mb-10 hover:brightness-105 transition duration-150 ease-in-out shadow-lg'>
            Connect Wallet
        </button>
      </div>

      <div className='bg-white'>
         <p className='text-center mb-16'>Connect to your wallet, to see your IP bidders'</p>
      </div>

      <div>
         <a class="arrow mb-4 bg-gradient-to-r from-black via-gray-300" onClick={routeChange}>Back</a>
      </div>

      <div className='flex justify-around'>
      <p className='mx-4 py-4 text-4xl cursor-pointer'>Bids</p>
      <div>
        <p>Total bids:{countbids}</p>
      </div>
      </div>

      <div className='mx-20 mb-32'>
      <table className='table table-striped'>
        <thead>
          <tr className=''>
            <th className='text-gray-900'>ID</th>
            <th className='text-gray-900'> Ip Name </th>
            <th className='text-gray-900'> Bidder Address </th>
            <th className='text-gray-900'> value </th>
            <th className='text-gray-900'> Transfer Ownership</th>
          </tr>
        </thead>
        <tbody className='bg-gray-100'>

        {bidData.map((item,index) => ( 
            <tr key={index}>
              <td >{index}</td>
              <td >{item.ownerIPname}</td>    
              <td className='text-black'>{item.bidderAddress}</td>             
              <td>{vals(item.bidValue['_hex'])}wei</td>
              <td className='text-center'><button className='bg-black text-white py-1 px-6 rounded'>Accept</button></td>
            </tr>
         ))
         }         
        </tbody>
      </table> 
     </div>
    </>
  )
}

export default Bidder