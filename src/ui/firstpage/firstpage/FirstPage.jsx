import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FirstPage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false); // State for floating effect

  useEffect(() => {
    // Trigger the floating/transition effect when the component is mounted
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url("./images/children.png")', // Set the background image
        backgroundSize: 'cover', // Ensure the image covers the entire background
        backgroundPosition: 'center', // Center the image
        backgroundRepeat: 'no-repeat', // Prevent the image from repeating
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          background: 'rgba(11, 61, 46, 0.9)', // Dark green with semi-transparency
          width: '420px',
          height: '420px',
          borderRadius: '15px', // Rounded corners
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)', // Enhanced shadow
          padding: '20px',
          textAlign: 'center',
          border: '3px solid white', // Added white border
          opacity: isVisible ? 1 : 0, // Transition effect
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)', // Floating effect
          transition: 'opacity 0.5s ease, transform 0.5s ease', // Smooth transition
        }}
      >
        <h1 style={{ color: 'white', fontSize: '24px', marginBottom: '20px' }}>
          SignSpeak
        </h1>
        <img
          src="./images/phinmalogo.jpg"
          alt="Phinma Logo"
          style={{
            width: '150px',
            height: '150px',
            objectFit: 'cover',
            marginBottom: '20px',
          }}
        />
        <button
          style={{
            backgroundColor: 'white',
            color: 'green',
            border: '2px solid green',
            borderRadius: '10px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            marginBottom: '10px',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
          onClick={() => navigate('/second')}
        >
          Start
        </button>
        <button
          style={{
            backgroundColor: 'white',
            color: 'green',
            border: '2px solid green',
            borderRadius: '10px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
          onClick={() => navigate('/about')}
        >
          About
        </button>
      </div>
    </div>
  );
}

export default FirstPage;