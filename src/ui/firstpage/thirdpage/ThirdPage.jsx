// src/ui/firstpage/thirdpage/ThirdPage.jsx

import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo
} from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

// Gesture ID → English label
const CLASS_LABELS = {
  0: "Good Morning", 1: "Good Afternoon", 2: "Good Evening", 3: "Hello",
  4: "How Are You", 5: "I'm Fine", 6: "Thank You", 7: "You're Welcome",
  8: "What is Your Name", 9: "My Name is", 10: "Who Are You", 11: "Where Are You",
  12: "When", 13: "Why", 14: "Which", 15: "Excuse Me", 16: "I Like You",
  17: "I Love You", 18: "I'm Sorry", 19: "Please", 20: "Yes", 21: "No",
  22: "I Understand", 23: "I Don't Understand", 24: "See You Later",
  25: "See You Tomorrow", 26: "Wait", 27: "Maybe", 28: "Take Care",
  29: "Come Let's Eat", 30: "Nice to Meet You", 31: "We're the Same",
  32: "Calm Down", 33: "What", 34: "What's Up", 35: "Which is Better",
  36: "How", 37: "How Old Are You", 38: "See You Again", 39: "What's Wrong"
};

// English → Filipino translation
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

// Tutorial video URLs per gesture
const VIDEO_URLS = {
  "Good Morning":      "https://www.youtube.com/watch?v=yxFJRQaB0kI",
  "Good Afternoon":    "https://www.youtube.com/watch?v=2bo_vUXVcs8",
  "Good Evening":      "https://www.youtube.com/watch?v=Rv6SUNPTPEQ",
  "Hello":             "https://www.youtube.com/watch?v=Phg1jaZpgdM",
  "How Are You":       "https://www.youtube.com/watch?v=OYQoOmoo9gw",
  "I'm Fine":          "https://www.youtube.com/watch?v=9f4cIt7jvVI",
  "Thank You":         "https://www.youtube.com/watch?v=sd0-Dar9vdU",
  "You're Welcome":    "https://www.youtube.com/watch?v=eo-Oii4mqJg",
  "What is Your Name": "https://www.youtube.com/watch?v=q5KOyEQR_34",
  "My Name is":        "https://www.youtube.com/watch?v=LleOJzdJX9s",
  "Who Are You":       "https://www.youtube.com/watch?v=88arVEAI55w",
  "Where Are You":     "https://www.youtube.com/watch?v=2aYYGigyNaY",
  "When":              "https://www.youtube.com/watch?v=VUrqUiLuV1I",
  "Why":               "https://www.youtube.com/watch?v=GZ_EHXU_cjE",
  "Which":             "https://www.youtube.com/watch?v=aLPZPyt5PD4",
  "Excuse Me":         "https://www.youtube.com/watch?v=rUwYwURE8hM",
  "I Like You":        "https://www.youtube.com/watch?v=AJQjzVCHx7I",
  "I Love You":        "https://www.youtube.com/watch?v=ZdjAMFZIXBU",
  "I'm Sorry":         "https://www.youtube.com/watch?v=XlrutI9M8jU",
  "Please":            "https://www.youtube.com/watch?v=6TJc-_IL5Ic",
  "Yes":               "https://www.youtube.com/watch?v=EPEF0ih-n2o",
  "No":                "https://www.youtube.com/watch?v=90gqMZ4uFz0",
  "I Understand":      "https://www.youtube.com/watch?v=y_2AhqklyHw",
  "I Don't Understand":"https://www.youtube.com/watch?v=70T3plhf4og",
  "See You Later":     "https://www.youtube.com/watch?v=VoDva1PAd2M",
  "See You Tomorrow":  "https://www.youtube.com/watch?v=V7tqbbORSbE",
  "Wait":              "https://www.youtube.com/watch?v=hiE1ANMZgb4",
  "Maybe":             "https://www.youtube.com/watch?v=iCwrN5ROg0c",
  "Take Care":         "https://www.youtube.com/watch?v=SXr8wbh78SU",
  "Come Let's Eat":    "https://www.youtube.com/watch?v=g1n7hD2M3vs",
  "Nice to Meet You":  "https://www.youtube.com/watch?v=Hmd-XTXyhog",
  "We're the Same":    "https://www.youtube.com/watch?v=vEPw1ACJVkY",
  "Calm Down":         "https://www.youtube.com/watch?v=UhMTpS1Umxg",
  "What":              "https://www.youtube.com/watch?v=CN5izbQ2eA4",
  "What's Up":         "https://www.youtube.com/watch?v=Way3Lq6mjcw",
  "Which is Better":   "https://www.youtube.com/watch?v=nSARaTtdoRc",
  "How":               "https://www.youtube.com/watch?v=rGsH1XSO5pI",
  "How Old Are You":   "https://www.youtube.com/watch?v=EUKqF1uCHlg",
  "See You Again":     "https://www.youtube.com/watch?v=vmINWHTJ508",
  "What's Wrong":      "https://www.youtube.com/watch?v=oVR8h9eksSA"
};

