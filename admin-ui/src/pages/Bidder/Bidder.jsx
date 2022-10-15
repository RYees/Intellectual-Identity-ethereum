import React,{useContext, useEffect} from 'react';
import { TransactionContext } from '../../context/TransactionContext';
import '../../css/App.css'

const Bidder = () => {
  const { connectWallet, currentAccount, getBidders, bidData, countbidders,countbids} = useContext(TransactionContext);
  useEffect(()=>{
    getBidders(currentAccount);
    countbidders(currentAccount);
  });

  function vals (valk){
      const val = parseInt(valk);
      return val;
  }

  return (
    <div className='mb-96 mt-20'>
      <div className='text-center py-10'>
        <button
        onClick={connectWallet}
        className='bg-gradient-to-r from-cyan-700 via-gray-300 to-cyan-700 transition duration-150 ease-out hover:ease-in
        p-8 rounded-3xl text-gray-900 text-2xl'>
        Connect Wallet</button>
      </div>

      <div className='bg-white mb-20'>
         <p className='text-center py-20'>Connect to your wallet, to see your IP bidders'</p>
      </div>

      <div className='flex justify-between'>
      <p className='mx-4 py-4 text-3xl cursor-pointer'>Register bid</p>
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