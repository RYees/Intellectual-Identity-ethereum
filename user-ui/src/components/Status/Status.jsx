import React,{useState, useContext} from 'react';
import { FaPlus, FaTimes } from "react-icons/fa";
import { TransactionContext } from '../../context/TransactionContext';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import '../../css/Style.css';

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="border p-3"
    />
  );

const Status = () => {
    
    const {connectWallet, changeStatus, message } = useContext(TransactionContext);
    //const[show, setShow] = useState(false);
    const id = React.useRef();
    const status = React.useRef();

    const { state } = useLocation();
    const { index } = state || {};
    const { item } = state || {};
    // console.log("co", item.tokenId)
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/ips`; 
        navigate(path);
        navigate(0);
    }
    
    const handleSubmit = (e) => {
        //const { id, val } = statusformData;        
        e.preventDefault();
        // if (!id || !val) return;    
        //console.log("input values" + id.current.value, status.current.value);
        changeStatus(id.current.value, status.current.value);
        // let path = `/ips`; 
        // navigate(path);
        // navigate(0);
    };

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
         <p className='text-center text-gray-400 mb-16'>
         don't forget to connect to your wallet</p>
      </div>

      <div>
         <a class="arrow mb-4 bg-gradient-to-r from-black via-gray-300" onClick={routeChange}>Back</a>
      </div>

    <div data-testid='show' className='container contain-1 text-gray-600 font-serif flex '>
        <form className='form-status status-form text-black shadow-2xl px-5 mx-20 my-20 bg-white flex'>
        <div className='textbox my-36 text-2xl'>
        <p className='mb-5 text-2xl'>
            Change users' Nft status
        </p>
        <div className='text-xl text-gray-500'>{message}</div>
        </div>
        <div className='fields px-10'>
            <div className='mb-10 py-3 text-xl text-black'><h1 className='tit'>Change IP Status</h1></div>
            <div className=''>    
                <div className="mb-6">
                <label className='text-lg'>Nft token ID </label><br></br>
                    <input className='input-box text-gray-700 border py-2 px-2 rounded' type="text" name="id" ref={id} value={item.tokenId} placeholder="id number of the intellectual property" />
                </div>
                <div className='mb-4'>
                <label className='text-lg'>Nft Status</label><br></br>
                    {/* <input className='input-box text-gray-700 border py-2 px-2 rounded' type="text" name="val" ref={status} placeholder='status number'/> */}
                    <select ref={status} className='w-96 border-none h-10'>
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <div className='py-3'>
                  <button onClick={handleSubmit} className='mt-5 w-28 py-3 bg-black rounded text-white text-lg cursor-pointer'>Change</button>
                </div>                        
            </div>
        </div>    
        </form>        
        {/* <div className=''>
            <FaTimes data-testid="close" size={35} onClick={closeView} data-testid="close" className="cursor-pointer bg-red-500 -ml-20 mt-4"/>
        </div>  */}
     </div>
    </>
  )
}

export default Status