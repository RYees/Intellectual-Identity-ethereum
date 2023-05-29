import { useLocation, useParams, useNavigate } from 'react-router-dom';
import React,{useState, useContext, useEffect} from 'react';
import { TransactionContext } from '../../context/TransactionContext';
import { MyNft, ShortenAddress } from "../index";

export default function Profile () {
    const {connectWallet, mydata, currentAccount, getNFTData, message } = useContext(TransactionContext);
    // console.log("plans with a friend", mydata)
    
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/ips`; 
        navigate(path);
        navigate(0);
    }

    const {tokenId} = useParams();
    // const tokenId = params.tokenId;
    useEffect(()=>{
       getNFTData(tokenId); 
    }); 

    return (
        <>
        <div className='flex justify-between mt-24 mb-10'>
            <div>
                {/* <div> */}
                    <a className="arrow mb-4 bg-gradient-to-r from-black via-gray-300" 
                        onClick={routeChange}>
                        Back
                    </a>
                {/* </div> */}
            </div>
            <div>
                <button
                    data-testid="wallet"
                    onClick={connectWallet}
                    className='bg-gradient-to-r from-black via-gray-500 to-black transition duration-150 ease-out hover:ease-in
                    p-4 px-6 rounded-full text-white text-xl hover:brightness-125 transition duration-150 ease-in-out shadow-lg'>
                    Connect Wallet
                </button>

                <div className='bg-white'>
                    <p className='mr-10 text-gray-400'>
                    don't forget to connect to your wallet</p>
                    <small>{ShortenAddress(currentAccount)}</small>
                </div>
            </div>
        </div>       

        <div className="profileClass" style={{"min-height":"100vh"}}>
            <div className="profileClass">
            <div className="flex flex-row justify-left ml-2 -mt-8 md:text-2xl text-black">
                    <div className='flex'>
                        <h2 className="text-gray-400 text-sm mr-1">No. of NFTs</h2>
                        <p>{mydata.length}</p> 
                    </div>            
            </div>
            
            <div className="flex flex-col text-center items-center mt-11 text-white">
                <h2 className="font-bold">Your NFTs</h2>
                <div className="flex justify-center flex-wrap max-w-screen-xl">
                    {mydata.map((value, index) => {
                    return <MyNft data={value} key={index}></MyNft>;
                    })}
                </div>
                <div className="mt-10 text-xl">
                    {mydata.length == 0 ? "Oops, No NFT data to display (Are you logged in?)":""}
                </div>
            </div>
            </div>
        </div>
     </>
    )
};