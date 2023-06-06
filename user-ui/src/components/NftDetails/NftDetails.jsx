import React, {useEffect, useContext} from 'react'
import { TransactionContext } from '../../context/TransactionContext';
import { useState } from "react";
import { useLocation, useParams } from 'react-router-dom';

export default function NftDetails() {
const {connectWallet, mydata, getTokenDetails, mydets, currentAccount, getNFTData, message } = useContext(TransactionContext);
    const {tokenId} = useParams();
    useEffect(()=>{
        getTokenDetails(tokenId); 
    });

    return(
        <div className='mx-10 my-40' style={{"min-height":"100vh"}}>
              <div className="flex ml-20 mt-20">
                <img src={mydets.image} alt="" className="h-96" />
                <div className="text-xl ml-20 space-y-8 text-black shadow-2xl rounded-lg border-2 p-5">
                    <div>
                        FullName: <span className="text-gray-500 text-lg">{mydets.fullname}</span>
                    </div>
                    <div>
                        Country: <span className="text-gray-500 text-lg">{mydets.country}</span>
                    </div>
                    <div>
                        FullName: <span className="text-gray-500 text-lg">{mydets.street}</span>
                    </div>
                    <div>
                        IpName: <span className="text-gray-500 text-lg">{mydets.IPname}</span>
                    </div>
                    <div>
                        Description:<br></br> <p className="text-gray-500 text-lg">{mydets.description}</p> 
                    </div>
                    <div>
                        Owner: <span className="text-gray-500 text-lg">{mydets.Nftowner}</span>
                    </div>
                    <div>
                        Status: <span className="text-gray-500 text-lg">{mydets.status}</span>
                    </div>
                    <div>
                        Address: <span className="text-gray-500 text-lg">{currentAccount}</span>
                    </div>
                    <div className="text-gray-500 text-lg">
                        FullName: {mydets.timestamp}
                    </div>

                    <div>
                    {/* { currAddress == mydata.owner || currAddress == mydata.seller ?
                        <div className="text-emerald-700">You are the owner of this NFT</div>
                        :<button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded text-sm" onClick={() => buyNFT(tokenId)}>Buy this NFT</button>
                        
                    }
                     */}
                    <div className="text-green text-center mt-3">{message}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}