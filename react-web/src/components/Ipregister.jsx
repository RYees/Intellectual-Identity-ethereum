import React,{useState} from 'react';
import { FaPlus, FaTimes } from "react-icons/fa";

const Ipregister = () => {
  const[show, setShow] = useState(false);
  function changeView() {
    setShow(true);
  }

  return (
    <>
    <div>
       <button onClick={changeView} className='mt-8 mx-10 bg-gray-300 py-4 cursor-pointer border-none hover:brightness-105'><FaPlus className='inline'/> Register IPs</button>
    </div>


   <div className='regis bg-white flex justify-between absolute z-10 text-gray-600 font-serif'>
       <form className='regform px-5 mx-20 my-16 bg-white flex'>
       <div className='cont-one'>
        <div className='mb-6 py-3'><h1>Register IP</h1></div>
          <div className=''>    
            <div className="mb-4">
            <label className='text-xl'>Full Name </label><br></br>
                <input placeholder="your full name" type="text" className='border w-full p-3'/>
            </div>
            <div className='mb-4'>
            <label className='text-xl'>IP Name</label><br></br>
                <input type="text" placeholder='your intellectual property name' className='border w-full p-3'/>
            </div>
            <div className='mb-4'>
            <label className='text-xl'>Country Name</label><br></br>
                <input type="text" placeholder='your location' className='border w-full p-3'/>
            </div>
            <div className='mb-4'>
            <label className='text-xl'>Street Name</label><br></br>
                <input type="text" placeholder='your street' className='border w-full p-3'/>
            </div>
           
        </div>
       </div> 
         {/* <div className='h-full w-1 bg-gray-300'></div> */}

        <div className='cont-two mt-28 px-4 ml-6'>
            <div className='mb-4'>
                <label className='text-xl'>Symbol Ipfs Link</label><br></br>
                <input type="text" placeholder='phone' className='border w-full p-3'/>
            </div>

            <div className='mb-4'>
                <label className='text-xl'>Public Address</label><br></br>
                <input type="text" placeholder='your public address' className='border w-full p-3'/>
            </div>

            <div className='py-3'>
                <button className='w-32  py-4 bg-gray-300 cursor-pointer'>Submit</button>
            </div>
        </div>        
      </form>
      
      <div>
        <FaTimes size={35} onClick={!show} className="cursor-pointer bg-red-500 -ml-20 mt-4"/>
      </div>
    </div>
    </>
  )
}

export default Ipregister