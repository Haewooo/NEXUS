// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { FaSearch } from 'react-icons/fa';
import './Home.css';

function Home() {
  const [placeholderText, setPlaceholderText] = useState("The next step, personalized AI");

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nums = '01';
    const alphabet = nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const drops = Array.from({ length: columns }, () => 0);

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0'; 
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, index) => {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        const x = index * fontSize;

        ctx.fillText(text, x, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[index] = 0;
        } else {
          drops[index]++;
        }
      });
    }

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      document.body.removeChild(canvas);
    };
  }, []);

  return (
    <div className="home">
      <Navbar />
      <div className="home-content">
        <div className="nexus-title">
          <span>N</span>
          <span>E</span>
          <span>X</span>
          <span>U</span>
          <span>S</span>
        </div>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder={placeholderText} 
            onFocus={() => setPlaceholderText('')} 
            onBlur={() => setPlaceholderText("The next step, personalized AI")} 
          />
        </div>
      </div>
    </div>
  );
}

export default Home;