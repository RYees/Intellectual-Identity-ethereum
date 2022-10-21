import React from "react";
import { Route, Routes} from 'react-router-dom';
//import Home from './pages/Home.jsx';
import Ip from './pages/IP/Ip.jsx';
import Bidder from './pages/Bidder/Bidder.jsx';
// import Contact from './pages/Contact.jsx';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
// import Tablen from './components/Tablen.jsx';
// import ReactTable from './components/ReactTable.jsx';

function App() {
  return (
    <div className="App">
      <>
        <Header className=''/>
        <Routes>
            {/* <Route path='/home' element={<Home />} /> */}
            <Route path='/' element={<Ip />} />
            <Route path='/bidders/:id/:address' element={<Bidder />} />
            {/* <Route path='/table' element={<Tablen/>} />
            <Route path='/tab' element={<ReactTable/>} /> */}
        </Routes>
        <Footer/>
      </>
    </div>
  )
}

export default App
