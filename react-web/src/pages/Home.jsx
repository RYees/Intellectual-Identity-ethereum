import React from 'react';
import banner from "../assets/pexel.jpg";
import eth from "../assets/eth.png";
import copy from "../assets/copyright2.png";
import check from "../assets/check.png";

import img1 from "../assets/regular.jpg";
import img2 from "../assets/miladfak.jpg";
import img3 from "../assets/guyeth.jpg";
import '../css/App.css';

const Home = () => {
  return (
    <>
    <div className=''>
      <div>
        <img src={banner} alt="home-image" className='banner'/>
        <div className='overlay'></div>
      </div>
      
      <div className='homecontain'>
        <div className='first'>
          <h1>Register your
            <strong className='italic text-gray-900'> Intellectual Property</strong>    
          </h1>
          <p className='mt-4 text-gray-200 m-2'>Prevent others from using yours' invention and decide who is allowed to produce, sell or import your invention. Use NFT tokens of blockchain technology to prove your ownership of any piece of content now!!!</p>

          <p></p>
        </div>

        <div className='second'>
           <img src={eth} alt="ethereum image" className='imagetwo'/>
        </div>
      </div>   

      <div className='ball1'></div> 
      <div className='ball2'></div> 
      <div className='ball3'></div> 
      <div className='ball4'></div> 
      <div className='ball5'></div> 
      <div className='ball6'></div> 
      <div className='ball7'></div> 
      <div className='ball8'></div> 
    </div>
    
    <div className='text-center m-10'>
      <h1>Intellectual property on the blockchain</h1>
    </div>
    
    <div className='flex justify-between mx-36 mb-20 gap-5'>
      <div className='bg-white w-96 h-60 shadow-lg shadow-gray-500/50'>
      <img src={img1} alt="" className='cop'/>
      </div>
      <div className='bg-white w-96 h-60 shadow-xl shadow-gray-500/50'>
      <img src={img2} alt="" className='cop'/>
      </div>
      <div className='bg-white w-96 h-60 shadow-lg shadow-gray-500/50'>
      <img src={img3} alt="" className='cop'/>
      </div>
    </div>

    <div className='mb-20'>
      <img src={copy} alt="" className='copy'/>
    </div>

    <div className='text-center content p-20 bg-white'>
      <h1 className='text-center text-4xl mb-5'>Register your intellectual property</h1>
      <p className='text-center text-2xl mb-5 '>Get your IP approval!</p>
      <div className='text-center'>
      <img src={check} alt="" className='chec w-36 h-16'/>
      <button className='bg-gray-300 py-4 px-8 mt-5'>Register</button>
      </div>
    </div>

    
  </>
  )
}

export default Home