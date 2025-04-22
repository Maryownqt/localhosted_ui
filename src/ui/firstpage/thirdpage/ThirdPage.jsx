import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import CLASS_LABELS from "../../../utils/40_classes_labels.json";

// Translation dictionary
const TRANSLATIONS = {
  English: CLASS_LABELS,
  Filipino: {
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
  }
};

function ThirdPage() {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState("Walang kilos na nadetect");
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "English");
  const [loading, setLoading] = useState(false);
  const [lastSpoken, setLastSpoken] = useState("");

  // ✅ Use your ngrok endpoint here
  const API_URL = "https://a3f7-182-255-40-170.ngrok-free.app/detect";

  const speakText = useCallback((text) => {
    if (!window.speechSynthesis || text === lastSpoken) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "Filipino" ? "fil-PH" : "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setLastSpoken(text);
  }, [language, lastSpoken]);

  const captureFrame = useCallback(async () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    const blob = dataURItoBlob(imageSrc);
    const formData = new FormData();
    formData.append("file", blob);

    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.detections && data.detections.length > 0) {
        const top = data.detections[0];
        const classId = top.class;
        const label = CLASS_LABELS[String(classId)] || `Class ${classId}`;
        const translated = TRANSLATIONS[language][label] || label;
        setDisplayText(translated);
        speakText(translated);
      } else {
        const fallback = language === "Filipino" ? "Walang kilos na nadetect" : "No gesture detected";
        setDisplayText(fallback);
      }
    } catch (err) {
      console.error("Detection error:", err);
      setDisplayText(language === "Filipino" ? "Hindi nababasa" : "Detection error");
    } finally {
      setLoading(false);
    }
  }, [language, speakText]);

  useEffect(() => {
    const interval = setInterval(captureFrame, 1500);
    return () => clearInterval(interval);
  }, [captureFrame]);

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  };

  const handleLangChange = (e) => {
    const selected = e.target.value;
    setLanguage(selected);
    localStorage.setItem("lang", selected);
    setLastSpoken("");
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: 'url("./images/bg.png")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}>
      <div style={{
        width: "640px",
        height: "480px",
        border: "2px solid white",
        borderRadius: "15px",
        backgroundColor: "black"
      }}>
        <Webcam
          ref={webcamRef}
          width="640"
          height="480"
          screenshotFormat="image/jpeg"
          screenshotQuality={0.9}
          videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
        />
      </div>

      <div style={{
        marginTop: "20px",
        width: "640px",
        padding: "10px",
        border: "2px solid white",
        borderRadius: "15px",
        backgroundColor: "black",
        color: "white",
        textAlign: "center"
      }}>
        {loading ? (
          <p style={{ fontSize: "1.5rem" }}>{language === "Filipino" ? "Kinukuha..." : "Detecting..."}</p>
        ) : (
          <p style={{ fontSize: "1.5rem" }}>{displayText}</p>
        )}
      </div>

      <select value={language} onChange={handleLangChange} style={{ marginTop: "10px", padding: "10px" }}>
        <option value="English">English</option>
        <option value="Filipino">Filipino</option>
      </select>

      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        {language === "Filipino" ? "Bumalik" : "Go Back"}
      </button>
    </div>
  );
}

export default ThirdPage;
