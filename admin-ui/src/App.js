import React, {useEffect, useState} from "react";
import { Route, Routes, useLocation} from 'react-router-dom';
import Ip from './pages/IP/Ip.jsx';
import Bidder from './pages/Bidder/Bidder.jsx';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Mint from "./components/Mint/Mint.jsx";
import Status from "./components/Status/Status.jsx";
import './css/App.css';
// import Tablen from './components/Tablen.jsx';
// import ReactTable from './components/ReactTable.jsx';

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
        <Routes location={displayLocation}>        
            <Route path='/' element={<Ip />} />
            <Route path='/status/:id/:address' element={<Status />} />
            <Route path='/bidders/:id/:address' element={<Bidder />} />
            <Route path='/mint/:id/:address' element={<Mint />} />
            {/* <Route path='/table' element={<Tablen/>} />
            <Route path='/tab' element={<ReactTable/>} /> */}        
        </Routes>
      </div>
      <Footer/>
      </>
    </div>
  )
}

export default App
