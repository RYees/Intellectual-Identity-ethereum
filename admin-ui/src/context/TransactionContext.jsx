import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../../../admin-ui/src/utils/constants";

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
  const [statusformData, setstatusformData] = useState({ id:"", val: ""});
  const [mintformData, setmintformData] = useState({ id:"", address: "", url: ""});
  const [currentAccount, setCurrentAccount] = useState("");
  const [datas, getMembers] = useState([]);
  const [bidData, getbidders] = useState([]);
  const [accept, acceptCounts] = useState("");
  const [reject, rejectCounts] = useState("");
  const [pend, pendCounts] = useState("");
  const [countbids, bidsCounts] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  
  const handleChanges = (e, name) => {
    setbidformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const statusChange = (e, name) => {
    setstatusformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const mintChange = (e, name) => {
    setmintformData((prevState) => ({ ...prevState, [name]: e.target.value }));
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

  const changeStatus = async (id,val) => {
    // console.log('success')
    try {  
      if (ethereum) {
        //const { id, val } = statusformData;
        const transactionsContract = createEthereumContract();        
        const transactionHash = await transactionsContract.changeStatus(id,val);
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
  
  const mintNft = async (id,address,url) => {
    // console.log('success')
    try {  
      if (ethereum) {
        //const { id,address,url } = mintformData;
        const transactionsContract = createEthereumContract();        
        const transactionHash = await transactionsContract.mintnft(id,address,url);
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

        const availableIps = await transactionsContract.AllIps();

        // const structuredMembers = availableIps.map((member) => ({
        //   member
        // }));
        console.log('ALl members info', availableIps[0].status.length);
        getMembers(availableIps);
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
        // const structuredMembers = availableBidders.map((member) => ({
        //   member
        // }));
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

  const countbidders = async (address) => {
    const transactionsContract = createEthereumContract();
    const acceptCount = await transactionsContract.countBids(address);
    let bal = acceptCount['_hex'];
    let val = parseInt(bal)
    console.log('accepted count info',val);
    bidsCounts(val);
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
        datas,
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
        bidData,
        countbidders,
        countbids,
        changeStatus,
        statusformData,
        statusChange,
        mintNft,
        mintformData,
        mintChange
        }}
      >
      {children}
    </TransactionContext.Provider>
  );
}
