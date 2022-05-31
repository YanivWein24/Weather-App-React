import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const event = new Date();

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const day = days[event.getDay()]
  const month = months[event.getMonth()]
  const monthDay = event.getUTCDate()
  const year = event.getFullYear()

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [unit, setUnit] = useState('metric')

  const icon = data.main ? data.weather[0].icon : null
  const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

  const degrees = (unit === 'metric') ? "C" : "F"
  const speedUnit = (unit === 'metric') ? "KM/H" : "MPH"
  const speed = (unit === 'metric') ? ((data.wind.speed) * 3.6) : data.wind.speed

  const API = `${process.env.REACT_APP_API_KEY}`
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${API}`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('') //remove the query city name after the search
    }
  }

  const handleUnitChange = (event) => {
    setUnit(event.target.value)
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data.name}&units=${event.target.value}&appid=${API}`
    ).then((response) => {
      setData(response.data)
    })
  }

  return (
    <div className="app">
      <div className="search scale-up-center">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder="Enter City Name"
          onKeyPress={searchLocation}
          type="text" />
        <select name="Unit" value={unit} onChange={(event) => { handleUnitChange(event) }}>
          <option value="metric">Celsius</option>
          <option value="imperial">Fahrenheit</option>
        </select>
        <h2>{day}, {month} {monthDay} {year}</h2>
      </div>
      <div className="container">
        {data.name !== undefined &&
          <div className="top">
            <div className="location scale-up-center">
              <p>{data.name}, {data.sys.country}</p>
            </div>
            <div className="temp scale-up-center">
              {data.main ? <h1>{Math.round(data.main.temp)}°{degrees}</h1> : null}
            </div>
            <div className="description rotate-90-right-ccw">
              <p>{data.weather ? data.weather[0].description : null}</p>
            </div>
            <div className="icon scale-up-center">
              <p >{data.weather ? <img src={imageURL} alt="Icon" /> : null}</p>
            </div>
          </div>
        }
        {data.name !== undefined &&
          <div className="bottom scale-up-center">
            <div className="feels">
              <p className="bold">{data.main ? Math.round(data.main.feels_like) : null}°{degrees}</p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className="bold">{data.main ? data.main.humidity : null}%</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">{data.wind ? speed : null} {speedUnit}</p>
              <p>Winds</p>
            </div>
          </div>
        }
      </div>
      <p className="copyright">copyrightⒸ {year} Yaniv Weinshtein </p>
    </div >
  );
}

export default App;
