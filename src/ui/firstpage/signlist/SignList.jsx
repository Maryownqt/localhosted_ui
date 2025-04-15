import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SIGN_LANGUAGES = {
    "Good Morning": "Magandang Umaga",
    "Good Afternoon": "Magandang Hapon",
    "Good Evening": "Magandang Gabi",
    "Hello": "Kumusta",
    "How Are You": "Kumusta Ka",
    "I'm Fine": "Ayos Lang Ako",
    "Thank You": "Salamat",
    "You're Welcome": "Walang Anuman",
    "What is Your Name": "Ano ang Pangalan Mo",
    "My Name is": "Ang Pangalan Ko Ay",
    "Who Are You": "Sino Ka",
    "Where Are You": "Saan Ka",
    "When": "Kailan",
    "Why": "Bakit",
    "Which": "Alin",
    "Excuse Me": "Paumanhin",
    "I Like You": "Gusto Kita",
    "I Love You": "Mahal Kita",
    "I'm Sorry": "Pasensya Na",
    "Please": "Pakiusap",
    "Yes": "Oo",
    "No": "Hindi",
    "I Understand": "Naiintindihan Ko",
    "I Don't Understand": "Hindi Ko Naiintindihan",
    "See You Later": "Kita Tayo Mamaya",
    "See You Tomorrow": "Kita Tayo Bukas",
    "Wait": "Hintay",
    "Maybe": "Siguro",
    "Take Care": "Ingat",
    "Come Let's Eat": "Halika, Kain Tayo",
    "Nice to Meet You": "Ikinagagalak Kitang Makilala",
    "We're the Same": "Magkapareho Tayo",
    "Calm Down": "Kalma Lang",
    "What": "Ano",
    "What's Up": "Anong Balita",
    "Which is Better": "Alin ang Mas Maganda",
    "How": "Paano",
    "How Old Are You": "Ilang Taon Ka Na",
    "See You Again": "Kita Ulit",
    "What's Wrong": "Anong Problema"
};

function SignList() {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    return (
        <div
            style={{
                minHeight: "100vh",
                padding: "40px",
                fontFamily: "Arial, sans-serif",
                backgroundImage: 'url("./images/bg.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    maxWidth: "1100px",
                    backgroundColor: "#14532d",
                    borderRadius: "15px",
                    padding: "30px",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                    color: "#ffffff",
                    lineHeight: "1.6",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
            >
                <h1 style={{ textAlign: "center", color: "#ffffff", marginBottom: "20px" }}>
                    Sign Language List
                </h1>
                <div
                    style={{
                        maxHeight: "60vh",
                        overflowY: "auto",
                        backgroundColor: "#0f3d21",
                        borderRadius: "10px",
                        padding: "20px",
                        color: "#ffffff",
                    }}
                >
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th
                                    style={{
                                        textAlign: "left",
                                        padding: "10px",
                                        borderBottom: "2px solid #ffffff",
                                        color: "#ffffff",
                                        fontSize: "1.5rem",
                                        fontWeight: "bold",
                                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                                    }}
                                >
                                    English
                                </th>
                                <th
                                    style={{
                                        textAlign: "left",
                                        padding: "10px",
                                        borderBottom: "2px solid #ffffff",
                                        color: "#ffffff",
                                        fontSize: "1.5rem",
                                        fontWeight: "bold",
                                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                                    }}
                                >
                                    Filipino
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(SIGN_LANGUAGES).map(([english, filipino], index) => (
                                <tr key={index}>
                                    <td
                                        style={{
                                            padding: "10px",
                                            borderBottom: "1px solid #ffffff",
                                            color: "#ffffff",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        {english}
                                    </td>
                                    <td
                                        style={{
                                            padding: "10px",
                                            borderBottom: "1px solid #ffffff",
                                            color: "#ffffff",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        {filipino}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        marginTop: "20px",
                        backgroundColor: "#ffffff",
                        color: "#14532d",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "all 0.3s ease",
                    }}
                >
                    Back
                </button>
            </div>
        </div>
    );
}

export default SignList;
