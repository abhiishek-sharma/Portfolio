// src/sections/Experience.jsx
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import portfolioData from "../config/portfolioData";

const typeColors = {
    "full-time": { bg: "#00d4ff15", border: "#00d4ff30", text: "#00d4ff" },
    volunteer: { bg: "#00ff8815", border: "#00ff8830", text: "#00ff88" },
    internship: { bg: "#8b5cf615", border: "#8b5cf630", text: "#8b5cf6" },
    hackathon: { bg: "#ff8c0015", border: "#ff8c0030", text: "#ff8c00" },
};

const Experience = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { experience } = portfolioData;
    const single = experience.length === 1;

    return (
        <section id="experience" className="relative overflow-hidden lg:min-h-screen lg:flex lg:flex-col lg:justify-start py-20 lg:pt-24 lg:pb-8">
            <div className="absolute inset-0 bg-[#0d0d1a]" />
            <div className="absolute inset-0 cyber-grid-bg opacity-20" />
            <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-8 lg:mb-10"
                >
                    <p className="font-mono text-[#00ff88] text-sm uppercase tracking-widest mb-3">03 / Experience</p>
                    <h2 className="section-heading">Experience</h2>
                    <div className="w-24 h-px mx-auto bg-[#00ff88] mt-4" />
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className={`absolute left-0 top-0 bottom-0 w-px ${single ? "" : "md:left-1/2 md:-translate-x-1/2"}`}>
                        <div className="timeline-line" />
                    </div>

                    {experience.map((exp, index) => {
                        const isLeft = index % 2 === 0;
                        const colors = typeColors[exp.type] || typeColors["full-time"];

                        return (
                            <motion.div
                                key={index}
                                className="relative mb-12"
                            >
                                {/* Timeline node */}
                                <div className={`absolute left-0 ${single ? "" : "md:left-1/2 md:-translate-x-1/2 md:translate-x-0"} w-4 h-4 rounded-full border-2 border-[#00d4ff] bg-[#0d0d1a] z-10 top-6 -translate-x-[6px]`}>
                                    <div className="absolute inset-1 rounded-full bg-[#00d4ff] animate-pulse" />
                                </div>

                                {/* Card */}
                                <div
                                    className={`ml-8 ${single ? "" : `md:w-[45%] ${isLeft ? "md:ml-0 md:mr-auto" : "md:ml-auto md:mr-0 md:pl-0"}`}`}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="glass rounded-2xl p-5 border border-white/5 hover:border-[#00d4ff]/20 transition-all duration-300"
                                    >
                                        {/* Header */}
                                        <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                                            <div>
                                                <h3 className="font-display font-bold text-white text-lg">{exp.role}</h3>
                                                <p className="text-[#00d4ff] font-semibold">{exp.company}</p>
                                            </div>
                                            <span
                                                className="text-xs font-mono px-2 py-0.5 rounded"
                                                style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}
                                            >
                                                {exp.type}
                                            </span>
                                        </div>

                                        {/* Meta */}
                                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-500 mb-3">
                                            <span className="flex items-center gap-1">
                                                <span>📅</span> {exp.period}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span>📍</span> {exp.location}
                                            </span>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-400 text-sm leading-relaxed mb-3">{exp.description}</p>

                                        {/* Achievements */}
                                        <div className="grid lg:grid-cols-2 gap-x-8">
                                        {exp.achievementGroups?.map((group) => (
                                            <div key={group.heading} className="mb-3">
                                                <p className="font-mono text-xs uppercase tracking-wider text-[#00ff88] mb-2">{group.heading}</p>
                                                <ul className="space-y-1.5">
                                                    {group.items.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-[13px] leading-snug text-gray-300">
                                                            <span className="text-[#00d4ff] mt-0.5 flex-shrink-0">▸</span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                        </div>
                                        {exp.achievements?.length > 0 && (
                                            <ul className="space-y-2 mb-4">
                                                {exp.achievements.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                                        <span className="text-[#00d4ff] mt-0.5 flex-shrink-0">▸</span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {/* Tech tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {exp.tech.map((t) => (
                                                <span key={t} className="skill-tag">{t}</span>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Experience;
