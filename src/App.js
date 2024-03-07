import "./App.css";
import React from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Perfiles from "./Components/Perfiles/Perfiles";


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/Login'
            element={<Login />}
          />
          <Route
            path='/Perfiles'
            element={<Perfiles />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
