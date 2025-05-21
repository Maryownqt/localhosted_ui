// src/ui/firstpage/thirdpage/ThirdPageAbout.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
        backgroundImage: 'url("./images/bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          backgroundColor: '#14532d',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
          color: '#ffffff',
          lineHeight: '1.6',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
          About the System
        </h1>

        <p>
          This desktop-only application recognizes Filipino Sign Language in
          real time. Hands are detected with YOLOv8, keypoints extracted via
          MediaPipe, and a BERT-based transformer encodes the sequence to
          classify each gesture. A FastAPI backend serves the model and a
          React/Canvas frontend displays live video, bounding boxes, and
          speech feedback.
        </p>

        <h2 style={{ marginTop: '20px' }}>Key Technologies:</h2>
        <ul style={{ marginLeft: '20px' }}>
          <li>🖐️ <strong>YOLOv8</strong> for real-time hand detection</li>
          <li>📐 <strong>MediaPipe Hands</strong> for 3D keypoint extraction</li>
          <li>🤖 <strong>BERT-based transformer</strong> for temporal sequence classification</li>
          <li>🚀 <strong>FastAPI + Uvicorn</strong> for model serving</li>
          <li>⚛️ <strong>React</strong> + react-webcam + Canvas for UI</li>
          <li>🔊 <strong>Web Speech API</strong> for voice synthesis</li>
        </ul>

        <h2 style={{ marginTop: '20px' }}>Features:</h2>
        <ul style={{ marginLeft: '20px' }}>
          <li>✅ Multi-hand detection with expanded bounding boxes</li>
          <li>⏳ 20-frame buffering with 5 s “hold” of last gesture</li>
          <li>🖥️ Desktop web only (no mobile support)</li>
          <li>🔄 Language toggle (English / Filipino) with speech output</li>
          <li>🌐 Local-network support via CORS-enabled FastAPI</li>
        </ul>

        <p style={{ marginTop: '20px' }}>
          Enables accessible communication by translating sign language into
          spoken and written text for hearing and Deaf users alike.
        </p>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              backgroundColor: '#ffffff',
              color: '#14532d',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
