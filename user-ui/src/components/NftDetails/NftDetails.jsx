import React, {useEffect, useContext} from 'react'
import { TransactionContext } from '../../context/TransactionContext';
import { useState } from "react";
import { useLocation, useParams } from 'react-router-dom';

export default function NftDetails(props) {
const {connectWallet, mydata, currentAccount, getNFTData, message } = useContext(TransactionContext);
    const {tokenId} = useParams();
    console.log("chicke", props)
    console.log("exper", mydata)
    useEffect(()=>{
        getNFTData(tokenId); 
    });

    return(
        <div style={{"min-height":"100vh"}}>
              <div className="flex ml-20 mt-20">
                <img src={mydata.image} alt="" className="w-2/5" />
                <div className="text-xl ml-20 space-y-8 text-black shadow-2xl rounded-lg border-2 p-5">
                    <div>
                        Name: {mydata.IPname}
                    </div>
                    <div>
                        Description: {mydata.description}
                    </div>
                    <div>
                        Owner: <span className="text-sm">{mydata.owner}</span>
                    </div>
                    <div>
                        Seller: <span className="text-sm">{mydata.Nftowner}</span>
                    </div>~
                    <div>
                        currAddress: <span className="text-sm">{currentAccount}</span>
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