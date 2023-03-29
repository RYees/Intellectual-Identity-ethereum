import React, {useEffect, useState} from "react";
import { Route, Routes, useLocation} from 'react-router-dom';
import {Ip, Bidder, Home} from "./pages/index";
import {
  Header,
  Footer,
  Bidregister,
  Ipregister,
  Tablen,
  ReactTable,
  Mint, Status
}
from "./components/index";
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
            {/* admin routes */}
            <Route path='/status/:id' element={<Status />} />
            <Route path='/bidders/:id/:address' element={<Bidder />} />
            <Route path='/mint/:id/:address' element={<Mint />} />
        </Routes>
      </div>
        <Footer/>
      </>
    </div>
  )
}

export default App
