// src/components/Navbar.jsx
// Responsive navigation with scroll detection and mobile menu
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certs" },
    { id: "education", label: "Education" },
    { id: "hobbies", label: "Hobbies" },
    { id: "contact", label: "Contact" },
];

const Navbar = ({ onTerminalOpen }) => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Detect active section
            const sections = navItems.map((item) => document.getElementById(item.id));
            const scrollPos = window.scrollY + window.innerHeight / 3;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPos) {
                    setActiveSection(navItems[i].id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
        setMobileOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                        ? "glass border-b border-white/10 shadow-2xl shadow-black/50"
                        : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => scrollTo("home")}
                            className="font-display font-bold text-lg tracking-wider"
                        >
                            <span className="gradient-text">DEV</span>
                            <span className="text-white">.FOLIO</span>
                            <span className="text-[#00d4ff] text-2xl leading-none">_</span>
                        </motion.button>

                        {/* Desktop Nav */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollTo(item.id)}
                                    className={`nav-link ${activeSection === item.id
                                            ? "text-[#00d4ff] active"
                                            : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-3">
                            {/* Terminal Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onTerminalOpen}
                                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs text-[#00ff88] border border-[#00ff88]/30 hover:border-[#00ff88]/60 hover:bg-[#00ff88]/5 transition-all duration-300"
                                title="Open Terminal"
                            >
                                <span>{">"}_</span>
                                <span>Terminal</span>
                            </motion.button>

                            {/* Mobile hamburger */}
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="lg:hidden flex flex-col gap-1.5 p-2 z-50"
                                aria-label="Toggle menu"
                            >
                                <motion.span
                                    animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                    className="block w-6 h-0.5 bg-[#00d4ff] transition-all"
                                />
                                <motion.span
                                    animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                                    className="block w-6 h-0.5 bg-[#00d4ff]"
                                />
                                <motion.span
                                    animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                                    className="block w-6 h-0.5 bg-[#00d4ff] transition-all"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-40 lg:hidden"
                    >
                        <div
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setMobileOpen(false)}
                        />
                        <div className="absolute right-0 top-0 bottom-0 w-72 glass-strong border-l border-white/10 flex flex-col pt-24 pb-8 px-6">
                            {navItems.map((item, i) => (
                                <motion.button
                                    key={item.id}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => scrollTo(item.id)}
                                    className={`font-mono text-lg py-4 text-left border-b border-white/5 transition-colors ${activeSection === item.id
                                            ? "text-[#00d4ff]"
                                            : "text-gray-300 hover:text-white"
                                        }`}
                                >
                                    <span className="text-[#00d4ff] mr-2">{">"}</span>
                                    {item.label}
                                </motion.button>
                            ))}
                            {/* Mobile terminal button */}
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                onClick={() => { onTerminalOpen(); setMobileOpen(false); }}
                                className="mt-6 flex items-center gap-2 px-4 py-3 rounded-lg font-mono text-sm text-[#00ff88] border border-[#00ff88]/30 hover:border-[#00ff88]/60"
                            >
                                <span>{">"}_</span>
                                <span>Open Terminal</span>
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
