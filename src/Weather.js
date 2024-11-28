import React from 'react';

const WeatherInfo = ({ weather }) => {
  return (
    <div className="weather-info">
      <h2>
        {weather.city}, {weather.country}
      </h2>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Condition: {weather.condition}</p>
      <p>Wind Speed: {weather.windSpeed} {weather.windUnit}</p>
    </div>
  );
};

export default WeatherInfo;
