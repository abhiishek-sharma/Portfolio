// src/sections/Hobbies.jsx
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import portfolioData from "../config/portfolioData";

const Hobbies = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { hobbies } = portfolioData;

    return (
        <section id="hobbies" className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-[#0d0d1a]" />
            <div className="absolute inset-0 cyber-grid-bg opacity-20" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8b5cf6]/30 to-transparent" />

            {/* Background blobs */}
            <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-[#8b5cf6]/5 blur-3xl" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#00d4ff]/5 blur-3xl" />

            <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <p className="font-mono text-[#8b5cf6] text-sm uppercase tracking-widest mb-3">07 / Hobbies</p>
                    <h2 className="section-heading">Beyond Code</h2>
                    <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-[#8b5cf6] to-transparent mt-4" />
                    <p className="text-gray-500 text-sm mt-4 font-mono">// life.interests.forEach(passion =&gt; explore(passion))</p>
                </motion.div>

                {/* Hobbies Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {hobbies.map((hobby, index) => (
                        <motion.div
                            key={hobby.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: index * 0.08, type: "spring", stiffness: 200 }}
                            whileHover={{
                                scale: 1.08,
                                y: -8,
                                transition: { duration: 0.2 },
                            }}
                            className="group relative glass rounded-2xl p-6 text-center border border-white/5 cursor-default overflow-hidden"
                            style={{
                                "--hobby-color": hobby.color,
                            }}
                        >
                            {/* Glow background on hover */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                                style={{ background: `radial-gradient(circle at center, ${hobby.color}10, transparent)` }}
                            />

                            {/* Border glow on hover */}
                            <div
                                className="absolute inset-0 rounded-2xl border opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ borderColor: `${hobby.color}40` }}
                            />

                            <div className="relative z-10">
                                {/* Emoji */}
                                <motion.div
                                    className="text-4xl mb-3"
                                    animate={{ y: [0, -3, 0] }}
                                    transition={{
                                        duration: 2 + index * 0.3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: index * 0.2
                                    }}
                                >
                                    {hobby.icon}
                                </motion.div>

                                {/* Name */}
                                <h3
                                    className="font-display font-bold text-sm mb-1 group-hover:transition-colors duration-300"
                                    style={{ color: hobby.color }}
                                >
                                    {hobby.name}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 text-xs leading-tight group-hover:text-gray-400 transition-colors">
                                    {hobby.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Fun Quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1 }}
                    className="text-center mt-16"
                >
                    <div className="inline-block glass rounded-2xl px-8 py-5 border border-white/5">
                        <p className="text-gray-400 text-sm italic">
                            "The best code is written by developers who know when to close their laptops and touch grass."
                        </p>
                        <p className="text-gray-600 text-xs font-mono mt-2">— A wise developer</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hobbies;
