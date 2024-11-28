import React, { useState } from 'react';
import './App.css';
import WeatherInfo from './Weather';

const fetchWeatherData = async (city) => {
  const apiKey = '7Wy2l9YsUAJQvUUrCzyVst4XqG1JYGJM'; // Access the API key
  if (!city.trim()) throw new Error('Please enter a city name.');
  const sanitizedCity = encodeURIComponent(city.trim());


  
  // Fetch the location key
  const locationUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${sanitizedCity}`;
  const locationResponse = await fetch(locationUrl);
  debugger;
  if (!locationResponse.ok) throw new Error('City not found!');
  
  const locationData = await locationResponse.json();
  if (!locationData.length) throw new Error('City not found.');
  const locationKey = locationData[0].Key;

  // Fetch weather data for the location key
  const weatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;
  const weatherResponse = await fetch(weatherUrl);
  if (!weatherResponse.ok) throw new Error('Weather data unavailable.');
  
  const weatherData = await weatherResponse.json();
  return {
    city: locationData[0].LocalizedName,
    country: locationData[0].Country.LocalizedName,
    temperature: weatherData[0].Temperature.Metric.Value,
    condition: weatherData[0].WeatherText,
    //windSpeed: weatherData[0].Wind.Speed.Metric.Value,
    //windUnit: weatherData[0].Wind.Speed.Metric.Unit,
  };
};

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setWeather(null);
    try {
      const data = await fetchWeatherData(city);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
        {error && <p className="error">{error}</p>}
        {weather && <WeatherInfo weather={weather} />}
      </header>
    </div>
  );
}

export default App;
