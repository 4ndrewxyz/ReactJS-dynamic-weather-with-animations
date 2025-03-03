import React from 'react';
import './css/clouds.css';

const Clouds = () => {
    return (
        <div class="wrapper" data-weather="cloudy">
        <div class="weather-effects cloudy">
          <div class="cloud cloud1"></div>
          <div class="cloud cloud2"></div>
          <div class="cloud cloud3"></div>
        </div>
      </div>
    );
};

export default Clouds;