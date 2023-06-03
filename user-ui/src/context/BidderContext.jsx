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
  const [bidformData, setbidformData] = useState({ address:"", ownerIPname: "", bidvalue: "", bidderaddress: ""});
  const [bidData, getbidders] = useState([]);
  const [countbids, bidsCounts] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // const handleChange = (e, name) => {
  //   setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  // };
  
  // const handleChanges = (e, name) => {
  //   setbidformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  // };

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

  const registerBidder= async (address, ownerIPname, bidvalue, bidderaddress) => {
    console.log('success')
    try {  
      if (ethereum) {
        //const { address, ownerIPname, bidvalue, bidderaddress } = bidformData;
        const bidderContract = createEthereumContract();
        
        const transactionHash = await bidderContract.setIPbidder1(address, ownerIPname, bidvalue, bidderaddress);

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

  const getBidders = async (addres) => {
    try {
      if (ethereum) {
        const bidderContract = createEthereumContract();

        const availableBidders = await bidderContract.getbidderinfo(addres);        
        console.log('bidderss info', availableBidders[0]['bidValue']['_hex']);
        getbidders(availableBidders);
      } else { 
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }  
  };

  useEffect(() => {
    checkIfBidderExists();
  }, []);

  return (
    <BidderContext.Provider
      value={{      
        bidformData,
        registerBidder,
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