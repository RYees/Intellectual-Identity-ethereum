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
const Ipregister = () => {
  const { connectWallet, currentAccount, formData, registerIP, handleChange } = useContext(TransactionContext);
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
    const { user, IPname, fullname, country, addressplace, symbol } = formData;
    
    e.preventDefault();

    if (!user || !IPname || !fullname || !country || !addressplace || !symbol ) return;

    registerIP();
  };

  return (
    <>
    <div>
       <button onClick={changeView} 
       data-testid='button-one'
       className='bg-gradient-to-r from-cyan-700 via-gray-300 to-cyan-700 transition duration-150 ease-out hover:ease-in mt-4 mb-8 mx-10 text-white
        text-xl px-5 py-4 rounded shadow-lg cursor-pointer border-none hover:brightness-105 text-gray-900'>
       <FaPlus className='inline text-white'/> Register IPs
       </button>
    </div>

   {show ? ( 
   <div data-testid="show"
    className='regis absolute z-10 text-gray-600 font-serif flex justify-between'>
      <form className='regform px-5 mx-20 my-16 bg-white flex'>
       <div className='cont-one'>
        <div className='mb-6 py-3'><h1>Register IP</h1></div>
          <div className=''>    
            <div className="mb-4">
            <label className='text-xl'>Public Address </label><br></br>
                <Input placeholder="your public address" type="text" name="user" handleChange={handleChange}/>
            </div>
            <div className='mb-4'>
            <label className='text-xl'>IP Name</label><br></br>
                <Input type="text" name="IPname" placeholder='your intellectual property name' handleChange={handleChange}/>
            </div>
            <div className='mb-4'>
            <label className='text-xl'>Full Name</label><br></br>
                <Input type="text" name="fullname" placeholder='your full name' handleChange={handleChange}/>
            </div>
            <div className='mb-4'>
            <label className='text-xl'>Country Name</label><br></br>
                <Input type="text" name="country" placeholder='your country name' handleChange={handleChange}/>
            </div>
           
        </div>
       </div> 
         {/* <div className='h-full w-1 bg-gray-300'></div> */}

        <div className='cont-two mt-28 px-4 ml-6'>
            <div className='mb-4'>
                <label className='text-xl'>Street Name</label><br></br>
                <Input type="text" name="addressplace" placeholder='your street name' handleChange={handleChange}/>
            </div>

            <div className='mb-4'>
                <label className='text-xl'>Logo link</label><br></br>
                <Input type="text" name="symbol" placeholder='your ipfs logo link' handleChange={handleChange}/>
            </div>

            <div className='py-3'>
                <button onClick={handleSubmit} className='w-32  py-4 bg-gray-300 cursor-pointer'>Submit</button>
            </div>
        </div>        
      </form>  
    
      <div className=''>
        <FaTimes data-testid="close" size={35} onClick={closeView} className="cursor-pointer bg-red-500 -ml-20 mt-4"/>
      </div> 
    </div>):( null)}
    </>
  )
}

export default Ipregister