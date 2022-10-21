import React,{useContext, useEffect} from 'react';
import { TransactionContext } from '../../context/TransactionContext';
import '../../css/App.css';
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Bidder = (props) => {
  const { connectWallet, currentAccount, getBidders, bidData, countbidders,countbids} = useContext(TransactionContext);
  const { state } = useLocation();
  const { item } = state || {};
  const { index } = state || {};
  console.log("para value" + item  + "id" + index);

  useEffect(()=>{
    getBidders(item.user);
    countbidders(item.user);
  },[]);

  function vals (valk){
      const val = parseInt(valk);
      return val;
  }
  
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
    navigate(0);
  }

  return (
    <div className='mb-96 mt-20'>
      <div className='text-center py-10'>
        <button
        data-testid="wallet"
        onClick={connectWallet}
        className='bg-gradient-to-r from-cyan-700 via-gray-300 to-cyan-700 transition duration-150 ease-out hover:ease-in
        p-4 rounded-3xl text-gray-900 text-2xl'>
        Connect Wallet</button>
      </div>

      <div className='bg-white'>
         <p className='text-center py-20'>Connect to your wallet, to see your IP bidders'</p>
      </div>

      <div>
        <button
          className='bg-black text-white transition duration-150 ease-out hover:ease-in
          p-4  rounded-xl text-gray-900 text-xl'
          onClick={routeChange}>
          Back
        </button>
      </div>

      <div className='flex justify-between'>
      <p className='mx-4 py-4 text-3xl cursor-pointer'>Bids</p>
      <div>
        <p>Total bids:{countbids}</p>
      </div>
      </div>

      <div className='mx-20'>
      <table className='table table-striped'>
        <thead>
          <tr className='text-black'>
            <th className='text-black'>ID</th>
            <th className='text-black'> Ip Name </th>
            <th className='text-black'> Bidder Address </th>
            <th className='text-black'> value </th>
            <th className='text-black'> Transfer Ownership</th>
          </tr>
        </thead>
        <tbody className='bg-gray-100'>

        {bidData.map((item,index) => ( 
            <tr key={index}>
              <td >{index}</td>
              <td >{item.ownerIPname}</td>    
              <td className='text-black'>{item.bidderAddress}</td>             
              <td>{vals(item.bidValue['_hex'])}wei</td>
              <td className='text-center'><button className='bg-green-400 py-3 px-6 rounded'>Accept</button></td>
            </tr>
         ))
         }         
        </tbody>
      </table> 
     </div>
    </div>
  )
}

export default Bidder