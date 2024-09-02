import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    const getWeatherByCity = async () => {
        try {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=904567c00b7b0f3952eb143f1c6f728b`);
            setWeather(response.data);
        } catch (error) {
            console.error("City not found or API error", error);
        }
    };

    return (
        <div className="App">
            <h1>Weather App</h1>
            <input 
                type="text" 
                placeholder="Enter city" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
            />
            <button onClick={getWeatherByCity}>Get Weather</button>
            {weather && (
                <div>
                    <h3>{weather.city.name}</h3>
                    {weather.list.slice(0, 5).map((forecast, index) => (
                        <div key={index}>
                            <p>Date: {new Date(forecast.dt_txt).toLocaleDateString()}</p>
                            <p>Temperature: {Math.round(forecast.main.temp - 273.15)}°C</p>
                            <p>Weather: {forecast.weather[0].description}</p>
                            <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt="weather icon" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
