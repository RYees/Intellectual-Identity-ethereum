import React,{useState, useContext} from 'react';
import { FaPlus, FaTimes } from "react-icons/fa";
import { TransactionContext } from '../../context/TransactionContext';

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

const Status = () => {
    const {changeStatus, statusformData, statusChange } = useContext(TransactionContext);
    const[show, setShow] = useState(false);

    function changeView() {
        setShow(true);
    }
    
    function closeView(e) {
        if(e){
          setShow(!show);
        }
    }
    
    const handleSubmit = (e) => {
        const { id, val } = statusformData;
        
        e.preventDefault();
        if (!id || !val) return;    
        changeStatus();
    };

    return (
        <>
        <div>
            <button
             data-testid='status-check'
             onClick={changeView} 
             className="bg-blue-500 py-3 px-6 rounded text-white hover:brightness-110">
             change-status
            </button>
        </div>

        {show ? ( 
    <div data-testid='show' className='regis absolute z-10 text-gray-600 font-serif flex justify-between'>
        <form className='regform px-5 mx-20 my-16 bg-white flex justify-around'>
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
                    <Input  type="text" name="id" placeholder="id number of the intellectual property" handleChange={statusChange}/>
                </div>
                <div className='mb-4'>
                <label className='text-xl'>Status No.</label><br></br>
                    <Input type="text" name="val" placeholder='status number' handleChange={statusChange}/>
                </div>

                <div className='py-3'>
                  <button onClick={handleSubmit} className='w-32  py-4 bg-gray-300 cursor-pointer'>Submit</button>
                </div>                        
            </div>
        </div>    
        </form>        
        <div className=''>
            <FaTimes data-testid="close" size={35} onClick={closeView} data-testid="close" className="cursor-pointer bg-red-500 -ml-20 mt-4"/>
        </div> 
        </div>):(null)}
    </>
  )
}

export default Status