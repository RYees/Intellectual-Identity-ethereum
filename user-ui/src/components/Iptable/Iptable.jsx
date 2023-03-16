//require('dotenv').config();
import React, {useEffect, useState, useContext} from 'react'
import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import ReactPaginate from 'react-paginate';
import { TransactionContext } from '../../context/TransactionContext';
import '../../css/Style.css';
import '../../css/App.css';

const Iptable = ({data}) => {
    const {currentAccount} = useContext(TransactionContext);
    const adminAddress = process.env.REACT_APP_ADMIN_ADDRESS;
    console.log("admin address", adminAddress == currentAccount)
    console.log("my address", currentAccount)
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 3;
  
    useEffect(() => {
      //const adminAddress = process.env.REACT_APP_ADMIN_ADDRESS;
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);
  
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % data.length;
      setItemOffset(newOffset);
    };
  
  function vals (valk){
    const val = parseInt(valk);
    let result = epochTohumanReadble(val)
    return result;
  }
  
  const epochTohumanReadble = (timestamp) => {        
    let epoch = timestamp;
    let currentTimestamp = epoch;
    let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)
   // let time =  date.split(' ')[1];
    return date;
   // console.log('timt',time)
  //  const [hour, minute, second] = time.split(':');        
  }

  function status (statusNumber) {
    if(statusNumber === 0){
     return <div className="font-semibold text-gray-500">Pending</div>;
    } else if (statusNumber === 1){
      //Show();
      return <div className="text-black font-semibold">Accepted</div>;
    } else if (statusNumber === 2){
     return <div className="text-gray-700 font-semibold">Rejected</div>;
    }
  }

  function Show(item) {
    const c = status(item.status[item.status.length-1]);
    if(c.props.children === "Accepted"){
      return(
        <NavLink to={{ pathname:`/bidregister/${item.IPname}/${item.user}`}}  state={{item}}> 
        <button
          className='ml-2 my-2 bg-black text-white transition duration-150 ease-out hover:ease-in
          py-1 px-6 mt-5 rounded'>
          Bid
        </button>
      </NavLink>
      )  
    }
  }

  function Url(item) {
    const c = status(item.status[item.status.length-1]);
    if(c.props.children === "Accepted"){
      return(
        item.allIpInfoURL
      )  
    }
  }

  function Mint(item, index) {
    const c = status(item.status[item.status.length-1]);
    if(c.props.children === "Accepted"){
      return(
        <NavLink to={{ pathname:`/mint/${index}/${item.user}`}}  state={{item,index}}> 
          <button
            className='bg-black text-white transition duration-150 ease-out hover:ease-in
            py-1 px-6 mt-5 rounded'>
            Mint
          </button>
      </NavLink>
      )  
    }
  }

  function Bid(item, index) {
    const c = status(item.status[item.status.length-1]);
    if(c.props.children === "Accepted"){
      return(
        <NavLink to={{ pathname:`/bidders/${index}/${item.user}`}}  state={{item}}> 
          <button
            className='bg-black text-white transition duration-150 ease-out hover:ease-in
            py-1 px-6 mt-5 rounded'>
            Bidders
          </button>
        </NavLink>
      )  
    }
  }
 

  return (
    <div className='fades'>
    <div>
    <NavLink to={{ pathname:`/ipregister`}}> 
       <button 
       data-testid='button-one'
       className='flex justify-end float-right mb-3 bg-black transition duration-150 ease-out hover:ease-in
       px-3 py-2 rounded text-white hover:brightness-105 transition duration-150 ease-in-out shadow-lg'>
       <FaPlus className='inline text-white mt-1 mr-1'/> Register IPs
       </button>
    </NavLink>
    </div>
    <table className='table table-striped mx-8 mt-24 shadow-lg'>
         <thead>
          <tr className=''>
            <th className='text-gray-900'>ID</th>
            <th className='text-gray-900'> Ip Name </th>
            <th className='text-gray-900'> Full Name</th>
            <th className='text-gray-900'> Country Name</th>
            <th className='text-gray-900'> Address</th>
            { currentAccount == adminAddress ?
            <th className='text-gray-900'> Metadata</th> : null}
            <th className='text-gray-900'> Status</th>
            <th className='text-gray-900'> Data path</th>
            <th className='text-gray-900'> Date</th>
            { currentAccount == adminAddress ?
            <th className='text-gray-900'></th>: null }
            { currentAccount == adminAddress ?
            <th className='text-gray-900'></th>: null }
            { currentAccount == adminAddress ?
            <th className='text-gray-900'></th>: null }
            { currentAccount == adminAddress ?
            <th className='text-gray-900'></th>: null }
          </tr>
        </thead>
        <tbody className='bg-gray-100'>
          
        {currentItems.map((item,index) => ( 
            <tr key={index}>
              <td >{index}</td>
              <td >{item.IPname}</td>    
              <td className='text-black'>{item.fullname}</td>  
              <td className='text-black'>{item.country}</td>  
              <td className='text-black'>{item.addressplace}</td>  
              {currentAccount == adminAddress ?
              <td className='text-black'>{item.allIpInfoURL}</td> : null}
              <td className='text-black'>{status(item.status[item.status.length-1])}</td> 
              <td>{Url(item)}</td>   
              <td>{vals(item.timestamp['_hex'])}</td>
              { currentAccount !== adminAddress ?
              <td>{Show(item)}</td>: null }
              { currentAccount == adminAddress ?        
              <td className='text-center'>
              <NavLink to={{ pathname:`/status/${index}/${item.user}`}}  state={{item,index}}> 
                <button
                  className='bg-black text-white transition duration-150 ease-out hover:ease-in
                  py-1 px-6 mt-5 rounded'>
                  Status
                </button>
              </NavLink>
              </td> : null }
             
              { currentAccount == adminAddress ?
              <td>{Mint(item, index)}</td> : null }
              { currentAccount == adminAddress ?
              <td>{Bid(item, index)}</td> : null }    
              </tr>
         ))
         }         
        </tbody>
      </table> 
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </div>
  )
}

export default Iptable