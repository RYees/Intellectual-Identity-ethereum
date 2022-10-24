import React from 'react'
import '../../css/Contact.css';

const Contact = () => {
  return (
    <div className='form shadow-2xl'>
      <form className='px-12'>
      <div className='mb-6 py-3'><h1>Contact Us</h1></div>
      <div className='text-gray-600 font-serif'>    
        <div className="mb-4">
         <label className='text-xl'>Full Name </label><br></br>
            <input placeholder="full name" type="text" className='inp border w-full p-3'/>
        </div>
        <div className='mb-4'>
        <label className='text-xl'>Email</label><br></br>
            <input type="email" placeholder='email' className='inp border w-full p-3'/>
        </div>
        <div className='mb-4'>
        <label className='text-xl'>Phone</label><br></br>
            <input type="text" placeholder='phone' className='inp border w-full p-3'/>
        </div>
        <div className=''>
        <label className='text-xl'>Message</label>
            <textarea type="text" placeholder='write here...' className='inp p-3 border w-full'/>
        </div>
        <div className='py-3'>
             <button className='w-32 bg-black rounded py-4 text-white text-xl cursor-pointer'>Submit</button>
        </div>
      </div> 
      </form>
    </div>
  )
}

export default Contact