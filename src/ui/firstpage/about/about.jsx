import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function About() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false); // State for floating effect

    useEffect(() => {
        // Trigger the floating/transition effect when the component is mounted
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    return (
        <div
            style={{
                minHeight: '100vh',
                padding: '40px',
                fontFamily: 'Arial, sans-serif',
                backgroundImage: 'url("./images/bg.png")', // Set the background image
                backgroundSize: 'cover', // Ensure the image covers the entire background
                backgroundPosition: 'center', // Center the image
                backgroundRepeat: 'no-repeat', // Prevent the image from repeating
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
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)', // Enhanced shadow
                    color: '#ffffff',
                    lineHeight: '1.6',
                    opacity: isVisible ? 1 : 0, // Transition effect
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)', // Floating effect
                    transition: 'opacity 0.5s ease, transform 0.5s ease', // Smooth transition
                }}
            >
                <h1 style={{ textAlign: 'center', color: '#ffffff', marginBottom: '20px' }}>
                    About the System
                </h1>

                <p>
                    The developed system is a sophisticated, user-friendly <strong>Filipino Sign Language (FSL) Recognition and Translation Application</strong> designed to bridge communication gaps between hearing and Deaf communities.
                </p>

                <h2 style={{ color: '#ffffff', marginTop: '20px' }}>Key Technologies:</h2>
                <ul style={{ marginLeft: '20px' }}>
                    <li>🖐️ Computer Vision (<strong>YOLOv8</strong>) for real-time hand detection.</li>
                    <li>🧠 Deep Learning (<strong>CNN-LSTM/GRU</strong>) for gesture classification.</li>
                    <li>🌐 Natural Language Processing (<strong>NLP</strong>) for language translation between Filipino and English.</li>
                </ul>

                <h2 style={{ color: '#ffffff', marginTop: '20px' }}>Features:</h2>
                <ul style={{ marginLeft: '20px' }}>
                    <li>⚙️ Serverless backend hosted on AWS Lambda for scalability and reliability.</li>
                    <li>🔥 Firebase hosting for responsive, robust frontend delivery.</li>
                    <li>🔊 Voice synthesis and real-time translation for seamless communication.</li>
                </ul>

                <p style={{ marginTop: '20px' }}>
                    This solution fosters inclusivity and understanding, enabling natural communication for all users. The system promotes accessibility and provides a bridge between the Deaf and hearing communities.
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
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
                    <button
                        onClick={() => navigate('/signlist')}
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
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default About;