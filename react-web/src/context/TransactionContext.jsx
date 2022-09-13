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
  const [currentAccount, setCurrentAccount] = useState("");
  const [data, getMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
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

  const getAllIps = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableIps = await transactionsContract.getMember();

        const structuredMembers = availableIps.map((member) => ({
          member
        }));
        console.log('memebers info', structuredMembers);
        getMembers(structuredMembers);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log('ok',error);
      return alert('Connect to your metamask account!');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
    getAllIps();
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
        getAllIps
        }}
      >
      {children}
    </TransactionContext.Provider>
  );
}
