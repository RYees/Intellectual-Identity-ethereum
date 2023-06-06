import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { BiddercontractABI, contractAddress } from "../utils/bidderconstants";
export const BidderContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const bidderContract = new ethers.Contract(contractAddress, BiddercontractABI, signer);
  
  console.log('biddercontract',bidderContract);
  return bidderContract;
};

export const BidderProvider = ({ children }) => {
  const [formParams, updateFormParams] = useState({ IPname: '', description: '', fullname:'', country:'', street:''});
  const [textmessage, setupMessage] = useState('');
  const [bidformData, setbidformData] = useState({ tokenId: '', address:"", ownerIPname: "", bidvalue: "", bidderaddress: ""});
  const [bidData, getbidders] = useState([]);
  const [countbids, bidsCounts] = useState("");
  const [isLoading, setIsLoading] = useState(false);
   
  const handleChanges = (e, name) => {
    setbidformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkIfBidderExists = async () => {
    try {
      if (ethereum) {
        const bidderContract = createEthereumContract();
        console.log('Connect to your sepolia metamask account!');
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const depositBid= async (tokenId, address, ownerIPname, amount) => {
    console.log('success')
    try {  
      if (ethereum) {
        //const { address, ownerIPname, bidvalue, bidderaddress } = bidformData;
        const bidderContract = createEthereumContract();
        
        const transactionHash = await bidderContract.bidderDeposit(tokenId, address, ownerIPname, { value: ethers.utils.parseEther(amount)});

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

         window.location.reload();
        console.log('success')
      } else {
        console.log("No ethereum object now");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const refundBid= async (amount, tokenId) => {
    try {  
      if (ethereum) {
        //const { address, ownerIPname, bidvalue, bidderaddress } = bidformData;
        const bidderContract = createEthereumContract();
        
        const transactionHash = await bidderContract.refundDeposit(ethers.utils.parseEther(amount), tokenId);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

         window.location.reload();
        console.log('success')
      } else {
        console.log("No ethereum object now");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const getBidders = async () => {
    try {
      if (ethereum) {
        const bidderContract = createEthereumContract();

        const availableBidders = await bidderContract.getMyBidders();        
        const items = await Promise.all(availableBidders.map(async i => {
          let item = {
            tokenID: i.tokenID.toNumber(),
            owneraddress: i.owneraddress,
            ownerIPname: i.ownerIPname,
            bidValue: ethers.utils.formatEther(i.bidValue),
            bidderAddress: i.bidderAddress            
          }
          console.log("support to bid", item);
          return item;          
      }))
      console.log('successvid', items);
        getbidders(items);
      } else { 
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }  
  };

  // const countbidders = async (address) => {
  //   const transactionsContract = createEthereumContract();
  //   const acceptCount = await transactionsContract.countBids(address);
  //   let bal = acceptCount['_hex'];
  //   let val = parseInt(bal)
  //   console.log('accepted count info',val);
  //   bidsCounts(val);
  // };

  useEffect(() => {
    checkIfBidderExists();
  }, []);

  return (
    <BidderContext.Provider
      value={{    
        handleChanges,  
        bidformData,
        depositBid,
        refundBid,
        getBidders,
        bidData,
        countbids,
        isLoading,
        textmessage, 
        setupMessage
        }}
      >
      {children}
    </BidderContext.Provider>
  );
}