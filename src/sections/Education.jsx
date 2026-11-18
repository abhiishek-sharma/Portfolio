// src/sections/Education.jsx
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import portfolioData from "../config/portfolioData";

const Education = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { education } = portfolioData;

    return (
        <section id="education" className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-[#0a0a14]" />
            <div className="absolute inset-0 cyber-grid-bg opacity-20" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent" />

            <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <p className="font-mono text-[#00ff88] text-sm uppercase tracking-widest mb-3">05 / Education</p>
                    <h2 className="section-heading">Education</h2>
                    <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-[#00ff88] to-transparent mt-4" />
                </motion.div>

                <div className="space-y-6">
                    {education.map((edu, index) => (
                        <motion.div
                            key={edu.degree}
                            initial={{ opacity: 0, x: -40 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: index * 0.15 }}
                            whileHover={{ scale: 1.02 }}
                            className="glass rounded-2xl p-6 border border-white/5 hover:border-white/15 transition-all duration-300"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                                {/* Icon */}
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                                    style={{
                                        background: `${edu.color}15`,
                                        border: `1px solid ${edu.color}40`,
                                        boxShadow: `0 0 20px ${edu.color}20`,
                                    }}
                                >
                                    {edu.icon}
                                </div>

                                <div className="flex-1">
                                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                                        <div>
                                            <h3
                                                className="font-display font-bold text-lg"
                                                style={{ color: edu.color }}
                                            >
                                                {edu.institution}
                                            </h3>
                                            <p className="text-white font-semibold">{edu.degree}</p>
                                        </div>
                                        {/* GPA badge */}
                                        <div
                                            className="px-3 py-1 rounded-lg text-sm font-mono font-bold flex-shrink-0"
                                            style={{ background: `${edu.color}15`, color: edu.color, border: `1px solid ${edu.color}30` }}
                                        >
                                            {edu.gpa}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-3">
                                        <span>📅 {edu.period}</span>
                                    </div>

                                    <p className="text-gray-400 text-sm leading-relaxed">{edu.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
