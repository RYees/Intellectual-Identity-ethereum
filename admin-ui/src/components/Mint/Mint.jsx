import React,{useContext, useEffect} from 'react';
import { TransactionContext } from '../../context/TransactionContext';
import '../../css/App.css';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import '../../css/Style.css';

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
    mintNft(id.current.value , address.current.value , url.current.value);
    // mintNft(1, '0xdD870fA1b7C4700F2BD7f44238821C26f7392148', 'https://newcomer.com');
  };

  return (
    <>
      <div className='text-center'>
        <button
            data-testid="wallet"
            onClick={connectWallet}
            className='bg-gradient-to-r from-black via-gray-500 to-black transition duration-150 ease-out hover:ease-in
            p-4 px-6 rounded-full text-white text-xl mt-36 mb-10 hover:brightness-125 transition duration-160 ease-in-out shadow-lg'>
            Connect Wallet
        </button>
      </div>

      <div className='bg-white'>
         <p className='text-center text-gray-400 mb-16'>don't forget to connect to your wallet</p>
      </div>

      <div>
         <a class="arrow mb-4 bg-gradient-to-r from-black via-gray-300" onClick={routeChange}>Back</a>
      </div>

      <div className='flex justify-end'>
      <p className='mx-4 py-4 text-3xl cursor-pointer'>Mint Nft for Approved Ips</p>
      </div>

    <div data-testid='show'
      className='container contain-1 text-gray-600 font-serif flex justify-between'>
      <form className='form contain-form text-black px-5 mx-20 my-16 bg-white'>
       <div className='text-center fields mx-28'>
        <div className='mb-6 py-3 text-xl'><h1>Mint Nft'</h1></div>
          <div className=''>    
            <div className="mb-4">
            <label className='text-xl'>IP id </label><br></br>
                <input className='input-box text-gray-700 border py-2 px-2 rounded' type="text" name="id" ref={id} value={index} placeholder="IP id"/>
            </div>
            <div className='mb-4'>
            <label className='text-xl'>Approved Address</label><br></br>
                <input className='input-box text-gray-700 border py-2 px-2 rounded' type="text" name="address" ref={address} value={item.user} placeholder='approved address'/>
            </div>
            <div className='mb-4'>
            <label className='text-xl'>Ip data url</label><br></br>
                <input className='input-box text-gray-700 border py-2 px-2 rounded' type="text" name="url" ref={url} value={item.allIpInfoURL} placeholder='token url'/>
            </div>
            
            <div className='py-3'>
              <button onClick={handleSubmit} className='w-32 text-white text-lg rounded py-4 bg-black cursor-pointer'>Mint</button>
            </div>
           
        </div>
       </div>    
      </form>  
     </div>
    </>
  )
}

export default Mint