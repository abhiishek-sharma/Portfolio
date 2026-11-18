// "Resume" button -> menu of the three resume versions -> preview window with a
// download button.
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaChevronDown, FaFilePdf, FaTimes } from "react-icons/fa";
import { getLenis } from "../lib/smoothScroll";

const ResumePreview = ({ resume, onClose }) => {
    // Freeze page scrolling while the preview is open; Escape closes it
    useEffect(() => {
        const lenis = getLenis();
        lenis?.stop();
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
            lenis?.start();
        };
    }, [onClose]);

    return createPortal(
        <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => e.target === e.currentTarget && onClose()}
            role="dialog"
            aria-modal="true"
            aria-label={`${resume.label} resume preview`}
        >
            <motion.div
                initial={{ scale: 0.96, y: 12 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.96, y: 12 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-4xl h-[88vh] flex flex-col rounded-2xl bg-[#11111f] border border-white/10 shadow-2xl shadow-black/60 overflow-hidden"
            >
                {/* Header: title, download, close */}
                <div className="flex items-center gap-3 px-5 py-3 border-b border-white/10">
                    <FaFilePdf className="text-[#00d4ff]" />
                    <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold truncate">{resume.label}</p>
                        <p className="text-xs font-mono text-gray-500">Resume · PDF</p>
                    </div>
                    <a
                        href={resume.file}
                        download
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d4ff] text-black font-mono text-sm font-semibold hover:brightness-110 transition"
                    >
                        <FaDownload className="text-xs" /> Download
                    </a>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close preview"
                        className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* The browser's built-in PDF viewer */}
                <iframe
                    src={`${resume.file}#view=FitH&toolbar=0`}
                    title={`${resume.label} resume`}
                    className="flex-1 w-full bg-white"
                />
            </motion.div>
        </motion.div>,
        document.body
    );
};

const ResumeMenu = ({ resumes }) => {
    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState(null);
    const closePreview = useCallback(() => setPreview(null), []);
    const ref = useRef(null);

    // Close the menu on outside click or Escape
    useEffect(() => {
        if (!open) return undefined;
        const onClick = (e) => {
            if (!ref.current?.contains(e.target)) setOpen(false);
        };
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        document.addEventListener("mousedown", onClick);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onClick);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    return (
        <div ref={ref} className="relative">
            <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={open}
                className="btn-outline-cyber flex items-center gap-2"
            >
                <FaFilePdf className="text-xs" /> Resume
                <FaChevronDown className={`text-[10px] transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        role="menu"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full mt-2 z-30 w-72 rounded-xl bg-[#11111f] border border-white/10 shadow-xl shadow-black/50 p-1.5"
                    >
                        <p className="px-3 pt-2 pb-1 font-mono text-[10px] uppercase tracking-widest text-gray-500">
                            Choose a version to preview
                        </p>
                        {resumes.map((r) => (
                            <button
                                key={r.file}
                                type="button"
                                role="menuitem"
                                onClick={() => {
                                    setOpen(false);
                                    setPreview(r);
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left text-gray-300 hover:bg-[#00d4ff]/10 hover:text-white transition-colors"
                            >
                                <FaFilePdf className="text-[#00d4ff] flex-shrink-0" />
                                <span className="flex-1">{r.label}</span>
                                <span className="text-[10px] font-mono text-gray-500">Preview</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {preview && <ResumePreview key={preview.file} resume={preview} onClose={closePreview} />}
            </AnimatePresence>
        </div>
    );
};

export default ResumeMenu;
