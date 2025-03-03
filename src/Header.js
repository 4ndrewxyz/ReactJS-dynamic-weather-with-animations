import React, { useEffect, useState } from 'react';
import './css/Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <h1>Weather</h1>
      </div>
      <nav className="navigation">
        <ul>
          <li><a href="/" className="active">Today</a></li>
          <li><a href="/forecast">Forecast</a></li>
          <li><a href="/map">Map</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;