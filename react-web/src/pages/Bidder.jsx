import React from 'react'
import '../css/App.css'

const Bidder = () => {
  return (
    <div className='mb-96 mt-20'>
      <div className='text-center py-10'>
        <button className='bg-gradient-to-r from-cyan-700 via-gray-300 to-cyan-700 transition duration-150 ease-out hover:ease-in
        p-8 rounded-3xl text-gray-900 text-white text-2xl'>Connect Wallet</button>
      </div>

      <div className='bg-white mb-20'>
         <p className='text-center py-20'>Connect to your wallet, to see your IP bidders'</p>
      </div>

      <div className='mx-20'>
      <table className='scrolltunnel'>
        {/* <caption className='my-10 text-3xl'>Intellectual properties</caption> */}
        <thead>
          <tr>
            <th scope="col">Ip-name</th>
            <th scope="col">Bidders Address</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Buzzcocks</th>
            <td>1976</td>
            <td>9</td>
          </tr>
          <tr>
            <th scope="row">The Clash</th>
            <td>1976</td>
            <td>6</td>
          </tr>

          <tr>
            <th scope="row">The Stranglers</th>
            <td>1974</td>
            <td>17</td>
          </tr>

          <tr>
            <th scope="row">The Stranglers</th>
            <td>1974</td>
            <td>17</td>
          </tr>         
        </tbody>
       </table>
      </div>

    </div>
  )
}

export default Bidder