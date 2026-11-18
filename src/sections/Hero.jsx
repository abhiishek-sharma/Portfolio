// src/sections/Hero.jsx
// Hero section with typing animation and real-world profile photo system
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import portfolioData from "../config/portfolioData";

// ============================================================
// PROFILE MOODS ─ user switches between vibe/look presets
// Each mood changes the glow color + label, but uses the same
// real photo. Just swap `photoUrl` in portfolioData.personal.
// ============================================================
const MOODS = [
    {
        key: "focused",
        label: "Focused",
        emoji: "🎯",
        color: "#00d4ff",
        ring: "from-cyan-400 to-blue-600",
        caption: "// In the zone. Building the future.",
        theme: { primary: "#00d4ff", secondary: "#8b5cf6" }, // Cyan / Purple
    },
    {
        key: "creative",
        label: "Creative",
        emoji: "💡",
        color: "#8b5cf6",
        ring: "from-purple-400 to-indigo-600",
        caption: "// Design + code = magic.",
        theme: { primary: "#8b5cf6", secondary: "#ff006e" }, // Purple / Pink
    },
    {
        key: "chill",
        label: "Chilling",
        emoji: "☕",
        color: "#00ff88",
        ring: "from-emerald-400 to-teal-600",
        caption: "// Coffee + lo-fi + code.",
        theme: { primary: "#00ff88", secondary: "#00d4ff" }, // Green / Cyan
    },
    {
        key: "grind",
        label: "Grinding",
        emoji: "🔥",
        color: "#ff8c00",
        ring: "from-orange-400 to-red-500",
        caption: "// No shortcuts. Just ship it.",
        theme: { primary: "#ff8c00", secondary: "#ffd60a" }, // Orange / Yellow
    },
    {
        key: "curious",
        label: "Curious",
        emoji: "🔭",
        color: "#ffd60a",
        ring: "from-yellow-400 to-amber-500",
        caption: "// Always asking 'what if?'",
        theme: { primary: "#ffd60a", secondary: "#00ff88" }, // Yellow / Green
    },
];

