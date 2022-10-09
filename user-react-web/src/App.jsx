// import { useState } from 'react';
import { Route, Routes} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Ip from './pages/Ip.jsx';
import Bidder from './pages/Bidder.jsx';
// import Contact from './pages/Contact.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
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
            <Route path='/table' element={<Tablen/>} />
            <Route path='/tab' element={<ReactTable/>} />
        </Routes>
        <Footer/>
      </>
    </div>
  )
}

export default App
