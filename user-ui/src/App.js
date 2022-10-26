import React, {useEffect, useState} from "react";
import { Route, Routes, useLocation} from 'react-router-dom';
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
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location, displayLocation]);
  return (
    <div className="App">
      <>
        <Header className=''/>
        <div
          className={`${transitionStage}`}
          onAnimationEnd={() => {
            if (transitionStage === "fadeOut") {
              setTransistionStage("fadeIn");
              setDisplayLocation(location);
            }
          }}
        >
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/ips' element={<Ip />} />
            <Route path='/bidders' element={<Bidder />} />
            <Route path='/bidregister/:ipname/:address' element={<Bidregister />} />
            <Route path='/ipregister' element={<Ipregister />} />
            <Route path='/table' element={<Tablen/>} />
            <Route path='/tab' element={<ReactTable/>} />
        </Routes>
      </div>
        <Footer/>
      </>
    </div>
  )
}

export default App
