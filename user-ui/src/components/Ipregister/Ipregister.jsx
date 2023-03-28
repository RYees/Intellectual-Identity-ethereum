import React,{useContext, useState} from 'react';
import { TransactionContext } from '../../context/TransactionContext';
import { useNavigate, useLocation } from "react-router-dom";
import { uploadFileToIPFS } from "../../pinata";
import '../../css/Style.css';

const Ipregister = () => {
  const { connectWallet, currentAccount,updateFormParams, formParams,
    formData, registerIP, message, listNFT, uploadMetadataToIPFS } = useContext(TransactionContext);
  // const [formParams, updateFormParams] = useState({ IPname: '', description: '', fullname:'', country:'', street:''});
  const [fileURL, setFileURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  //This function uploads the NFT image to IPFS
  async function OnChangeFile(e) {
    setIsLoading(true)
    var file = e.target.files[0];
    try {
        //setFileURL(file);
        const response = await uploadFileToIPFS(file);
        if(response.success === true) {
            console.log("Uploaded image to Pinata: ", response.pinataURL)
            setFileURL(response.pinataURL);
            setIsLoading(false)
        }
    }
    catch(e) {
        console.log("Error during file upload", e);
    }
}

  // const address = React.useRef();
  // const ipname = React.useRef();
  // const fullname = React.useRef();
  // const country = React.useRef();
  // const street = React.useRef();
  // const url = React.useRef();

  const handleSubmit = (e) => {
    //const { user, IPname, fullname, country, addressplace, symbol } = formData;    
    e.preventDefault();
    //if (!user || !IPname || !fullname || !country || !addressplace || !symbol ) return;
    //registerIP(address, ipname, fullname, country, street, url);
    //uploadMetadataToIPFS(formParams, fileURL)
    console.log("sweett",{fileURL});
    listNFT(fileURL);
  };
  
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
      let path = `/ips`; 
      navigate(path);
      navigate(0);
  }
  
  return (
    <>
   <div className='text-center'>
      <button
          data-testid="wallet"
          onClick={connectWallet}
          className='bg-gradient-to-r from-black via-gray-500 to-black transition duration-150 ease-out hover:ease-in
          p-4 px-6 rounded-full text-white text-xl mt-36 mb-10 hover:brightness-125 transition duration-150 ease-in-out shadow-lg'>
          Connect Wallet
      </button>
    </div>

    <div className='bg-white'>
        <p className='text-center text-gray-400 mb-16'>don't forget to connect to your wallet</p>
    </div>

    <div>
        <a class="arrow mb-6 bg-gradient-to-r from-black via-gray-300" onClick={routeChange}>Back</a>
    </div>

  <div data-testid="show"
    className='regcont contain-1 text-gray-600 font-serif flex justify-between'>
      <form className='ipform px-5 mx-20 my-16 bg-white flex'>
       <div className='fields'>
        <div className='mb-6 py-3 text-black'><h1>Register IP</h1></div>
          <div className=''>    
            <div className="mb-4">
            <label className='text-xl'>IP Name </label><br></br>
                <input className='ip-box text-gray-700 border py-2 px-2 rounded' placeholder="your material name" type="text" name="user" onChange={e => updateFormParams({...formParams, IPname: e.target.value})} value={formParams.IPname}/>
            </div>
            <div className='mb-4'>
            <label className='text-xl'>Description</label><br></br>
                <input className='ip-box text-gray-700 border py-2 px-2 rounded'  type="text" name="IPname" placeholder='your material description' onChange={e => updateFormParams({...formParams, description: e.target.value})} value={formParams.description}/>
            </div>
            <div className='mb-4'>
            <label className='text-xl'>Full Name</label><br></br>
                <input className='ip-box text-gray-700 border py-2 px-2 rounded' type="text" name="fullname" placeholder='your full name' onChange={e => updateFormParams({...formParams, fullname: e.target.value})} value={formParams.fullname}/>
            </div>
            <div className='mb-4'>
            <label className='text-xl'>Country Name</label><br></br>
                <input className='ip-box text-gray-700 border py-2 px-2 rounded' type="text" name="country" placeholder='your country name' onChange={e => updateFormParams({...formParams, country: e.target.value})} value={formParams.country}/>
            </div>           
        </div>
       </div> 
       <div className='fields second-box mt-28 px-4 ml-6'>
            <div className='mb-4 second-lab'>
                <label className='text-xl'>Street Name</label><br></br>
                <input className='ip-box text-gray-700 border py-2 px-2 rounded' type="text" name="addressplace" placeholder='your street name' onChange={e => updateFormParams({...formParams, street: e.target.value})} value={formParams.street}/>
            </div>

            <div>
                <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="image">Upload Logo</label>
                <input type={"file"} onChange={OnChangeFile}></input>
                {isLoading?<p className='text-red-600 text-sm'>loading...</p>:null}
            </div>

            <div className='py-3 second-lab'>
                <button onClick={handleSubmit} className='mt-5 w-28 py-3 bg-black rounded text-white text-lg cursor-pointer'>Register</button>
            </div>
            <div>
              {message}
            </div>
        </div>        
      </form>
    </div>
    </>
  )
}

export default Ipregister