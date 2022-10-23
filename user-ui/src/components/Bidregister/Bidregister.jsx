import React,{useState, useContext} from 'react';
import { FaPlus, FaTimes } from "react-icons/fa";
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

const Bidregister = (props) => {
  const { connectWallet, currentAccount,registerBidder, bidformData, handleChanges } = useContext(TransactionContext);
  const[show, setShow] = useState(false);

  const { state } = useLocation();
  const { item } = state || {};
  
  const ipname = React.useRef();
  const ipadd = React.useRef();
  const bidval = React.useRef();
  const bidadd = React.useRef();

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
      let path = `/ips`; 
      navigate(path);
      navigate(0);
  }

  const handleSubmit = (e) => {
    //const { address, ownerIPname, bidvalue, bidderaddress } = bidformData;    
    e.preventDefault();
    // 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
    // 0x8F449854A5d6aD8958D43E0266a9399E208A2cc5
    //if (!address || !ownerIPname || !bidvalue || !bidderaddress ) return;
    registerBidder(ipname.current.value, ipadd.current.value,bidval.current.value, bidadd.current.value);
  };

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
         <a class="arrow mb-4 bg-gradient-to-r from-black via-gray-300" onClick={routeChange}>Back</a>
      </div>

  <div data-testid='show'
    className='container contain-1 text-gray-600 font-serif flex justify-between'>
      <form className='bidform px-5 mx-20 mt-28 bg-white flex justify-center'>
       <div className='fields px-10'>
        <div className='mb-6 py-3 text-center text-sm text-black'><h1>Register IP Bidders'</h1></div>
          <div className=''>    
            <div className="mb-4">
            <label className='text-xl'>IP owner public address </label><br></br>
                <input className='input-box text-gray-700 border py-2 px-2 rounded' ref={ipname} type="text" name="address" value={item.user} placeholder="ip owner public address"/>
            </div>

            <div className='mb-4'>
            <label className='text-xl'>Owners' IP Name</label><br></br>
                <input className='input-box text-gray-700 border py-2 px-2 rounded' ref={ipadd} type="text" name="ownerIPname" value={item.IPname} placeholder='owner intellectual property name'/>
            </div>

            <div className='mb-4'>
            <label className='text-xl'>Bidding Value</label><br></br>
                <input className='input-box text-gray-700 border py-2 px-2 rounded' ref={bidval} type="text" name="bidvalue" placeholder='bid value'/>
            </div>

            <div className='mb-4'>
            <label className='text-xl'>Bidders' Address</label><br></br>
            <input className='input-box text-gray-700 border py-2 px-2 rounded' ref={bidadd} type="text" name="bidderaddress" placeholder='your public address'/>
            </div>

            <div className='py-3'>
              <button onClick={handleSubmit} className='mt-5 w-28 py-3 bg-black rounded text-white text-lg cursor-pointer'>Bid</button>
          </div> 
        </div>
       </div>      
      </form>  
    
      {/* <div className=''>
        <FaTimes data-testid='close' size={35} onClick={closeView} className="cursor-pointer bg-red-500 -ml-20 mt-4"/>
      </div>  */}
    </div>
    </>
  )
}

export default Bidregister