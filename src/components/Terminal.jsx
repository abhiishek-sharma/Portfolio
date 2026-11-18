// src/components/Terminal.jsx
// Fully functional interactive terminal with command system, tab-completion, and command history
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaTimes,
    FaExpand,
    FaCompress,
    FaTerminal,
} from "react-icons/fa";
import portfolioData from "../config/portfolioData";

// ============================================================
// COMMAND REGISTRY — all terminal commands defined here
// ============================================================
const buildCommands = (data) => ({
    help: {
        description: "List all available commands",
        run: () => [
            { t: "info", v: "╔══════════════════════════════════════════╗" },
            { t: "info", v: "║        DEV.FOLIO COMMAND REFERENCE       ║" },
            { t: "info", v: "╚══════════════════════════════════════════╝" },
            { t: "blank", v: "" },
            { t: "out", v: "  help              Show this help menu" },
            { t: "out", v: "  about             Personal information" },
            { t: "out", v: "  skills            Technical skill set" },
            { t: "out", v: "  projects          Featured projects" },
            { t: "out", v: "  experience        Work history" },
            { t: "out", v: "  education         Academic background" },
            { t: "out", v: "  contact           Contact details" },
            { t: "out", v: "  resume            Download resume PDF" },
            { t: "out", v: "  whoami            Identity info" },
            { t: "out", v: "  ls                List sections" },
            { t: "out", v: "  clear             Clear the terminal" },
            { t: "out", v: "  exit              Close this terminal" },
            { t: "blank", v: "" },
            { t: "tip", v: "  💡 Tab → auto-complete  |  ↑↓ → history  |  Ctrl+L → clear" },
        ],
    },

    about: {
        description: "Display personal information",
        run: () => [
            { t: "info", v: `━━━ ABOUT: ${data.personal.name} ━━━` },
            { t: "blank", v: "" },
            { t: "out", v: `  Name      :  ${data.personal.name}` },
            { t: "out", v: `  Title     :  ${data.personal.title}` },
            { t: "out", v: `  Location  :  ${data.personal.location}` },
            { t: "out", v: `  Email     :  ${data.personal.email}` },
            { t: "out", v: `  GitHub    :  ${data.personal.github}` },
            { t: "blank", v: "" },
            { t: "success", v: `  Bio: "${data.personal.bio}"` },
        ],
    },

    skills: {
        description: "Show technical skills",
        run: () => [
            { t: "info", v: "━━━ TECH SKILLS ━━━" },
            { t: "blank", v: "" },
            ...data.skills.flatMap((cat) => [
                { t: "warn", v: `  ${cat.icon}  ${cat.category.toUpperCase()}` },
                ...cat.items.map((s) => ({ t: "out", v: `    • ${s}` })),
                { t: "blank", v: "" },
            ]),
        ],
    },

    projects: {
        description: "List featured projects",
        run: () => [
            { t: "info", v: "━━━ FEATURED PROJECTS ━━━" },
            { t: "blank", v: "" },
            ...data.projects.map((p) => ({
                t: "out",
                v: `  ${p.emoji}  ${p.name.padEnd(22)} [${p.category.padEnd(16)}]`,
            })),
            { t: "blank", v: "" },
            { t: "tip", v: "  Visit GitHub to explore all repositories" },
        ],
    },

    experience: {
        description: "Show work experience",
        run: () => [
            { t: "info", v: "━━━ WORK EXPERIENCE ━━━" },
            { t: "blank", v: "" },
            ...data.experience.flatMap((exp) => [
                { t: "warn", v: `  ▶  ${exp.company}` },
                { t: "out", v: `     Role    :  ${exp.role}` },
                { t: "out", v: `     Period  :  ${exp.period}` },
                { t: "out", v: `     Place   :  ${exp.location}` },
                { t: "out", v: `     ${exp.description}` },
                ...exp.achievements.map((a) => ({ t: "out", v: `       • ${a}` })),
                { t: "blank", v: "" },
            ]),
        ],
    },

    education: {
        description: "Show education history",
        run: () => [
            { t: "info", v: "━━━ EDUCATION ━━━" },
            { t: "blank", v: "" },
            ...data.education.flatMap((edu) => [
                { t: "warn", v: `  ${edu.icon}  ${edu.institution}` },
                { t: "out", v: `     ${edu.degree}` },
                { t: "out", v: `     Period: ${edu.period}  |  GPA: ${edu.gpa}` },
                { t: "out", v: `     ${edu.description}` },
                { t: "blank", v: "" },
            ]),
        ],
    },

    contact: {
        description: "Show contact details",
        run: () => [
            { t: "info", v: "━━━ CONTACT INFORMATION ━━━" },
            { t: "blank", v: "" },
            { t: "out", v: `  📧  Email     :  ${data.contact.email}` },
            { t: "out", v: `  📍  Location  :  ${data.contact.location}` },
            { t: "blank", v: "" },
            { t: "info", v: "  🔗 Social Links:" },
            { t: "out", v: `     GitHub    :  ${data.personal.github}` },
            { t: "out", v: `     LinkedIn  :  ${data.personal.linkedin}` },
            { t: "blank", v: "" },
            { t: "success", v: `  ⚡ ${data.contact.availability}  •  Response time: ${data.contact.responseTime}` },
        ],
    },

    resume: {
        description: "Download resume PDF",
        run: () => {
            const a = document.createElement("a");
            a.href = "/resume.pdf";
            a.download = "Abhishek_Sharma_Resume.pdf";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            return [
                { t: "success", v: "📄 Initializing download..." },
                { t: "out", v: "   → Filename : Abhishek_Sharma_Resume.pdf" },
                { t: "out", v: "   → Target   : ~/Downloads/" },
                { t: "success", v: "   ✓ Download started!" },
            ];
        },
    },

    whoami: {
        description: "Display identity info",
        run: () => [
            { t: "success", v: `  ${data.personal.name}` },
            { t: "out", v: `  ${data.personal.title}` },
            { t: "out", v: `  ${data.personal.location}` },
        ],
    },

    ls: {
        description: "List available sections",
        run: () => [
            { t: "out", v: "  about/        skills/        projects/      experience/" },
            { t: "out", v: "  education/    contact/" },
        ],
    },

    clear: {
        description: "Clear the terminal screen",
        run: () => [{ t: "clear" }],
    },

    exit: {
        description: "Close the terminal",
        run: () => [{ t: "exit" }],
    },
});

