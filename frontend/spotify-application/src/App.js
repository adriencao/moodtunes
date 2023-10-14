import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import NavigationBar from "./components/NavigationBar";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import Playlist from "./pages/Playlist";
const App = () => {
  return (
    <Router>
      <NavigationBar />

      <Routes>
        
        <Route path="/upload"
          element={
            <Upload />
            // <h1>Welcome!</h1>
          } />

        <Route path="/playlist"
          element={
            <Playlist />
            // <h1>Welcome!</h1>
          } />

        <Route path="/"
         element={
            <div className="App">
              {/* <img src={logo} className="App-logo" alt="logo" /> */}
              <Login />
            </div>
         }
        />

      </Routes>
    </Router>
  );
};

export default App;
