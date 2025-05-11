import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";

// Class labels
const CLASS_LABELS = {
  "0": "Good Morning", "1": "Good Afternoon", "2": "Good Evening", "3": "Hello",
  "4": "How Are You", "5": "I'm Fine", "6": "Thank You", "7": "You're Welcome",
  "8": "What is Your Name", "9": "My Name is", "10": "Who Are You", "11": "Where Are You",
  "12": "When", "13": "Why", "14": "Which", "15": "Excuse Me", "16": "I Like You",
  "17": "I Love You", "18": "I'm Sorry", "19": "Please", "20": "Yes", "21": "No",
  "22": "I Understand", "23": "I Don't Understand", "24": "See You Later",
  "25": "See You Tomorrow", "26": "Wait", "27": "Maybe", "28": "Take Care",
  "29": "Come Let's Eat", "30": "Nice to Meet You", "31": "We're the Same",
  "32": "Calm Down", "33": "What", "34": "What's Up", "35": "Which is Better",
  "36": "How", "37": "How Old Are You", "38": "See You Again", "39": "What's Wrong"
};

// Translations
const TRANSLATIONS = {
  "Good Morning": "Magandang Umaga", "Good Afternoon": "Magandang Hapon", "Good Evening": "Magandang Gabi",
  "Hello": "Kumusta", "How Are You": "Kumusta Ka", "I'm Fine": "Ayos Lang Ako", "Thank You": "Salamat",
  "You're Welcome": "Walang Anuman", "What is Your Name": "Ano ang Pangalan Mo", "My Name is": "Ang Pangalan Ko Ay",
  "Who Are You": "Sino Ka", "Where Are You": "Saan Ka", "When": "Kailan", "Why": "Bakit", "Which": "Alin",
  "Excuse Me": "Paumanhin", "I Like You": "Gusto Kita", "I Love You": "Mahal Kita", "I'm Sorry": "Pasensya Na",
  "Please": "Pakiusap", "Yes": "Oo", "No": "Hindi", "I Understand": "Naiintindihan Ko",
  "I Don't Understand": "Hindi Ko Naiintindihan", "See You Later": "Kita Tayo Mamaya",
  "See You Tomorrow": "Kita Tayo Bukas", "Wait": "Hintay", "Maybe": "Siguro", "Take Care": "Ingat",
  "Come Let's Eat": "Halika, Kain Tayo", "Nice to Meet You": "Ikinagagalak Kitang Makilala",
  "We're the Same": "Magkapareho Tayo", "Calm Down": "Kalma Lang", "What": "Ano",
  "What's Up": "Anong Balita", "Which is Better": "Alin ang Mas Maganda", "How": "Paano",
  "How Old Are You": "Ilang Taon Ka Na", "See You Again": "Kita Ulit", "What's Wrong": "Anong Problema"
};

const LOCAL_URL = "http://127.0.0.1:10000/detect";
const PROD_URL = "https://2680-112-206-70-231.ngrok-free.app/detect"; // Change this
const API_URL = window.location.hostname === "localhost" ? LOCAL_URL : PROD_URL;

function ThirdPage() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [displayText, setDisplayText] = useState("Walang kilos na nadetect");
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "English");
  const [lastSpoken, setLastSpoken] = useState("");

  const speakText = useCallback((text) => {
    if (!window.speechSynthesis || text === lastSpoken) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "Filipino" ? "fil-PH" : "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setLastSpoken(text);
  }, [language, lastSpoken]);

  const drawBoxes = useCallback((detections) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    detections.forEach(({ box, class: classId, confidence }) => {
      const [x1, y1, x2, y2] = box;
      const label = CLASS_LABELS[String(classId)] || "Unknown";
      const confText = confidence ? ` (${(confidence * 100).toFixed(1)}%)` : "";
      ctx.strokeStyle = "#00ff00";
      ctx.lineWidth = 2;
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
      ctx.fillStyle = "#00ff00";
      ctx.font = "16px Arial";
      ctx.fillText(`${label}${confText}`, x1, y1 - 10);
    });
  }, []);

  const captureFrame = useCallback(async () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    try {
      const blob = await (await fetch(imageSrc)).blob();
      const formData = new FormData();
      formData.append("file", blob);

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.detections?.length) {
        drawBoxes(data.detections);
        const engPhrase = CLASS_LABELS[String(data.detections[0].class)] || "Unknown";
        const translated = language === "Filipino" ? TRANSLATIONS[engPhrase] || engPhrase : engPhrase;
        setDisplayText(translated);
        speakText(translated);
      } else {
        const ctx = canvasRef.current?.getContext("2d");
        ctx?.clearRect(0, 0, 640, 480);
        setDisplayText(language === "Filipino" ? "Walang kilos na nadetect" : "No gesture detected");
      }
    } catch (err) {
      console.error("❌ Detection error:", err);
      setDisplayText(language === "Filipino" ? "Hindi mabasa ang kilos" : "Detection error");
    }
  }, [drawBoxes, language, speakText]);

  useEffect(() => {
    const interval = setInterval(captureFrame, 1500);
    return () => clearInterval(interval);
  }, [captureFrame]);

  return (
    <div style={{ backgroundColor: "#000", color: "#fff", textAlign: "center", minHeight: "100vh", paddingTop: "20px" }}>
      <h2>Real-Time Gesture Detection</h2>

      <div style={{ position: "relative", width: 640, height: 480, margin: "auto" }}>
        <Webcam
          ref={webcamRef}
          width={640}
          height={480}
          screenshotFormat="image/jpeg"
          videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
          style={{ borderRadius: "12px" }}
        />
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>

      <div style={{ marginTop: "20px", width: 640, margin: "auto", padding: 10, border: "2px solid #fff", borderRadius: 12 }}>
        <p style={{ fontSize: "1.5rem" }}>{displayText}</p>
      </div>

      <select
        value={language}
        onChange={(e) => {
          const selectedLang = e.target.value;
          setLanguage(selectedLang);
          localStorage.setItem("lang", selectedLang);
          setLastSpoken("");
        }}
        style={{ marginTop: "20px", padding: "10px", fontSize: "1rem" }}
      >
        <option value="English">English</option>
        <option value="Filipino">Filipino</option>
      </select>
    </div>
  );
}

export default ThirdPage;
