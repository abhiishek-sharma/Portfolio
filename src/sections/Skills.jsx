// src/sections/Skills.jsx
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import portfolioData from "../config/portfolioData";

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { skills } = portfolioData;


    return (
        <section id="skills" className="relative overflow-hidden lg:min-h-screen lg:flex lg:flex-col lg:justify-start py-20 lg:pt-24 lg:pb-8">
            <div className="absolute inset-0 bg-[#0a0a14]" />
            <div className="absolute inset-0 cyber-grid-bg opacity-20" />
            <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-8 lg:mb-10"
                >
                    <p className="font-mono text-[#8b5cf6] text-sm uppercase tracking-widest mb-3">02 / Skills</p>
                    <h2 className="section-heading">Skills</h2>
                    <div className="w-24 h-px mx-auto bg-[#8b5cf6] mt-4" />
                </motion.div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {skills.map((category, catIndex) => (
                        <motion.div
                            key={category.category}
                            className="glass rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all duration-300 group card-hover"
                        >
                            {/* Category Header */}
                            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/5">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                                    style={{ background: `${category.color}15`, border: `1px solid ${category.color}30` }}
                                >
                                    {category.icon}
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-sm text-white">{category.category}</h3>
                                    
                                </div>
                            </div>

                            {/* Skill chips */}
                            <div className="flex flex-wrap gap-2">
                                {category.items.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 rounded-lg font-mono text-xs text-gray-300"
                                        style={{ background: `${category.color}10`, border: `1px solid ${category.color}30` }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
