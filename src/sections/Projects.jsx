// src/sections/Projects.jsx
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import portfolioData from "../config/portfolioData";

const categories = ["All", ...new Set(portfolioData.projects.map((p) => p.category))];

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { projects } = portfolioData;
    const [filter, setFilter] = useState("All");
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

    return (
        <section id="projects" className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-[#0a0a14]" />
            <div className="absolute inset-0 cyber-grid-bg opacity-20" />
            <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />

            <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <p className="font-mono text-[#ff006e] text-sm uppercase tracking-widest mb-3">04 / Projects</p>
                    <h2 className="section-heading">Projects</h2>
                    <div className="w-24 h-px mx-auto bg-[#ff006e] mt-4" />
                </motion.div>

                {/* Filter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-5 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${filter === cat
                                    ? "bg-[#ff006e] text-white shadow-lg shadow-pink-500/25"
                                    : "glass border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={filter}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
                    >
                        {filtered.map((project, index) => (
                            <motion.div
                                key={project.name}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08 }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="relative group"
                            >
                                <div
                                    className={`glass rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 h-full flex flex-col ${hoveredIndex === index ? "border-white/20 shadow-2xl shadow-black/50" : ""
                                        } ${project.featured ? "ring-1 ring-[#00d4ff]/20" : ""}`}
                                    style={
                                        hoveredIndex === index
                                            ? { transform: "translateY(-8px)", boxShadow: "0 30px 60px rgba(0,0,0,0.5)" }
                                            : {}
                                    }
                                >
                                    {/* Gradient Header */}
                                    <div className={`relative h-48 bg-[#151528] border-b border-white/5 flex items-center justify-center overflow-hidden`}>
                                        {/* Overlay grid */}
                                        <div className="absolute inset-0 cyber-grid-bg opacity-30" />
                                        {/* Featured badge */}
                                        {project.featured && (
                                            <div className="absolute top-3 left-3 px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#00d4ff] text-black">
                                                FEATURED
                                            </div>
                                        )}
                                        {/* Main emoji */}
                                        <div className="text-7xl float-animation">{project.emoji}</div>
                                        {/* Scan line on hover */}
                                        <div
                                            className={`absolute inset-x-0 h-px bg-white/30 transition-all duration-500 ${hoveredIndex === index ? "top-0 animate-scan" : "hidden"
                                                }`}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <h3 className="font-display font-bold text-white text-lg">{project.name}</h3>
                                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-gray-500 flex-shrink-0">
                                                {project.category}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                                            {project.description}
                                        </p>

                                        {/* Tech tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tech.map((t) => (
                                                <span key={t} className="skill-tag text-[10px]">{t}</span>
                                            ))}
                                        </div>

                                        {/* Links */}
                                        <div className={`flex gap-3 mt-auto ${project.github || project.live ? "pt-4 border-t border-white/5" : "hidden"}`}>
                                            {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-white transition-colors group/link"
                                            >
                                                <FaGithub className="group-hover/link:text-[#00d4ff]" />
                                                Code
                                            </a>
                                            )}
                                            {project.live && (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-[#00d4ff] transition-colors group/link ml-auto"
                                                >
                                                    <FaExternalLinkAlt className="text-xs group-hover/link:text-[#00d4ff]" />
                                                    Live Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* GitHub CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <a
                        href={portfolioData.personal.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 btn-outline-cyber"
                    >
                        <FaGithub />
                        View All Projects on GitHub
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
