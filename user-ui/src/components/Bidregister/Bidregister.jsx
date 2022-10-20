import React,{useState, useContext} from 'react';
import { FaPlus, FaTimes } from "react-icons/fa";
import { TransactionContext } from '../../context/TransactionContext';

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
const Bidregister = () => {
  const { connectWallet, currentAccount,registerBidder, bidformData, handleChanges } = useContext(TransactionContext);
  const[show, setShow] = useState(false);
  
  function changeView() {
    setShow(true);
  }

  function closeView(e) {
    if(e){
      setShow(!show);
    }
  }

  const handleSubmit = (e) => {
    const { address, ownerIPname, bidvalue, bidderaddress } = bidformData;
    
    e.preventDefault();
    // 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
    // 0x8F449854A5d6aD8958D43E0266a9399E208A2cc5
    if (!address || !ownerIPname || !bidvalue || !bidderaddress ) return;

    registerBidder();
  };

  return (
    <>
    <div>
       <button onClick={changeView} 
       className='bg-gradient-to-r from-cyan-700 via-gray-300 to-cyan-700 transition
        duration-150 ease-out hover:ease-in mt-4 mb-8 mx-10
        text-xl px-5 py-4 rounded shadow-lg cursor-pointer border-none 
        hover:brightness-105 text-gray-900'>
       <FaPlus className='inline text-white'/> Register IP Bidders
       </button>
    </div>

   {show ? ( 
   <div className='regis absolute z-10 text-gray-600 font-serif flex justify-between'>
      <form className='regform px-5 mx-20 my-16 bg-white flex'>
       <div className='cont-one'>
        <div className='mb-6 py-3'><h1>Register IP Bidders'</h1></div>
          <div className=''>    
            <div className="mb-4">
            <label className='text-xl'>IP owner public address </label><br></br>
                <Input  type="text" name="address" placeholder="ip owner public address" handleChange={handleChanges}/>
            </div>
            <div className='mb-4'>
            <label className='text-xl'>Owners' IP Name</label><br></br>
                <Input type="text" name="ownerIPname" placeholder='owner intellectual property name' handleChange={handleChanges}/>
            </div>
            <div className='mb-4'>
            <label className='text-xl'>Bidding Value</label><br></br>
                <Input type="text" name="bidvalue" placeholder='bid value' handleChange={handleChanges}/>
            </div>
            <div className='mb-4'>
            <label className='text-xl'>Bidders' Address</label><br></br>
                <Input type="text" name="bidderaddress" placeholder='your public address' handleChange={handleChanges}/>
            </div>
           
        </div>
       </div> 
         {/* <div className='h-full w-1 bg-gray-300'></div> */}

         <div className='cont-two mt-28 px-4 ml-6'>
           {/* <div className='mb-4'>
                <label className='text-xl'>Street Name</label><br></br>
                <Input type="text" name="addressplace" placeholder='your street name' handleChange={handleChange}/>
            </div>

            <div className='mb-4'>
                <label className='text-xl'>Logo link</label><br></br>
                <Input type="text" name="symbol" placeholder='your ipfs logo link' handleChange={handleChange}/>
            </div>
          */}
          <div className='py-3'>
              <button onClick={handleSubmit} className='w-32  py-4 bg-gray-300 cursor-pointer'>Submit</button>
          </div>
        </div>         
      </form>  
    
      <div className=''>
        <FaTimes size={35} onClick={closeView} className="cursor-pointer bg-red-500 -ml-20 mt-4"/>
      </div> 
    </div>):( null)}
    </>
  )
}

export default Bidregister