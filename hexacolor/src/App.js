import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import "./assets/styles/global.css";

import Init from "./pages/init";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Init />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
