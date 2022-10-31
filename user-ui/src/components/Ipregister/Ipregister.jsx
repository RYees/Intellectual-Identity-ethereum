import React,{useContext} from 'react';
import { TransactionContext } from '../../context/TransactionContext';
import { useNavigate, useLocation } from "react-router-dom";
import '../../css/Style.css';

// const Input = ({ placeholder, name, type, value, handleChange }) => (
//   <input
//     placeholder={placeholder}
//     type={type}
//     step="0.0001"
//     value={value}
//     onChange={(e) => handleChange(e, name)}
//     className="border w-full p-3"
//   />
// );

const Ipregister = () => {
  const { connectWallet, currentAccount, formData, registerIP, handleChange } = useContext(TransactionContext);
  const address = React.useRef();
  const ipname = React.useRef();
  const fullname = React.useRef();
  const country = React.useRef();
  const street = React.useRef();
  const url = React.useRef();

  const handleSubmit = (e) => {
    //const { user, IPname, fullname, country, addressplace, symbol } = formData;    
    e.preventDefault();
    //if (!user || !IPname || !fullname || !country || !addressplace || !symbol ) return;
    //registerIP(address, ipname, fullname, country, street, url);
    registerIP('0x955cEab3AFCEb0F7dCABC5A58C8cEd14052B79dC', 'BAB', 'Abebe Ali', 'Ethiopia', 'Akaki', 'ipfs/QmVjPjkwX2kppy3HC5N8sPVqduzSQyX8HBsusmnMQhCPoy');
  };
  
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
        <p className='text-center text-gray-400 mb-16'>don't forget to connect to your wallet</p>
    </div>

    <div>
        <a class="arrow mb-6 bg-gradient-to-r from-black via-gray-300" onClick={routeChange}>Back</a>
    </div>

  <div data-testid="show"
    className='regcont contain-1 text-gray-600 font-serif flex justify-between'>
      <form className='ipform px-5 mx-20 my-16 bg-white flex'>
       <div className='fields'>
        <div className='mb-6 py-3 text-black'><h1>Register IP</h1></div>
          <div className=''>    
            <div className="mb-4">
            <label className='text-xl'>Public Address </label><br></br>
                <input className='ip-box text-gray-700 border py-2 px-2 rounded' ref={address} placeholder="your public address" type="text" name="user"/>
            </div>
            <div className='mb-4'>
            <label className='text-xl'>IP Name</label><br></br>
                <input className='ip-box text-gray-700 border py-2 px-2 rounded' ref={ipname} type="text" name="IPname" placeholder='your intellectual property name'/>
            </div>
            <div className='mb-4'>
            <label className='text-xl'>Full Name</label><br></br>
                <input className='ip-box text-gray-700 border py-2 px-2 rounded' ref={fullname} type="text" name="fullname" placeholder='your full name'/>
            </div>
            <div className='mb-4'>
            <label className='text-xl'>Country Name</label><br></br>
                <input className='ip-box text-gray-700 border py-2 px-2 rounded' ref={country} type="text" name="country" placeholder='your country name'/>
            </div>
           
        </div>
       </div> 
       <div className='fields second-box mt-28 px-4 ml-6'>
            <div className='mb-4 second-lab'>
                <label className='text-xl'>Street Name</label><br></br>
                <input className='ip-box text-gray-700 border py-2 px-2 rounded' ref={street} type="text" name="addressplace" placeholder='your street name'/>
            </div>

            <div className='mb-4 second-lab'>
                <label className='text-xl'>Details Ipfs link</label><br></br>
                <input className='ip-box text-gray-700 border py-2 px-2 rounded' ref={url} type="text" name="symbol" placeholder='your ipfs logo link'/>
            </div>

            <div className='py-3 second-lab'>
                <button onClick={handleSubmit} className='mt-5 w-28 py-3 bg-black rounded text-white text-lg cursor-pointer'>Register</button>
            </div>
        </div>        
      </form>
    </div>
    </>
  )
}

export default Ipregister