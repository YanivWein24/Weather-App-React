import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const API = `${process.env.REACT_APP_API_KEY}`
  const url = `https://api.openweathermap.org/data/2.5/weather?q=jerusalem&appid=${API}`

  return (
    <div className="app">
      <div className="container">
        <div className="top">
          <div className="location">
            <p>Jerusalem, IL</p>
          </div>
          <div className="temp">
            <h1>30°C</h1>
          </div>
          <div className="description">
            <p>Cloudy</p>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className="bold">31 degrees</p>
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            <p className="bold">20%</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className="bold">12 KM/H</p>
            <p>Winds</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
