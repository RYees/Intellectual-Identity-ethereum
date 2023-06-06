import React,{useContext, useEffect, useState} from 'react';
import { TransactionContext } from '../../context/TransactionContext';
import { BidderContext } from '../../context/BidderContext';
import '../../css/App.css';
import { useNavigate } from "react-router-dom";
import '../../css/Style.css';
import {Bidtable, Loader} from '../../components/index';

const Bidder = () => {
  const { connectWallet, currentAccount, countbids} = useContext(TransactionContext);
  const { getBidders, bidData } = useContext(BidderContext);

  const[query, setQuery] = useState("");

  const keys = ["ownerIPname"]

  const search = (data) => {
    return data.filter((item) => 
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  }

  useEffect(()=>{
    getBidders();
    //countbidders(currentAccount);
  },[]);

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
            className='bg-gradient-to-r from-black via-gray-500 to-black transition duration-150 ease-out hover:ease-in
            p-4 px-6 rounded-full text-white text-xl mt-36 mb-10 hover:brightness-125 transition duration-150 ease-in-out shadow-lg'>
            Connect Wallet
        </button>
      </div>

      <div className='bg-white'>
         <p className='text-center text-gray-400 mb-16'>connect to your wallet, to see your IP bidders'</p>
      </div>

      <div>
         <a className="arrow mb-4 bg-gradient-to-r from-black via-gray-300" onClick={routeChange}>Back</a>
      </div>

      <div className='flex justify-around'>
      <p className='mx-4 py-4 text-4xl cursor-pointer'>Bids</p>
      <div>
        <p>Total bids:</p>
      </div>
      </div>
      
      <div>
      <input 
        type="text"
        placeholder="Search..."
        className="look border-solid border-1 mb-12 mt-10 border-gray-300 mx-96 py-3 px-4"
        onChange={(e) => setQuery(e.target.value)}
      />
     </div>
      {bidData.length == 0 ? <p className='text-center'>You have no bidders, yet</p>:null}
      {bidData.length != 0 ? <Bidtable data={search(bidData)}/> : <Loader/>}
    </>
  )
}

export default Bidder