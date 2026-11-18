// src/App.jsx
// Main application component assembling all sections
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MatrixRain from "./components/MatrixRain";

// Sections
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
import Contact from "./sections/Contact";

// ============================================================
// LOADING SCREEN
// ============================================================
const LoadingScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing...");

  const statuses = [
    "Initializing system...",
    "Loading portfolio data...",
    "Rendering components...",
    "Loading projects...",
    "Ready!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 2;
        const statusIndex = Math.floor(next / 25);
        if (statuses[statusIndex]) setStatus(statuses[statusIndex]);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 300);
        }
        return Math.min(next, 100);
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[200] bg-[#0d0d1a] flex flex-col items-center justify-center"
    >
      {/* Background grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30" />

      {/* Logo */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="mb-12 text-center"
      >
        <h1 className="font-display text-5xl font-black gradient-text mb-2">ABHISHEK SHARMA</h1>
        <p className="font-mono text-xs text-gray-600">Forward Deployed Engineer · Generative AI</p>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-80 space-y-4">
        <div className="progress-bar h-1">
          <motion.div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between font-mono text-xs">
          <span className="text-[#00ff88]">{status}</span>
          <span className="text-[#00d4ff]">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// SCROLL TO TOP BUTTON
// ============================================================
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-6 z-40 w-10 h-10 rounded-xl glass border border-[#00d4ff]/30 flex items-center justify-center text-[#00d4ff] hover:bg-[#00d4ff]/10 transition-all duration-300"
          title="Back to top"
        >
          <span className="text-sm">↑</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// ============================================================
// APP
// ============================================================
function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          {/* Noise texture (subtle) */}
          <div className="noise-overlay" />

          {/* Matrix rain in background */}
          <MatrixRain />

          {/* Navigation */}
          <Navbar />

          {/* Main Content */}
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Education />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />

          {/* Scroll to top */}
          <ScrollToTop />
        </>
      )}
    </>
  );
}

export default App;
