import FirstPage from './ui/firstpage/firstpage/FirstPage';
import SecondPage from './ui/firstpage/secondpage/SecondPage';
import ThirdPage from './ui/firstpage/thirdpage/ThirdPage';
import About from './ui/firstpage/about/about';
import SignList from './ui/firstpage/signlist/SignList';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/second" element={<SecondPage />} />
        <Route path="/third" element={<ThirdPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/signlist" element={<SignList />} />
      </Routes>
    </Router>
  );
}

export default App;