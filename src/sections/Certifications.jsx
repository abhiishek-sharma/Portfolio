// src/sections/Certifications.jsx
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import portfolioData from "../config/portfolioData";

const Certifications = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { certifications } = portfolioData;

    return (
        <section id="certifications" className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-[#0d0d1a]" />
            <div className="absolute inset-0 cyber-grid-bg opacity-20" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ffd60a]/30 to-transparent" />

            <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <p className="font-mono text-[#ffd60a] text-sm uppercase tracking-widest mb-3">05 / Certifications</p>
                    <h2 className="section-heading">Certifications</h2>
                    <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-[#ffd60a] to-transparent mt-4" />
                </motion.div>

                {/* Certs Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications.map((cert, index) => (
                        <motion.a
                            key={cert.name}
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.04, y: -5 }}
                            className="group glass rounded-2xl p-6 border border-white/5 hover:border-white/15 transition-all duration-300 flex flex-col gap-4 cursor-pointer"
                            style={{ "--cert-color": cert.color }}
                        >
                            {/* Icon + year */}
                            <div className="flex items-start justify-between">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                                    style={{
                                        background: `${cert.color}15`,
                                        border: `1px solid ${cert.color}40`,
                                        boxShadow: `0 0 15px ${cert.color}20`,
                                    }}
                                >
                                    {cert.icon}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span
                                        className="font-mono text-xs px-2 py-0.5 rounded"
                                        style={{ background: `${cert.color}15`, color: cert.color, border: `1px solid ${cert.color}30` }}
                                    >
                                        {cert.date}
                                    </span>
                                    <FaExternalLinkAlt className="text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="font-bold text-white text-sm leading-snug mb-1 group-hover:text-[var(--cert-color)] transition-colors">
                                    {cert.name}
                                </h3>
                                <p className="text-gray-500 text-xs font-mono">{cert.issuer}</p>
                            </div>

                            {/* Verified badge */}
                            <div className="flex items-center gap-1.5">
                                <div
                                    className="w-4 h-4 rounded-full flex items-center justify-center"
                                    style={{ background: cert.color }}
                                >
                                    <span className="text-black text-[8px] font-bold">✓</span>
                                </div>
                                <span className="text-xs font-mono text-gray-600">Verified</span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
