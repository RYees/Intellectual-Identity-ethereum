import React from 'react';
import banner from "../assets/pexel.jpg";
import eth from "../assets/eth.png";
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
            <strong className='italic text-gray-900'> Intellectul Property</strong>    
          </h1>
          <p className='mt-4 text-gray-200'>Prevent others from using yours' invention and decide who is allowed to produce, sell or import your invention. Use NFT tokens of blockchain technology to prove your ownership of any piece of content now!!!</p>

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

    <div className='content'>
      <p>
      NFT tokens of blockchain technology functionality also allow users to prove their ownership of any piece of content, which is not possible with traditional IP rights tools like trademarks and copyrights.
      </p>
    </div>
  </>
  )
}

export default Home