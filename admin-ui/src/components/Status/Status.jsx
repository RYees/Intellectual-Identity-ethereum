import React,{useState, useContext} from 'react';
import { FaPlus, FaTimes } from "react-icons/fa";
import { TransactionContext } from '../../context/TransactionContext';
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="0.0001"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="border w-96 p-3"
    />
  );

const Status = (props) => {
    const {connectWallet, changeStatus } = useContext(TransactionContext);
    //const[show, setShow] = useState(false);
    const idp = React.useRef();
    const lsg = React.useRef();

    const { state } = useLocation();
    const { index } = state || {};
    // console.log("id" + index);

    // function changeView() {
    //     setShow(true);
    // }
    
    // function closeView(e) {
    //     if(e){
    //       setShow(!show);
    //     }
    // }

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/`; 
        navigate(path);
        navigate(0);
    }
    
    const handleSubmit = (e) => {
        //const { id, val } = statusformData;        
        e.preventDefault();
        // if (!id || !val) return;    
        //console.log("input values" + idp.current.value, lsg.current.value);
        changeStatus(idp.current.value, lsg.current.value);
    };

    return (
        <>
        {/* <div>
            <button
             data-testid='status-check'
             onClick={changeView} 
             className='bg-black text-white transition duration-150 ease-out hover:ease-in
             p-2 py-2 mt-5 rounded text-gray-900'>
             status
            </button>
        </div> */}

        <div className='text-center py-10'>
            <button
                data-testid="wallet"
                onClick={connectWallet}
                className='bg-gradient-to-r from-cyan-700 via-gray-300 to-cyan-700 transition duration-150 ease-out hover:ease-in
                p-4 rounded-3xl text-gray-900 text-2xl'>
                Connect Wallet
            </button>
        </div>

      <div className='bg-white'>
         <p className='text-center py-20'>Connect to your wallet, to see your IP bidders'</p>
      </div>

      <div>
        <button
          className='bg-black text-white transition duration-150 ease-out hover:ease-in
          p-4  rounded-xl text-gray-900 text-xl'
          onClick={routeChange}>
          Back
        </button>
      </div>

    <div data-testid='show' className='text-gray-600 font-serif flex justify-between'>
        <form className='px-5 mx-20 my-16 bg-white flex justify-between gap-36'>
        <div className='my-36 text-2xl'>
        <p className='mb-5'>Status number value options:</p>
            <ul>
                <li className='mb-5'>Pending: <strong>0</strong></li>
                <li className='mb-5'>Accepted: <strong>1</strong></li>
                <li>Rejected: <strong>2</strong></li>
            </ul>
        </div>
        <div className=''>
            <div className='mb-6 py-3'><h1>Change IP Status</h1></div>
            <div className=''>    
                <div className="mb-4">
                <label className='text-xl'>IP ID </label><br></br>
                    <input  type="text" name="id" ref={idp} value={index} placeholder="id number of the intellectual property" />
                </div>
                <div className='mb-4'>
                <label className='text-xl'>Status No.</label><br></br>
                    <input type="text" name="val" ref={lsg} placeholder='status number'/>
                </div>

                <div className='py-3'>
                  <button onClick={handleSubmit} className='w-32  py-4 bg-gray-300 cursor-pointer'>Submit</button>
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