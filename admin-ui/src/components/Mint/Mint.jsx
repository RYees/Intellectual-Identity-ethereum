import React,{useContext, useEffect} from 'react';
import { TransactionContext } from '../../context/TransactionContext';
import '../../css/App.css';
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="border w-full p-3"
  />
);

const Mint = (props) => {
  const { connectWallet, mintNft } = useContext(TransactionContext);
  const { state } = useLocation();
  const { item } = state || {};
  const { index } = state || {};
  // console.log("para value" + item  + "id" + index);
  const id = React.useRef();
  const address = React.useRef();
  const url = React.useRef();

  // useEffect(()=>{
  // },[]);
  
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
    navigate(0);
  }

  const handleSubmit = (e) => {
    // const {id, address, url } = mintformData;    
    e.preventDefault();
    // if (!id || !address || !url ) return;
    mintNft(id, address, url);
  };

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
         <p className='text-center py-20'>Connect to your wallet'</p>
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
        <p>Mint Nft for Approved Ips</p>
      </div>
      </div>

    <div data-testid='show'
      className='text-gray-600 font-serif flex justify-between'>
      <form className='px-5 mx-20 my-16 bg-white'>
       <div className='cont-one'>
        <div className='mb-6 py-3'><h1>Mint Nft'</h1></div>
          <div className=''>    
            <div className="mb-4">
            <label className='text-xl'>IP id </label><br></br>
                <input  type="text" name="id" ref={id} value={index} placeholder="IP id"/>
            </div>
            <div className='mb-4'>
            <label className='text-xl'>Approved Address</label><br></br>
                <input type="text" name="address" ref={address} value={item.user} placeholder='approved address'/>
            </div>
            <div className='mb-4'>
            <label className='text-xl'>Ip data url</label><br></br>
                <input type="text" name="url" ref={url} value={item.allIpInfoURL} placeholder='token url'/>
            </div>
            
            <div className='py-3'>
              <button onClick={handleSubmit} className='w-32  py-4 bg-gray-300 cursor-pointer'>Mint</button>
            </div>
           
        </div>
       </div>    
      </form>  
     </div>
    
   </div>
  )
}

export default Mint