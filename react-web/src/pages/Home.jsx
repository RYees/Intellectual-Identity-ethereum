import React from 'react';
import banner from "../assets/pexel.jpg";
import eth from "../assets/shubham.jpg";
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
          <h1>Secure your <italic>
            <strong>Intellectul Property</strong>    
          </italic> in the blockchain!</h1>
          <p>Prevent others from using yours' invention and decide who is allowed to produce, sell or import your invention.</p>
        </div>

        <div className='two'>
           <img src={eth} alt="ethereum image" className='imagetwo'/>
        </div>
      </div>    
    </div>
  </>
  )
}

export default Home