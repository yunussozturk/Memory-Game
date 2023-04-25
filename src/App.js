import React from "react";
import { Route , Routes } from "react-router-dom";
import "./App.css"

import Container from "./components7/Container";
import Game from "./components7/Game/index";

function App(){
  return(
      <div className="App">
        <Routes>
          <Route path="/" element={<Container />} />
          <Route path="/play" element={<Game />} />
          <Route path="*" element={<Container />} />
        </Routes>        
      </div>
  )
}

export default App