import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import "./assets/styles/global.css";

import Game from "./pages/game";
import Facade from "./pages/facade";
import Instruction from "./pages/instruction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Facade />} />
        <Route path="/game" element={<Game />} />
        <Route path="/instruction" element={<Instruction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