// ============================================================
// WELCOME BANNER
// ============================================================
const WELCOME = [
    { t: "info", v: "╔══════════════════════════════════════════════════╗" },
    { t: "info", v: "║         DEV.FOLIO  ·  INTERACTIVE TERMINAL        ║" },
    { t: "info", v: "╚══════════════════════════════════════════════════╝" },
    { t: "blank", v: "" },
    { t: "success", v: `  Welcome! Type 'help' to see all available commands.` },
    { t: "out", v: `  Tip: Press Tab to auto-complete  |  ↑↓ for history` },
    { t: "blank", v: "" },
];

// ============================================================
// SINGLE LINE RENDERER
// ============================================================
const Line = ({ line }) => {
    const cls = {
        info: "text-[#00d4ff]",
        success: "text-[#00ff88]",
        warn: "text-[#ffd60a]",
        error: "text-[#ff006e]",
        tip: "text-[#8b5cf6]",
        cmd: "text-white font-bold",
        blank: "text-transparent select-none",
        out: "text-gray-300",
    }[line.t] || "text-gray-300";

    return (
        <div className={`font-mono text-sm leading-6 whitespace-pre-wrap break-words ${cls}`}>
            {line.v || " "}
        </div>
    );
};

// ============================================================
// TERMINAL COMPONENT
// ============================================================
const Terminal = ({ isOpen, onClose }) => {
    const [lines, setLines] = useState(WELCOME);
    const [input, setInput] = useState("");
    const [cmdHistory, setCmdHistory] = useState([]);
    const [histIdx, setHistIdx] = useState(-1);
    const [suggestion, setSuggestion] = useState("");
    const [maximized, setMaximized] = useState(false);

    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    const commands = buildCommands(portfolioData);
    const cmdKeys = Object.keys(commands);
    const firstName = portfolioData.personal.name.split(" ")[0].toLowerCase();

    // ── Auto-scroll to bottom whenever lines change ──────────
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [lines]);

    // ── Focus input when terminal opens ──────────────────────
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 150);
        }
    }, [isOpen]);

    // ── Tab completion suggestion ─────────────────────────────
    useEffect(() => {
        if (input.trim()) {
            const match = cmdKeys.find(
                (k) => k.startsWith(input.toLowerCase()) && k !== input.toLowerCase()
            );
            setSuggestion(match || "");
        } else {
            setSuggestion("");
        }
    }, [input]);

    // ── Execute a command string ──────────────────────────────
    const execute = useCallback(
        (raw) => {
            const trimmed = raw.trim();
            if (!trimmed) return;

            // History bookkeeping
            setCmdHistory((h) => [trimmed, ...h]);
            setHistIdx(-1);

            // Echo the typed command
            const echoLine = { t: "cmd", v: `${firstName}@portfolio:~$ ${trimmed}` };

            const cmdName = trimmed.toLowerCase().split(" ")[0];
            const cmd = commands[cmdName];

            if (!cmd) {
                setLines((prev) => [
                    ...prev,
                    echoLine,
                    { t: "error", v: `  bash: ${cmdName}: command not found  (try 'help')` },
                    { t: "blank", v: "" },
                ]);
                return;
            }

            const output = cmd.run(trimmed.slice(cmdName.length).trim());

            // Special signals
            if (output.some((o) => o.t === "clear")) { setLines(WELCOME); return; }
            if (output.some((o) => o.t === "exit")) { onClose(); return; }

            setLines((prev) => [...prev, echoLine, ...output, { t: "blank", v: "" }]);
        },
        [commands, firstName, onClose]
    );

    // ── Keyboard handler ──────────────────────────────────────
    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            execute(input);
            setInput("");
        } else if (e.key === "Tab") {
            e.preventDefault();
            if (suggestion) { setInput(suggestion); setSuggestion(""); }
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const next = Math.min(histIdx + 1, cmdHistory.length - 1);
            setHistIdx(next);
            if (cmdHistory[next] !== undefined) setInput(cmdHistory[next]);
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            const next = Math.max(histIdx - 1, -1);
            setHistIdx(next);
            setInput(next === -1 ? "" : cmdHistory[next] ?? "");
        } else if (e.ctrlKey && e.key === "l") {
            e.preventDefault();
            setLines(WELCOME);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className={`fixed z-50 flex flex-col ${maximized
                    ? "inset-4"
                    : "bottom-4 right-4 left-4 md:left-auto md:w-[700px]"
                }`}
            style={{
                height: maximized ? undefined : "500px",
                background: "#07070f",
                borderRadius: "12px",
                border: "1px solid rgba(0,212,255,0.2)",
                boxShadow: "0 0 60px rgba(0,212,255,0.08), 0 25px 60px rgba(0,0,0,0.7)",
            }}
            onClick={() => inputRef.current?.focus()}
        >
            {/* ── Title Bar ─────────────────────────────────────── */}
            <div
                className="flex items-center gap-3 px-4 py-3 flex-shrink-0 select-none"
                style={{ background: "#0e0e1a", borderBottom: "1px solid rgba(0,212,255,0.1)", borderRadius: "12px 12px 0 0" }}
            >
                {/* Traffic lights */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                    />
                    <button
                        onClick={(e) => { e.stopPropagation(); setMaximized(!maximized); }}
                        className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"
                    />
                    <button
                        onClick={(e) => { e.stopPropagation(); setMaximized(!maximized); }}
                        className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"
                    />
                </div>

                {/* Title */}
                <div className="flex-1 flex items-center gap-2">
                    <FaTerminal className="text-[#00d4ff] text-xs" />
                    <span className="font-mono text-xs text-gray-500">
                        {firstName}@portfolio:~
                    </span>
                </div>

                {/* Maximize / close */}
                <div className="flex gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); setMaximized(!maximized); }}
                        className="text-gray-600 hover:text-gray-300 transition-colors p-1"
                    >
                        {maximized ? <FaCompress className="text-xs" /> : <FaExpand className="text-xs" />}
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        className="text-gray-600 hover:text-red-400 transition-colors p-1"
                    >
                        <FaTimes className="text-xs" />
                    </button>
                </div>
            </div>

            {/* ── Output Area ───────────────────────────────────── */}
            <div
                className="flex-1 overflow-y-auto px-4 py-3"
                style={{ minHeight: 0 }}
            >
                {lines.map((line, i) => (
                    <Line key={i} line={line} />
                ))}
                {/* Scroll anchor */}
                <div ref={bottomRef} />
            </div>

            {/* ── Input Row ─────────────────────────────────────── */}
            <div
                className="flex-shrink-0 px-4 pb-4 pt-2"
                style={{ borderTop: "1px solid rgba(0,212,255,0.08)" }}
            >
                {/* Ghost suggestion hint */}
                {suggestion && (
                    <div className="font-mono text-xs text-gray-700 mb-1 pl-0">
                        Tab → <span className="text-[#00d4ff]/40">{suggestion}</span>
                    </div>
                )}

                <div className="flex items-center gap-2">
                    {/* Prompt */}
                    <span className="font-mono text-sm text-[#00ff88] flex-shrink-0 select-none">
                        {firstName}@portfolio:~$
                    </span>

                    {/* Input wrapper (ghost text + real input stacked) */}
                    <div className="relative flex-1">
                        {/* Ghost text for tab completion */}
                        {suggestion && (
                            <div
                                className="absolute inset-0 font-mono text-sm pointer-events-none flex items-center"
                                aria-hidden
                            >
                                <span className="invisible">{input}</span>
                                <span className="text-gray-700">
                                    {suggestion.slice(input.length)}
                                </span>
                            </div>
                        )}
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={onKeyDown}
                            className="w-full bg-transparent font-mono text-sm text-white outline-none caret-[#00d4ff]"
                            spellCheck={false}
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="none"
                        />
                    </div>

                    {/* Blinking cursor indicator */}
                    <span
                        className="cursor-blink font-mono text-sm text-[#00d4ff] select-none"
                        aria-hidden
                    >
                        █
                    </span>
                </div>
            </div>
        </div>
    );
};

// ============================================================
// FLOATING BUTTON
// ============================================================
export const TerminalButton = ({ onClick }) => (
    <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center overflow-hidden"
        style={{
            background: "linear-gradient(135deg, #00d4ff, #8b5cf6)",
            boxShadow: "0 0 20px rgba(0,212,255,0.5), 0 0 50px rgba(139,92,246,0.2)",
        }}
        title="Open Terminal (try typing 'help')"
    >
        <FaTerminal className="text-white text-lg relative z-10" />
        <div
            className="absolute inset-0 rounded-full border-2 border-[#00d4ff]/60 animate-ping"
            style={{ animationDuration: "2s" }}
        />
    </motion.button>
);

export default Terminal;
