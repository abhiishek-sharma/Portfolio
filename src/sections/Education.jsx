// src/sections/Education.jsx
// Rendered inside the Skills section so both share one screen.
import { motion } from "framer-motion";
import portfolioData from "../config/portfolioData";

const Education = () => {
    const { education } = portfolioData;

    return (
        <div id="education" className="mt-12">
            {/* Heading (same style as other sections, tighter spacing) */}
            <div className="text-center mb-4">
                <p className="font-mono text-[#00ff88] text-sm uppercase tracking-widest mb-2">03 / Education</p>
                <h2 className="section-heading">Education</h2>
                <div className="w-24 h-px mx-auto bg-[#00ff88] mt-3" />
            </div>

            <div className="space-y-4">
                {education.map((edu) => (
                    <motion.div
                        key={edu.degree}
                        whileHover={{ scale: 1.01 }}
                        className="glass rounded-2xl p-5 border border-white/5 hover:border-white/15 transition-all duration-300"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                            {/* Icon */}
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                                style={{
                                    background: `${edu.color}15`,
                                    border: `1px solid ${edu.color}40`,
                                }}
                            >
                                {edu.icon}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-display font-bold text-lg" style={{ color: edu.color }}>
                                    {edu.institution}
                                </h3>
                                <p className="text-white font-semibold">{edu.degree}</p>
                                <p className="text-gray-400 text-sm leading-relaxed mt-1">{edu.description}</p>
                            </div>

                            <div className="flex sm:flex-col items-start sm:items-end gap-2 flex-shrink-0">
                                <div
                                    className="px-3 py-1 rounded-lg text-sm font-mono font-bold"
                                    style={{ background: `${edu.color}15`, color: edu.color, border: `1px solid ${edu.color}30` }}
                                >
                                    {edu.gpa}
                                </div>
                                <span className="text-xs font-mono text-gray-500">📅 {edu.period}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Education;
