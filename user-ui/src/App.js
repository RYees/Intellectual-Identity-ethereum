// import { useState } from 'react';
import { Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Ip from './pages/Ip/Ip.jsx';
import Bidder from './pages/Bidder/Bidder.jsx';
// import Contact from './pages/Contact.jsx';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Bidregister from './components/Bidregister/Bidregister.jsx';
import Ipregister from './components/Ipregister/Ipregister.jsx';
import Tablen from './components/Tablen.jsx';
import ReactTable from './components/ReactTable.jsx';

function App() {
  return (
    <div className="App">
      <>
        <Header className=''/>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/ips' element={<Ip />} />
            <Route path='/bidders' element={<Bidder />} />
            <Route path='/bidregister/:ipname/:address' element={<Bidregister />} />
            <Route path='/ipregister' element={<Ipregister />} />
            <Route path='/table' element={<Tablen/>} />
            <Route path='/tab' element={<ReactTable/>} />
        </Routes>
        <Footer/>
      </>
    </div>
  )
}

export default App
