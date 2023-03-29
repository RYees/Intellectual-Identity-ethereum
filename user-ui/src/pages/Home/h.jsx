import React,{useContext} from 'react';
//import { TransactionContext } from '../../context/TransactionContext';
//import { NavLink } from "react-router-dom";
import '../../css/App.css';
import {Contact} from "../index"
import {
  eth,
  copyright2,
  check,
  guerlia,
  regular,
  miladfak,
  guyeth,
  nenad} 
from "../../assets/index";

const Home = () => {
 // const { connectWallet } = useContext(TransactionContext);
  return (
    <>
    <div className=''>
      <div>
        {/* <img src={banner} alt="home-image" className='banner'/> */}
        <div className='overlay'></div>
      </div>
      
      <div className='homecontain' data-testid='section-one'>
        <div className='first'>
          <h1 className='italic text-white md:text-sm'>
            <strong className='italic text-white md:text-sm'>Mark your business name and logo for life</strong>    
          </h1>
          <p className='mt-4 text-white m-2 md:text-sm'>Prevent others from using yours' invention and decide who is allowed to produce, sell or import your invention.</p>
          <button
            //onClick={connectWallet}
            data-testid='button-one'
            className='btn-one bg-gradient-to-r from-black via-gray-500 to-black 
            transition duration-150 ease-out hover:ease-in p-4 px-6 rounded-full 
            cursor-pointer text-white text-xl mr-2 mt-2 cursor-pointer mb-10
            hover:brightness-125 transition duration-150 ease-in-out shadow-lg'>
            Connect Wallet
          </button>
        </div>
     
        {/* <div className='second'>
           <img src={eth} alt="ethereum" className='imagetwo'/>
        </div> */}
      </div>   
    <div className='container'>
      <div className='ball1'></div> 
      <div className='ball2'></div> 
      <div className='ball3'></div> 
      <div className='ball4'></div> 
      <div className='ball5'></div> 
      <div className='ball6'></div> 
      <div className='ball7'></div> 
      <div className='ball8'></div> 
    </div>
    </div>
    
    <div className='sect-one absolute '>
      <div className='text-center my-64 mx-64'>
        <h1 className='text-center  text-5xl font-serif'>Intellectual property management on the blockchain</h1>
      </div>
      
      <div className='phot flex justify-between -my-44 mx-10 mb-20 gap-5'>
        <div className='bg-white w-96 h-60 shadow-lg shadow-gray-500/50'>
        <img src={regular} alt="" className='cop'/>
        </div>
        <div className='bg-white w-96 h-60 shadow-xl shadow-gray-500/50'>
        <img src={miladfak} alt="" className='cop'/>
        </div>
        <div className='bg-white w-96 h-60 shadow-lg shadow-gray-500/50'>
        <img src={guyeth} alt="" className='cop'/>
        </div>
      </div>
    </div>

    <div className=''>
      <img src={copyright2} alt="" className='copy'/>
    </div>

    <div className='text-center content p-20 bg-gray-100'>
      <h1 className='text-center text-4xl mb-5'>Register your intellectual property</h1>
      <p className='text-center text-2xl mb-5'>Get your IP approval!</p>
      <div className='text-center'>
      <img src={check} alt="" className='chec w-36 h-16'/>
      {/* <NavLink to={{ pathname:`/ipregister`}}> 
       <button 
        data-testid='button-one'
        className='mb-3 mt-5 -ml-12 bg-black transition duration-150 ease-out hover:ease-in
        py-4 px-8 rounded text-white text-xl hover:brightness-105 transition duration-150 ease-in-out shadow-lg'>
        Register
      </button>
      </NavLink> */}
      </div>
    </div>

    <div className='flex flex-wrap justify-center my-28'>
       <img src={guerlia} alt="" className='h-96 w-96 border rounded-lg shadow-lg shadow-gray-500/50'/>
       <img src={miladfak} alt="" className='secimg h-96 w-96 ml-2 mt-7 phot2 border rounded-lg shadow-xl shadow-gray-500/50'/>
       <img src={nenad} alt="" className='thirimg h-96 w-96 ml-2 border rounded-lg shadow-lg shadow-gray-500/50'/>
      {/* <div className='absolute bg-gray-900 w-full opacity-25 h-96 w-96'></div> */}
    </div>

    <div className='mb-24'>
      <img src={copyright2} alt="" className='copy'/>
    </div>
    
    <div  className='bg-gray-100'>
     <Contact/>   
    </div>
  </>
  )
}

export default Home