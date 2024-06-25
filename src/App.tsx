import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './screens/Home';
import InitializationScreen from './screens/InitializationScreen';
import Layout from './screens/Layout';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<InitializationScreen />} />
          <Route path="/chat" element={<Layout />}/>
            <Route path="/home" element={<Home />} />
            {/* Add more routes for other components as needed */}
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
