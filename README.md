# Weather App - Dynamic React Weather Application

## Overview
A modern, responsive weather application built with React that provides real-time weather information with beautiful, animated backgrounds that change based on weather conditions. The app features smooth transitions between different weather states and an intuitive user interface.

## Features
- **Real-time Weather Data**: Fetches current weather information from OpenWeatherMap API
- **Dynamic Backgrounds**: Beautiful gradient backgrounds that animate and change based on weather conditions
- **Weather Effects**: Visual effects that enhance the weather experience (rain, sun, clouds, etc.)
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Smooth Transitions**: Elegant animations when switching between weather states
- **Weather Details**: Temperature, humidity, wind speed, and weather condition
- **Error Handling**: Graceful error notifications for invalid cities or API issues
- **Random City Feature**: Discover the weather in random cities around the world

## Technologies Used
- React.js
- CSS3 with advanced animations
- OpenWeatherMap API
- Modern JavaScript (ES6+)

## Install 
Add your API Key in MainContent.js
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
```

## How It Works
The application uses React's state management to handle user interactions and API responses. When a user searches for a city, the app fetches weather data from the OpenWeatherMap API and applies the appropriate visual styles based on the current weather condition. The background animations are created using CSS gradients and keyframe animations, providing a dynamic and engaging user experience.

## API Reference
This project uses the [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather data. You'll need to sign up for a free API key to use this application.

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements
- Weather forecasts for upcoming days
- User location detection
- Save favorite locations
- Dark/light theme toggle
- More detailed weather information