// ============================================================
// HERO COMPONENT
// ============================================================
const Hero = () => {
    const { personal } = portfolioData;
    const mood = MOODS[0];
    const [glitchOn, setGlitchOn] = useState(false);
    const [imgError, setImgError] = useState(false);

    // Apply global theme color changes when mood changes
    useEffect(() => {
        document.documentElement.style.setProperty("--cyber-blue", mood.theme.primary);
        document.documentElement.style.setProperty("--cyber-purple", mood.theme.secondary);
    }, [mood]);

    // Periodic name-glitch
    useEffect(() => {
        const t = setInterval(() => {
            setGlitchOn(true);
            setTimeout(() => setGlitchOn(false), 180);
        }, 6000);
        return () => clearInterval(t);
    }, []);

    const typingSeq = personal.roles.flatMap((r) => [r, 2200]);

    const scrollTo = (id) =>
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* ── Backgrounds ─────────────────────── */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,#1a1a2e,#0d0d1a_70%)]" />
            <div className="absolute inset-0 cyber-grid-bg opacity-30" />
            <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] rounded-full bg-[#00d4ff]/4 blur-3xl" />
            <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] rounded-full bg-[#8b5cf6]/4 blur-3xl" style={{ animationDelay: "2s" }} />
            <div className="scan-line" />

            {/* ── Main grid ───────────────────────── */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* ══ LEFT — Text ══════════════════════════════════ */}
                    <div className="text-center lg:text-left order-2 lg:order-1">

                        {/* Status badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00d4ff]/20 text-[#00d4ff] text-sm font-mono mb-6"
                        >
                            <HiSparkles className="animate-spin-slow" />
                            <span>Available for Opportunities</span>
                            <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                        </motion.div>

                        {/* Name */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="font-display text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight"
                        >
                            <span className="text-white">I'm</span>
                            <br />
                            <span
                                className={`gradient-text inline-block ${glitchOn ? "opacity-80 translate-x-0.5" : ""}`}
                                style={{ transition: "all 0.05s" }}
                            >
                                {personal.name}
                            </span>
                        </motion.h1>

                        {/* Typing role */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl md:text-2xl font-mono font-semibold mb-6 min-h-[36px]"
                        >
                            <span className="text-gray-500">{">"} </span>
                            <TypeAnimation
                                sequence={typingSeq}
                                wrapper="span"
                                speed={55}
                                repeat={Infinity}
                                style={{ color: "var(--cyber-blue)", display: "inline" }}
                            />
                            <span className="cursor-blink text-[#00d4ff] ml-1">|</span>
                        </motion.div>

                        {/* Bio */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-gray-400 text-lg leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0"
                        >
                            {personal.tagline}
                        </motion.p>

                        {/* Location */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center justify-center lg:justify-start gap-3 text-sm font-mono mb-8"
                        >
                            <span className="text-gray-500">📍 {personal.location}</span>
                            <span className="text-gray-700">·</span>
                            <span className="text-gray-500">💼 {portfolioData.contact.availability}</span>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => scrollTo("projects")}
                                className="btn-cyber text-white"
                            >
                                View Projects
                            </motion.button>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href={personal.resume}
                                download
                                className="btn-outline-cyber flex items-center gap-2"
                            >
                                <FaDownload className="text-xs" /> Resume
                            </motion.a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.65 }}
                            className="flex items-center gap-5 justify-center lg:justify-start"
                        >
                            {[
                                { icon: FaGithub, href: personal.github, label: "GitHub", hover: "hover:text-white" },
                                { icon: FaLinkedin, href: personal.linkedin, label: "LinkedIn", hover: "hover:text-blue-400" },
                            ].map(({ icon: Icon, href, label, hover }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.25, y: -3 }}
                                    className={`text-gray-600 ${hover} text-xl transition-colors duration-300`}
                                    title={label}
                                >
                                    <Icon />
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>

                    {/* ══ RIGHT — Profile Photo ════════════════════════ */}
                    <motion.div
                        initial={{ opacity: 0, x: 60, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="flex flex-col items-center gap-6 order-1 lg:order-2"
                    >
                        {/* Photo Frame */}
                        <div className="relative">
                            {/* Outer atmosphere glow */}
                            <div
                                className="absolute -inset-8 rounded-full blur-2xl opacity-20 transition-all duration-700"
                                style={{ background: `radial-gradient(circle, ${mood.color}, transparent 70%)` }}
                            />

                            {/* Spinning decorative rings */}
                            <div className="absolute -inset-4 rounded-full border border-dashed pointer-events-none" style={{ borderColor: `${mood.color}40` }} />

                            {/* Photo circle */}
                            <motion.div
                                key={mood.key}
                                initial={{ scale: 0.92, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.35 }}
                                className="relative w-80 h-80 md:w-[26rem] md:h-[26rem] rounded-full overflow-hidden"
                                style={{
                                    border: `3px solid ${mood.color}60`,
                                    boxShadow: `0 0 30px ${mood.color}40, 0 0 60px ${mood.color}15`,
                                }}
                            >
                                {/* Gradient ring border — animated */}
                                <div
                                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${mood.ring} opacity-10 z-10 pointer-events-none`}
                                />

                                {/* ── Actual profile photo ── */}
                                {(personal.photoUrl) && !imgError ? (
                                    <img
                                        src={personal.photoUrl}
                                        alt={personal.name}
                                        className="w-full h-full object-cover object-center"
                                        onError={() => setImgError(true)}
                                    />
                                ) : (
                                    /* Placeholder when no photo is set */
                                    <div
                                        className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${mood.ring} bg-opacity-20`}
                                        style={{ background: `linear-gradient(135deg, ${mood.color}20, #1a1a2e)` }}
                                    >
                                        <div className="text-7xl mb-2 float-animation">
                                            {mood.emoji}
                                        </div>
                                        <div className="font-display font-black text-4xl gradient-text">
                                            {personal.name
                                                .split(" ")
                                                .map((w) => w[0])
                                                .join("")}
                                        </div>
                                        <p className="font-mono text-xs text-gray-600 mt-2 text-center px-4">
                                            Add photo via
                                            <br />
                                            <span className="text-[#00d4ff]">portfolioData.personal.photoUrl</span>
                                        </p>
                                    </div>
                                )}

                                {/* Subtle scan line on hover */}
                                <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-white/2 to-transparent pointer-events-none" />
                            </motion.div>                        </div>                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
                    >
                        <div className="w-1 h-2 rounded-full bg-[#00d4ff] opacity-60" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
