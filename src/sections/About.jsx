// src/sections/About.jsx
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import portfolioData from "../config/portfolioData";
import CountUp from "../components/reactbits/CountUp";

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { personal, stats: statItems } = portfolioData;

    return (
        <section id="about" className="relative py-24 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[#0d0d1a]" />
            <div className="absolute inset-0 cyber-grid-bg opacity-20" />
            <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                >
                    <p className="font-mono text-[#00d4ff] text-sm uppercase tracking-widest mb-3">01 / About</p>
                    <h2 className="section-heading">About Me</h2>
                    <div className="w-24 h-px mx-auto bg-[#00d4ff] mt-4" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Info */}
                    <motion.div data-anim="from-left">
                        {/* Terminal-style heading */}
                        <div className="font-mono text-sm text-gray-600 mb-4">
                            <span className="text-[#00ff88]">~/portfolio</span>
                            <span className="text-gray-500"> $ cat about.txt</span>
                        </div>

                        <div className="glass rounded-2xl p-6 mb-6 border border-white/5">
                            <p className="text-gray-300 text-lg leading-relaxed mb-4">
                                {personal.bio}
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                I build <span className="text-[#00d4ff]">evaluation harnesses and agentic job infrastructure</span>, and I ship <span className="text-[#8b5cf6]">production software</span>: I built and actively maintain a Next.js website serving about 3,200 visitors a month, and built QueryForge, a schema-aware natural-language-to-SQL application.
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3 mb-8">
                            {[
                                { icon: FaEnvelope, label: "Email", value: personal.email, color: "#00d4ff" },
                                { icon: FaMapMarkerAlt, label: "Location", value: personal.location, color: "#00ff88" },
                            ].map(({ icon: Icon, label, value, color }) => (
                                <div key={label} className="flex items-center gap-3 text-sm">
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                                        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                                    >
                                        <Icon style={{ color }} className="text-sm" />
                                    </div>
                                    <span className="text-gray-500">{label}:</span>
                                    <span className="text-gray-300 font-mono">{value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            {[
                                { icon: FaGithub, href: personal.github, label: "GitHub" },
                                { icon: FaLinkedin, href: personal.linkedin, label: "LinkedIn" },
                            ].map(({ icon: Icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/10 text-gray-400 hover:text-white text-sm font-mono transition-all duration-300 hover:border-[#00d4ff]/30 group"
                                >
                                    <Icon className="group-hover:text-[#00d4ff] transition-colors" />
                                    {label}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Stats + Code block */}
                    <motion.div
                        className="space-y-6"
                    >
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {statItems.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    whileHover={{ scale: 1.03 }}
                                    className={`glass rounded-xl p-5 border border-white/5 hover:border-[#00d4ff]/20 transition-all duration-300 text-center group ${statItems.length % 2 && i === statItems.length - 1 ? "col-span-2" : ""}`}
                                >
                                    <div className="text-3xl mb-2">{stat.icon}</div>
                                    <div className="font-display text-3xl font-black text-[#00d4ff] mb-1">
                                        <CountUp
                                            to={stat.to}
                                            separator={stat.separator || ""}
                                            suffix={stat.suffix || ""}
                                            decimals={stat.decimals}
                                            duration={1.6}
                                            delay={0.2 + i * 0.1}
                                        />
                                    </div>
                                    <div className="text-gray-500 text-xs font-mono">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Code snippet card */}
                        <div className="terminal-window">
                            <div className="terminal-header">
                                <div className="terminal-dot bg-red-500" />
                                <div className="terminal-dot bg-yellow-500" />
                                <div className="terminal-dot bg-green-500" />
                                <span className="ml-3 font-mono text-xs text-gray-500">profile.json</span>
                            </div>
                            <div className="p-5 font-mono text-sm space-y-1 leading-loose">
                                <div className="text-gray-600">{"{"}</div>
                                <div className="pl-4">
                                    <span className="text-[#00d4ff]">"name"</span>
                                    <span className="text-gray-600">: </span>
                                    <span className="text-[#00ff88]">"{personal.name}"</span>
                                    <span className="text-gray-600">,</span>
                                </div>
                                <div className="pl-4">
                                    <span className="text-[#00d4ff]">"role"</span>
                                    <span className="text-gray-600">: </span>
                                    <span className="text-[#00ff88]">"{personal.title}"</span>
                                    <span className="text-gray-600">,</span>
                                </div>
                                <div className="pl-4">
                                    <span className="text-[#00d4ff]">"location"</span>
                                    <span className="text-gray-600">: </span>
                                    <span className="text-[#00ff88]">"{personal.location}"</span>
                                    <span className="text-gray-600">,</span>
                                </div>
                                <div className="pl-4">
                                    <span className="text-[#00d4ff]">"open_to_work"</span>
                                    <span className="text-gray-600">: </span>
                                    <span className="text-[#00ff88]">true</span>
                                </div>
                                <div className="text-gray-600">{"}"}</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
