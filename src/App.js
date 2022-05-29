import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const API = `${process.env.REACT_APP_API_KEY}`
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API}`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)

      })
      setLocation('') //remove the query city name after the search
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyPress={searchLocation}
          type="text" />
      </div>

      <div className="container">
        {data.name != undefined &&

          <div className="top">
            <div className="location scale-up-center">
              <p>{data.name}, {data.sys.country}</p>
            </div>
            <div className="temp scale-up-center">
              {data.main ? <h1>{Math.round(data.main.temp)}°C</h1> : null}
            </div>
            <div className="description rotate-270-cw">
              <p>{data.weather ? data.weather[0].description : null}</p>
            </div>
          </div>
        }
        {data.name != undefined &&
          <div className="bottom scale-up-center">
            <div className="feels">
              <p className="bold">{data.main ? Math.round(data.main.feels_like) : null}°C</p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className="bold">{data.main ? data.main.humidity : null}%</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">{data.wind ? data.wind.speed : null} KM/H</p>
              <p>Winds</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
