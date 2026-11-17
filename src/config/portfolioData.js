// ============================================================
// PORTFOLIO DATA - Edit this file to customize your portfolio
// ============================================================

export const portfolioData = {
    // Personal Info
    personal: {
        name: "Abhishek Sharma",
        title: "Full Stack & AI Engineer",
        roles: [
            "Full Stack Developer",
            "AI/ML Engineer",
            "Open Source Builder",
            "Problem Solver",
        ],
        bio: "I build tools that actually work: local-first AI pipelines, full-stack dashboards, and developer utilities. Currently targeting AI/GenAI engineering roles with projects you can run, test, and verify yourself.",
        location: "India 🇮🇳",
        email: "abhisheksharmaa1404@gmail.com",
        github: "https://github.com/abhiishek-sharma",
        linkedin: "https://linkedin.com/in/abhiishek-sharma",
        resume: "/resume.pdf",
        photoUrl: "",
    },

    // Skills
    skills: [
        {
            category: "Frontend",
            icon: "🎨",
            color: "#00d4ff",
            items: [
                { name: "React.js", level: 88, years: 3 },
                { name: "TypeScript", level: 80, years: 2 },
                { name: "Tailwind CSS", level: 85, years: 2 },
                { name: "Vite", level: 78, years: 2 },
            ],
        },
        {
            category: "Backend",
            icon: "⚙️",
            color: "#8b5cf6",
            items: [
                { name: "Node.js / Express", level: 82, years: 2 },
                { name: "Python", level: 85, years: 3 },
                { name: "FastAPI", level: 78, years: 1 },
                { name: "SQLite / PostgreSQL", level: 75, years: 2 },
            ],
        },
        {
            category: "AI / ML",
            icon: "🤖",
            color: "#00ff88",
            items: [
                { name: "Ollama (local LLMs)", level: 82, years: 1 },
                { name: "LangChain", level: 72, years: 1 },
                { name: "Prompt Engineering", level: 80, years: 1 },
                { name: "NLP (text2sql, RAG)", level: 75, years: 1 },
            ],
        },
        {
            category: "Tools & Infra",
            icon: "🛠️",
            color: "#ff8c00",
            items: [
                { name: "Git / GitHub", level: 88, years: 3 },
                { name: "Docker", level: 65, years: 1 },
                { name: "Vercel / Firebase", level: 78, years: 2 },
                { name: "Linux / Bash", level: 75, years: 3 },
            ],
        },
    ],

    // Experience
    experience: [
        {
            company: "Smart India Hackathon 2023",
            role: "Full Stack Developer — Team FusionX",
            period: "Nov 2023",
            location: "National Finals",
            description: "Built AssistIQ, an AICTE approval portal with an AI chatbot (Chanakya) trained on the AICTE APH. Problem statement PS1583 by AICTE.",
            achievements: [
                "Runner-up at national finals (36-hour hackathon, 6-person team)",
                "Shipped React + Firebase + Botpress stack end-to-end in 36 hrs",
                "Chanakya chatbot answers questions about AICTE eligibility and fee structures",
            ],
            tech: ["React", "Vite", "Firebase", "Botpress", "Three.js"],
            type: "hackathon",
        },
        {
            company: "Open Source Projects",
            role: "Builder & Contributor",
            period: "2022 – Present",
            location: "GitHub",
            description: "Building local-first dev tools and AI utilities. Focus on reproducibility: every project ships with an eval suite or demo mode so claims can be checked.",
            achievements: [
                "QueryForge: local NLP-to-SQL pipeline, eval suite ships with the repo",
                "Automation Doctor: outcome-checking for scheduled jobs, 43 unit tests",
                "ContextLex Chrome extension: instant word definitions, MV3",
            ],
            tech: ["Python", "React", "TypeScript", "Ollama", "SQLite"],
            type: "volunteer",
        },
    ],

    // Projects — real, verifiable, with accurate live/github links
    projects: [
        {
            name: "QueryForge",
            description: "Plain-English queries over CSV, Excel and SQLite using a local Ollama model. No API key or paid service. Ships with 16-question eval suite so accuracy is measurable.",
            tech: ["Python", "FastAPI", "React", "TypeScript", "Ollama", "SQLite"],
            github: "https://github.com/abhiishek-sharma/QueryForge",
            live: null,
            stars: 0,
            category: "AI",
            gradient: "from-blue-500 to-cyan-500",
            featured: true,
            emoji: "🔍",
        },
        {
            name: "Automation Doctor",
            description: "Checks whether scheduled jobs actually succeeded — not just exited 0. Deterministic verdict from outcome checks; Ollama optionally adds a plain-English explanation. Python stdlib only.",
            tech: ["Python", "Ollama", "YAML", "Bash"],
            github: "https://github.com/abhiishek-sharma/automation-auditor",
            live: null,
            stars: 0,
            category: "DevOps",
            gradient: "from-purple-500 to-pink-500",
            featured: true,
            emoji: "🩺",
        },
        {
            name: "AssistIQ",
            description: "AICTE approval portal with Chanakya AI chatbot (Botpress), dynamic document checklist, fee statement generator, and application tracker. SIH 2023 runner-up.",
            tech: ["React", "Vite", "Firebase", "Botpress", "Three.js"],
            github: "https://github.com/abhiishek-sharma/SIH2023",
            live: "https://assistiq-blush.vercel.app",
            stars: 0,
            category: "Full Stack",
            gradient: "from-green-500 to-emerald-500",
            featured: true,
            emoji: "🏛️",
        },
        {
            name: "Personal Dashboard",
            description: "Self-hosted productivity dashboard — habits, finance, reading, todos, notes, poetry, trips. Dark glass aesthetic with gold accents. Local SQLite, no cloud, no subscriptions.",
            tech: ["React 19", "TypeScript", "Express", "SQLite", "Tailwind v4"],
            github: "https://github.com/abhiishek-sharma/personal-project",
            live: null,
            stars: 0,
            category: "Full Stack",
            gradient: "from-yellow-500 to-orange-500",
            featured: false,
            emoji: "⚡",
        },
        {
            name: "ContextLex",
            description: "Chrome extension (Manifest V3) that shows word definitions on double-click. No permissions required, dark mode, smart viewport-aware positioning.",
            tech: ["JavaScript", "Chrome Extension MV3", "CSS"],
            github: "https://github.com/abhiishek-sharma/ContextLex",
            live: null,
            stars: 0,
            category: "Dev Tool",
            gradient: "from-pink-500 to-rose-500",
            featured: false,
            emoji: "📖",
        },
    ],

    // Certifications — add only real, verifiable ones
    certifications: [],

    // Education
    education: [
        {
            degree: "B.Tech in Computer Science & Engineering",
            institution: "Engineering College, India",
            period: "2021 – 2025",
            gpa: "",
            description: "Participated in Smart India Hackathon 2023 (national runner-up). Built AI and full-stack projects throughout.",
            icon: "🎓",
            color: "#00d4ff",
        },
    ],

    // Hobbies
    hobbies: [
        { name: "Anime", icon: "🎌", description: "Jujutsu Kaisen, Code Geass, Death Note, Solo Leveling", color: "#ff006e" },
        { name: "Competitive Coding", icon: "⌨️", description: "LeetCode, Codeforces", color: "#00d4ff" },
        { name: "Open Source", icon: "🌐", description: "Building & contributing to the community", color: "#00ff88" },
        { name: "Reading", icon: "📖", description: "Sci-Fi, Philosophy, Tech blogs", color: "#8b5cf6" },
        { name: "Gaming", icon: "🎮", description: "RPGs, Strategy games", color: "#ff8c00" },
        { name: "Music", icon: "🎵", description: "Lo-fi, Japanese OSTs", color: "#a78bfa" },
    ],

    // Contact
    contact: {
        email: "abhisheksharmaa1404@gmail.com",
        phone: "",
        location: "India",
        availability: "Open to remote opportunities",
        responseTime: "Within 24 hours",
        web3formsKey: "e579d9e3-7a00-4cec-a078-91dac92240e2",
        social: {
            github: "https://github.com/abhiishek-sharma",
            linkedin: "https://linkedin.com/in/abhiishek-sharma",
            twitter: "",
        },
    },
};

export default portfolioData;
