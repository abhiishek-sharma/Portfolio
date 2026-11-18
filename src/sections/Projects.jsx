// src/sections/Projects.jsx
import { useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import portfolioData from "../config/portfolioData";
import SpotlightCard from "../components/reactbits/SpotlightCard";

const Projects = () => {
    const { projects } = portfolioData;
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section id="projects" className="relative overflow-hidden">
            <div className="absolute inset-0 bg-[#0a0a14]" />
            <div className="absolute inset-0 cyber-grid-bg opacity-20" />
            <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />

            {/* On desktop this block is pinned and the track scrolls sideways (see scrollAnimations.js) */}
            <div className="projects-pin relative z-10 py-24 lg:py-0 lg:h-screen lg:flex lg:flex-col lg:justify-center">
                {/* Header */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="text-center lg:text-left mb-12 lg:mb-10">
                        <p className="font-mono text-[#ff006e] text-sm uppercase tracking-widest mb-3">04 / Projects</p>
                        <h2 className="section-heading">Projects</h2>
                        <div className="w-24 h-px mx-auto lg:mx-0 bg-[#ff006e] mt-4" />
                    </div>
                </div>

                {/* Track: grid on small screens, one horizontal row on desktop */}
                <div className="projects-track grid md:grid-cols-2 gap-6 px-4 sm:px-6 lg:flex lg:flex-nowrap lg:w-max lg:gap-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
                    {projects.map((project, index) => (
                        <div
                            key={project.name}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="project-card relative group lg:w-[420px] lg:flex-shrink-0"
                        >
                        <SpotlightCard
                            className={`h-full flex flex-col !p-0 !rounded-2xl transition-transform duration-500 ${hoveredIndex === index ? "-translate-y-2" : ""} ${project.featured ? "ring-1 ring-[#00d4ff]/20" : ""}`}
                            style={{ "--spotlight-card-surface": "#11111f" }}
                            spotlightColor="rgba(0, 212, 255, 0.55)"
                            intensity={0.12}
                            borderGlow={0.5}
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
                                {/* Showcase video (e.g. exported from animos.app) or emoji */}
                                {project.video ? (
                                    <video
                                        src={project.video}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                    />
                                ) : (
                                    <div className="text-7xl float-animation">{project.emoji}</div>
                                )}
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
                        </SpotlightCard>
                        </div>
                    ))}

                    {/* End card: GitHub CTA */}
                    <div className="project-card lg:w-[320px] lg:flex-shrink-0 flex items-center justify-center rounded-2xl border border-dashed border-white/10 p-10">
                        <a
                            href={portfolioData.personal.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 btn-outline-cyber"
                        >
                            <FaGithub />
                            All projects on GitHub
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