const NO_GESTURE_TEXT = {
  English: "No gesture detected",
  Filipino: "Walang kilos na nadetect"
};
const BASE_URL    = "http://localhost:10000";
const RESET_URL   = `${BASE_URL}/reset_buffer`;
const API_URL     = `${BASE_URL}/detect`;
const METRICS_URL = `${BASE_URL}/metrics`;


export default function ThirdPage() {
  const navigate = useNavigate();

  // session ID
  const sessionId = useRef(
    localStorage.getItem("sessionId") || uuidv4()
  );
  useEffect(() => {
    localStorage.setItem("sessionId", sessionId.current);
  }, []);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const storedLang = localStorage.getItem("lang") || "English";
  const [language, setLanguage]       = useState(storedLang);
  const [displayText, setDisplayText] = useState(NO_GESTURE_TEXT[storedLang]);
  const [lastSpoken, setLastSpoken]   = useState("");
  const [isRunning, setIsRunning]     = useState(false);
  const [canPredict, setCanPredict]   = useState(true);
  const [lastValidPhrase, setLastValidPhrase]     = useState("");
  const [lastDetectionTime, setLastDetectionTime] = useState(null);

  // metrics data (logic remains, no UI)
  const [metricsData, setMetricsData] = useState([]);

  // clear server buffer
  const resetBuffer = useCallback(async () => {
    await fetch(RESET_URL, {
      method: "POST",
      headers: { "X-Session-Id": sessionId.current }
    });
  }, []);

  // fetch metrics with correct handling of Prometheus text
  const fetchMetrics = useCallback(async () => {
    try {
      console.log("[LOG] Fetching /metrics …");
      const res = await fetch(METRICS_URL);
      console.log(`[LOG] /metrics status: ${res.status}`);
      if (!res.ok) {
        console.error("[ERROR] Metrics fetch failed:", res.status, res.statusText);
        return;
      }
      const contentType = res.headers.get("content-type") || "";
      let data;
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        data = text.trim() ? text.split("\n") : [];
      }
      console.log("[LOG] Parsed metrics:", data);
      setMetricsData(data);
    } catch (err) {
      console.error("[ERROR] fetching metrics exception:", err);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  // start detection
  const handleStart = useCallback(async () => {
    await resetBuffer();
    setDisplayText(NO_GESTURE_TEXT[language]);
    setLastSpoken("");
    setLastValidPhrase("");
    setLastDetectionTime(null);
    setIsRunning(true);
  }, [language, resetBuffer]);

  // language change
  const handleLanguageChange = useCallback(async (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    localStorage.setItem("lang", newLang);
    setDisplayText(NO_GESTURE_TEXT[newLang]);
    setLastSpoken("");
    setIsRunning(false);
    setLastValidPhrase("");
    setLastDetectionTime(null);
    await resetBuffer();
  }, [resetBuffer]);

  // speech synthesis
  const speakText = useCallback((text) => {
    if (!window.speechSynthesis || text === lastSpoken) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = language === "Filipino" ? "fil-PH" : "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
    setLastSpoken(text);
  }, [language, lastSpoken]);

  // draw bounding boxes
  const drawBoxes = useCallback((bboxes) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, 640, 480);
    ctx.strokeStyle = "#00ff00";
    ctx.lineWidth   = 2;
    bboxes.forEach(([x1, y1, x2, y2]) => {
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
    });
  }, []);

  // capture & predict
  const captureFrame = useCallback(async () => {
    if (!isRunning) return;
    const now = Date.now();
    const imgSrc = webcamRef.current?.getScreenshot({ width: 640, height: 480 });
    if (!imgSrc) return;

    const blob = await (await fetch(imgSrc)).blob();
    const form = new FormData();
    form.append("file", blob, "frame.jpg");

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "X-Session-Id": sessionId.current },
      body: form
    });
    if (!res.ok) return;
    const { gesture, bboxes } = await res.json();

    drawBoxes(bboxes);

    if (bboxes.length && canPredict) {
      const eng    = CLASS_LABELS[String(gesture)] || "Unknown";
      const phrase = language === "Filipino"
        ? TRANSLATIONS[eng] || eng
        : eng;
      setDisplayText(phrase);
      speakText(phrase);
      setLastValidPhrase(phrase);
      setLastDetectionTime(now);
      setCanPredict(false);
      setTimeout(() => setCanPredict(true), 3000);
    } else if (!bboxes.length) {
      if (lastDetectionTime && (now - lastDetectionTime) < 5000) {
        setDisplayText(lastValidPhrase);
      } else {
        setDisplayText(NO_GESTURE_TEXT[language]);
        setLastValidPhrase("");
        setLastDetectionTime(null);
        await resetBuffer();
      }
    }
  }, [
    isRunning, canPredict, language,
    drawBoxes, lastDetectionTime, lastValidPhrase,
    speakText, resetBuffer
  ]);

  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(captureFrame, 100);
    return () => clearInterval(id);
  }, [isRunning, captureFrame]);

  // memoized sign-card grid
  const signCards = useMemo(() => {
    return Object.entries(TRANSLATIONS).map(([eng, fil]) => {
      const url = VIDEO_URLS[eng];
      const vid = url?.split("v=")[1]?.split("&")[0];
      const thumb = vid
        ? `https://img.youtube.com/vi/${vid}/default.jpg`
        : null;

      return (
        <div
          key={eng}
          style={{
            backgroundColor: "#0f3d21",
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          {thumb && (
            <div style={{ position: "relative", cursor: "pointer" }}>
              <img
                src={thumb}
                alt={`${eng} thumbnail`}
                loading="lazy"
                style={{ width: "100%", display: "block" }}
              />
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: 32,
                  color: "rgba(255,255,255,0.9)",
                  textShadow: "0 0 6px rgba(0,0,0,0.7)"
                }}
              >
                ▶️
              </a>
            </div>
          )}
          <div style={{ padding: "8px 12px", flexGrow: 1 }}>
            <p style={{ margin: "4px 0", fontWeight: "bold" }}>{eng}</p>
            <p style={{ margin: 0, opacity: 0.8 }}>{fil}</p>
          </div>
          {!thumb && (
            <div style={{ padding: 12, textAlign: "center", color: "#888" }}>
              No tutorial
            </div>
          )}
        </div>
      );
    });
  }, []);

  return (
    <div style={{
      backgroundColor: "#000",
      color: "#fff",
      textAlign: "center",
      minHeight: "100vh",
      padding: 20,
      fontFamily: "Arial, sans-serif"
    }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          backgroundColor: "#fff",
          color: "#000",
          padding: "8px 16px",
          border: "none",
          borderRadius: 4,
          cursor: "pointer"
        }}
      >
        ← Back
      </button>

      <h2>Real-Time Gesture Detection</h2>

      {!isRunning && (
        <button
          onClick={handleStart}
          style={{
            backgroundColor: "#00ff00",
            color: "#000",
            padding: "10px 20px",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            marginBottom: 20,
            fontSize: "1rem"
          }}
        >
          Start
        </button>
      )}

      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: 640,
        margin: "20px auto",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
      }}>
        <Webcam
          ref={webcamRef}
          audio={false}
          width="100%"
          height="auto"
          screenshotFormat="image/jpeg"
          videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
        />
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
        />
      </div>

      <div style={{
        maxWidth: 640,
        margin: "auto",
        padding: 15,
        backgroundColor: "#111",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.4)"
      }}>
        <p style={{ margin: 0, fontSize: "1.2rem" }}>{displayText}</p>
      </div>

      <div style={{ marginTop: 20 }}>
        <select
          value={language}
          onChange={handleLanguageChange}
          style={{
            padding: 10,
            fontSize: "1rem",
            borderRadius: 6,
            border: "1px solid #555",
            backgroundColor: "#222",
            color: "#fff",
            minWidth: 200,
            cursor: "pointer"
          }}
        >
          <option value="English">English</option>
          <option value="Filipino">Filipino</option>
        </select>
      </div>

      {/* Metrics UI removed */}

      <div style={{
        maxWidth: 800,
        margin: "40px auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 16,
        padding: 10
      }}>
        {signCards}
      </div>
    </div>
  );
}
