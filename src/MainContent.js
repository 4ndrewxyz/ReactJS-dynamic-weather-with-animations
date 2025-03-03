import React, { useState, useRef } from 'react';
import './css/MainContent.css';

const MainContent = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const loadingRef = useRef(null);
  const [searchCount, setSearchCount] = useState(0);
  const [previousWeather, setPreviousWeather] = useState('default');
  
  // Replace with your actual API key from OpenWeatherMap
  const API_KEY = '';
  
  // This ensures the loading animation remounts with every search
  const loadingKey = `loading-${searchCount}`;

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim() === '') return;
    
    // Save the current weather state before loading
    if (weatherData) {
      setPreviousWeather(weatherData.description.toLowerCase().replace(/\s+/g, '-'));
    }
    
    // Increment search count to ensure proper remounting
    setSearchCount(prevCount => prevCount + 1);
    
    setLoading(true);
    setError(null);
    
    // Fetch real weather data from OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found or API error');
        }
        return response.json();
      })
      .then(data => {
        if (loadingRef.current) {
          // Add fade-out class
          loadingRef.current.classList.add('fade-out');
          
          // Listen for animation completion
          const handleAnimationEnd = () => {
            if (loadingRef.current) {
              loadingRef.current.removeEventListener('animationend', handleAnimationEnd);
            }
            
            // Process and set weather data
            processWeatherData(data);
          };
          
          loadingRef.current.addEventListener('animationend', handleAnimationEnd);
        } else {
          // Fallback if ref isn't available
          processWeatherData(data);
        }
      })
      .catch(err => {
        setLoading(false);
        setError(err.message);
      });
  };

  // Helper function to process API data
  const processWeatherData = (data) => {
    // Get the exact weather description from the API
    const weatherDescription = data.weather[0].description;
    
    // Get visual display category for background/effects
    const visualCategory = getVisualCategory(data.weather[0].main);
    
    setWeatherData({
      city: data.name,
      temperature: Math.round(data.main.temp),
      description: capitalizeWords(weatherDescription),
      visualCategory: visualCategory,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      weatherId: data.weather[0].id, // Store the weather ID for more specific categorization if needed
    });
    
    setLoading(false);
  };

  // Helper to capitalize first letter of each word
  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  // Map weather conditions to visual categories for backgrounds
  const getVisualCategory = (condition) => {
    // Map to fewer visual categories for backgrounds/effects
    const visualMap = {
      'Clear': 'sunny',
      'Clouds': 'cloudy',
      'Rain': 'rainy',
      'Drizzle': 'rainy',
      'Thunderstorm': 'thunderstorm',
      'Snow': 'snow',
      'Mist': 'mist',
      'Smoke': 'smoke',
      'Haze': 'haze',
      'Dust': 'dust',
      'Fog': 'fog',
      'Sand': 'sand',

      
      'Ash': 'ash',
      'Squall': 'squall',
      'Tornado': 'tornado'
    };
    
    // Special handling for partly cloudy
    if (condition === 'Clouds') {
      return Math.random() > 0.5 ? 'partly-cloudy' : 'cloudy';
    }
    
    return visualMap[condition] || 'cloudy';
  };

  // Determine the weather state for data-attribute (for visual styling)
  const weatherState = loading ? 'loading' : 
    weatherData ? weatherData.visualCategory : 
    'default';

  return (
    <div 
      className="wrapper" 
      data-weather={weatherState}
      data-previous={previousWeather}
    >
      {/* Weather effect layers - always present but only visible when needed */}
      <div className="weather-effects rainy"></div>
      <div className="weather-effects sunny"></div>
      <div className="weather-effects cloudy"></div>
      <div className="weather-effects partly-cloudy"></div>
      <div className="weather-effects thunderstorm"></div>
      <div className="weather-effects snow"></div>
      <div className="weather-effects mist"></div>
      <div className="weather-effects fog"></div>
      <div className="weather-effects dust"></div>
      <div className="weather-effects sand"></div>
      <div className="weather-effects ash"></div>
      <div className="weather-effects tornado"></div>
      <div className="weather-effects squall"></div>
      <div className="weather-effects smoke"></div>
      <div className="weather-effects haze"></div>
      <main className="main-content">
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for a city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>

        {loading && (
          <div className="loading-overlay" key={loadingKey} ref={loadingRef}>
            <p>Fetching weather data...</p>
          </div>
        )}
        
        {error && (
          <div className="error">
            <p>Oops! {error}</p>
          </div>
        )}
        
        {weatherData && !loading && (
          <div className="weather-card">
            <h2>{weatherData.city}</h2>
            <div className="weather-info">
              <div className="temperature">
                {weatherData.temperature}°
              </div>
              <div className="description">{weatherData.description}</div>
              <div className="details"> 
                <p>Feels like<br/>{Math.round(weatherData.temperature * 0.95)}°</p>
                <p>Humidity<br/>{weatherData.humidity}%</p>
                <p>Wind<br/>{weatherData.windSpeed} km/h</p>
              </div>
            </div>
          </div>
        )}

        {!weatherData && !loading && !error && (
          <div className="empty-state">
            <p>Search for a city to see the weather</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MainContent;