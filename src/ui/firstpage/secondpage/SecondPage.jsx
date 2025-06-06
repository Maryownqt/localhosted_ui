import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SecondPage() {
  const [language, setLanguage] = useState('');
  const [voice, setVoice] = useState('');
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // State for floating effect

  const navigate = useNavigate();

  // Load stored selections if user navigates back
  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    const savedVoice = localStorage.getItem("selectedVoice");

    if (savedLanguage) setLanguage(savedLanguage);
    if (savedVoice) setVoice(savedVoice);

    // Trigger the floating/transition effect when the component is mounted
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleContinue = () => {
    if (!language || !voice) {
      setError(true); // Show error if required fields are not selected
    } else {
      setError(false);

      // Store selections in localStorage
      localStorage.setItem("selectedLanguage", language);
      localStorage.setItem("selectedVoice", voice);

      navigate('/third'); // Navigate to the third page
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url("./images/bg.png")', // Set the background image
        backgroundSize: 'cover', // Ensure the image covers the entire background
        backgroundPosition: 'center', // Center the image
        backgroundRepeat: 'no-repeat', // Prevent the image from repeating
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          background: 'rgba(11, 61, 46, 0.9)', // Matched dark green with semi-transparency
          width: '600px',
          borderRadius: '15px', // Rounded corners
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)', // Enhanced shadow for a floating effect
          padding: '30px',
          textAlign: 'center',
          opacity: isVisible ? 1 : 0, // Transition effect
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)', // Floating effect
          transition: 'opacity 0.5s ease, transform 0.5s ease', // Smooth transition
        }}
      >
        {/* Title */}
        <h1
          style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
        >
          Language and Voice Selection
        </h1>

        {/* Top Section - Images */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginBottom: '20px',
          }}
        >
          <img
            src="./images/cealogo.jpg"
            alt="CEA Logo"
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'contain',
              border: '2px solid white', // White border to match the theme
              borderRadius: '10px',
              padding: '5px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)', // Subtle white background
            }}
          />
          <img
            src="./images/cpelogo.png"
            alt="CPE Logo"
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'contain',
              border: '2px solid white',
              borderRadius: '10px',
              padding: '5px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
        </div>

        {/* Divider */}
        <hr
          style={{
            width: '90%',
            border: 'none',
            borderBottom: '1px solid white',
            margin: '20px 0',
          }}
        />

        {/* Middle Section - Language and Voice Selection */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '20px',
          }}
        >
          {/* Language Selection */}
          <div style={{ textAlign: 'left', width: '45%' }}>
            <p
              style={{
                color: 'white',
                fontWeight: 'bold',
                marginBottom: '10px',
              }}
            >
              Choose Language:
            </p>
            <select
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                borderRadius: '5px',
                border: '1px solid white',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="">Select Language</option>
              <option value="English">English</option>
              <option value="Filipino">Filipino</option>
            </select>
          </div>

          {/* Voice Selection */}
          <div style={{ textAlign: 'left', width: '45%' }}>
            <p
              style={{
                color: 'white',
                fontWeight: 'bold',
                marginBottom: '10px',
              }}
            >
              Select Voice:
            </p>
            <select
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                borderRadius: '5px',
                border: '1px solid white',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }}
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
            >
              <option value="">Select Voice</option>
              <option value="Boy">Boy</option>
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p style={{ color: 'red', marginTop: '10px' }}>
            Please select both language and voice.
          </p>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%' }}>
          {/* Back Button */}
          <button
            style={{
              backgroundColor: 'white',
              color: 'green',
              border: '2px solid white',
              borderRadius: '10px',
              padding: '12px 25px',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '20px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s ease',
            }}
            onClick={() => navigate('/')} // Navigate back to the first page
          >
            Back
          </button>

          {/* Continue Button */}
          <button
            style={{
              backgroundColor: 'white',
              color: 'green',
              border: '2px solid white',
              borderRadius: '10px',
              padding: '12px 25px',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '20px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s ease',
            }}
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default SecondPage;