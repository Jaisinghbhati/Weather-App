// src/Weather.js
import React, { useState } from 'react';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = "2492f9630127cabeb1dd49ef08fede38"; // Replace with your OpenWeatherMap API key

  const fetchWeather = async (e) => {
    e.preventDefault();
    setError('');
    setWeatherData(null);
    
    if (!location) return setError('Please enter a location');
    
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
      const data = await response.json();

      if (data.cod !== 200) {
        setError(data.message);
      } else {
        setWeatherData(data);
      }
    } catch (error) {
      setError('Unable to fetch data');
    }
  };

  return (
    <div className=''>
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-300 p-4">
      <h1 className="text-4xl font-bold mb-4">Weather App</h1>
      <form onSubmit={fetchWeather} className="mb-6 w-full max-w-md">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none  "
        />
        <button
          type="submit"
          className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Get Weather
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {weatherData && (
        <div className="w-full max-w-md bg-white p-6 rounded-md shadow-md text-center">
          <h2 className="text-2xl font-bold">{weatherData.name}</h2>
          <p className="text-lg">{weatherData.weather[0].description}</p>
          <p className="text-xl font-bold mt-2">{weatherData.main.temp} °C</p>
          <div className="flex justify-around mt-4">
            <div>
              <p className="text-lg">Humidity</p>
              <p className="font-bold">{weatherData.main.humidity} %</p>
            </div>
            <div>
              <p className="text-lg">Wind</p>
              <p className="font-bold">{weatherData.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Weather;
