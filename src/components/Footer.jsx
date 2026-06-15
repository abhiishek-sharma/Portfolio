// src/components/Footer.jsx
import { motion } from "framer-motion";
import portfolioData from "../config/portfolioData";

const Footer = () => {
    const { personal } = portfolioData;

    return (
        <footer className="relative py-10 border-t border-white/5">
            <div className="absolute inset-0 bg-[#080810]" />
            <div className="absolute inset-0 cyber-grid-bg opacity-10" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Logo */}
                    <div className="font-display font-bold text-lg tracking-wider">
                        <span className="gradient-text">DEV</span>
                        <span className="text-white">.FOLIO</span>
                        <span className="text-[#00d4ff] text-2xl leading-none">_</span>
                    </div>

                    {/* Center */}
                    <div className="text-center">
                        <p className="text-gray-600 font-mono text-xs">
                            Crafted with{" "}
                            <span className="text-red-500">♥</span>
                            {" "}by{" "}
                            <span className="text-[#00d4ff]">{personal.name}</span>
                        </p>
                        <p className="text-gray-700 font-mono text-xs mt-1">
                            © {new Date().getFullYear()} · Built with React + Tailwind + Framer Motion
                        </p>
                    </div>

                    {/* Terminal hint */}
                    <div className="font-mono text-xs text-gray-700 flex items-center gap-2">
                        <span className="text-[#00ff88]">{">"}_</span>
                        <span>Try the terminal!</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
