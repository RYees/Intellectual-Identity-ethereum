import React, { useState, useContext, useEffect } from "react";
import { FaHourglass } from "react-icons/fa";
import '../../css/App.css';
import { TransactionContext } from '../../context/TransactionContext';
import {
  Iptable,
  Loader,
}
from "../../components/index";

const Ip = () => {
  const { isLoading,textmessage, datas, nfts, getAllIps, connectWallet, countAccepted, accept, countRejected, reject, countPend, pend } = useContext(TransactionContext);
  const[query, setQuery] = useState("");
  //const [isLoading, setLoading] = useState(false);
  const keys = ["IPname", "fullname", "country", "addressplace"]
  console.log("mydad",nfts)

  const search = (data) => {
    return data.filter((item) => 
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  }

  useEffect(()=>{
    getAllIps();
    countAccepted();
    countRejected();
    countPend();
  },[]);

  return (
    <>
    <div className='mb-96 mt-20'>
      {textmessage?
      <div className="bg-gray-800 static z-10 float-right px-10 py-3">
        <div>
          <p className="text-gray-100">{textmessage}</p>
        </div>
      </div>:null}

      <div className='flex justify-between'>
      <p className='mx-4 py-4 text-3xl cursor-pointer'>Intellectual Properties</p>  
       <button
            data-testid="wallet"
            onClick={connectWallet}
            className='bg-gradient-to-r from-black via-gray-500 to-black transition duration-150 ease-out hover:ease-in
            p-4 px-6 rounded-full text-white text-xl mr-2 mt-5 mb-10 hover:brightness-125 transition duration-150 ease-in-out shadow-lg'>
            Connect Wallet
        </button>
      </div>

     
      <div className='flex flex-wrap gap-14 mx-5 ml-12 mb-10 my-5'>
        <div className='box hover:brightness-105 transition duration-150 ease-out hover:ease-in border border-10 border-gray-300 rounded-lg bg-white w-56 p-2'>
         <h3 className="text-sm text-gray-600 flex justify-between"> Total Ips <FaHourglass className="text-black text-3xl"/></h3> 
         <br></br><span className='text-bold text-black text-4xl'>{pend + accept + reject}</span></div>
        <div className='box hover:brightness-105 transition duration-150 ease-out hover:ease-in border border-10 border-gray-300 rounded-lg bg-white w-56 p-2'>
        <h3 className="text-sm text-gray-600 flex justify-between"> Total Pendings <FaHourglass className="text-black text-3xl"/></h3>
         <br></br><span className='text-bold text-black text-4xl'>{pend}</span></div>
        <div className='box hover:brightness-105 transition duration-150 ease-out hover:ease-in border border-10 border-gray-300 rounded-lg bg-white w-56 p-2'>
        <h3 className="text-sm text-gray-600 flex justify-between"> Total Approves<FaHourglass className="text-black text-3xl"/></h3> 
         <br></br><span className='text-bold text-black text-4xl'>{accept}</span></div>
        <div className='box hover:brightness-105 transition duration-150 ease-out hover:ease-in border border-10 border-gray-300 rounded-lg bg-white w-56 p-2'>
        <h3 className="text-sm text-gray-600 flex justify-between text-sm"> Total Rejects <FaHourglass className="text-black text-3xl"/></h3>
         <br></br><span className='text-bold text-black text-4xl'>{reject}</span></div>
      </div>
    
    <div>
      <input 
        type="text"
        placeholder="Search..."
        className="look border-solid border-1 mb-12 mt-10 border-gray-300 mx-96 py-3 px-4"
        onChange={(e) => setQuery(e.target.value)}
      />
     </div>

     {/* <Iptable className="fades" data={nfts}/> */}
     {isLoading ? <Loader/> : <Iptable className="fades"/>}
    <div className='flex'>    
        {/* <Getips/> */}
        {/* <Iptable className="fades"/> */}
    </div>
  </div>
  </>
  )
}

export default Ip