import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
  
  console.log('types',transactionsContract);
  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({ user:"", IPname: "", fullname: "", country: "", addressplace: "", symbol: "" });
  const [bidformData, setbidformData] = useState({ address:"", ownerIPname: "", bidvalue: "", bidderaddress: ""});
  const [currentAccount, setCurrentAccount] = useState("");
  const [data, getMembers] = useState([]);
  const [bidData, getbidders] = useState([]);
  const [accept, acceptCounts] = useState("");
  const [reject, rejectCounts] = useState("");
  const [pend, pendCounts] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  
  const handleChanges = (e, name) => {
    setbidformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      //window.location.reload();
      console.log(accounts);
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        //getAllTransactions();
        
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
      }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        //const currentTransactionCount = await transactionsContract.countEmployees();
        //setTransactionCount(currentTransactionCount);
        //window.localStorage.setItem("transactionCount", currentTransactionCount);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const registerIP= async () => {
    try {  
      if (ethereum) {
        const { user, IPname, fullname, country, addressplace, symbol } = formData;
        const transactionsContract = createEthereumContract();
    
        const transactionHash = await transactionsContract.setIP(user, IPname, fullname, country, addressplace, symbol);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        //const transactionsCount = await transactionsContract.countEmployees();

        //setTransactionCount(transactionsCount.toNumber());
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

  const registerBidder= async () => {
    console.log('success')
    try {  
      if (ethereum) {
        const { address, ownerIPname, bidvalue, bidderaddress } = bidformData;
        const transactionsContract = createEthereumContract();
        
        const transactionHash = await transactionsContract.setIPbidder1(address, ownerIPname, bidvalue, bidderaddress);

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


  const getAllIps = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableIps = await transactionsContract.getAllRegisteredIps();

        const structuredMembers = availableIps.map((member) => ({
          member
        }));
        console.log('members info', structuredMembers);
        getMembers(structuredMembers);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log('ok',error);
      return alert('Connect to your metamask account!');
    }
  };

  const getBidders = async (addres) => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableBidders = await transactionsContract.getbidderinfo(addres);
        console.log('bidderss info', availableBidders[0]);
        console.log('bidderss info', availableBidders[0]['ownerIPname'] );
        console.log('bidderss info', availableBidders[0]['bidderAddress'] );
        console.log('bidderss info', availableBidders[0]['bidValue']['_hex']);
        getbidders(availableBidders);
      } else { 
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }  
  };

  const countAccepted = async () => {
    const transactionsContract = createEthereumContract();
    const acceptCount = await transactionsContract.countAcceptedIPs();
    let bal = acceptCount['_hex'];
    let val = parseInt(bal)
    console.log('accepted count info',val);
    acceptCounts(val);
  };

  const countRejected = async () => {
    const transactionsContract = createEthereumContract();
    const rejectCount = await transactionsContract.countRejectedIPs();
    let bal = rejectCount['_hex'];
    let val = parseInt(bal)
    console.log('accepted count info',val);
    rejectCounts(val);
  };

  const countPend = async () => {
    const transactionsContract = createEthereumContract();
    const pendCount = await transactionsContract.countPendingIPs();
    let bal = pendCount['_hex'];
    let val = parseInt(bal)
    console.log('accepted count info',val);
    pendCounts(val);
  };




  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
    //getAllIps();
    // handleWalletBalance()
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        handleChange, 
        registerIP,
        formData,
        data,
        getAllIps,
        countAccepted,
        accept,
        countRejected,
        reject,
        countPend,
        pend,
        handleChanges,
        bidformData,
        registerBidder,
        getBidders,
        bidData
        }}
      >
      {children}
    </TransactionContext.Provider>
  );
}
