// ============================================================
// PORTFOLIO DATA - Edit this file to customize your portfolio
// ============================================================

export const portfolioData = {
    // Personal Info
    personal: {
        name: "Abhishek Sharma",
        title: "Generative AI Engineer",
        roles: [
            "Generative AI Engineer",
            "LLM Evaluation Engineer",
            "Forward Deployed Engineer",
            "Full Stack Developer",
        ],
        bio: "Software engineer with two years of LLM post-training and evaluation experience. I find where frontier models fail on coding and long-horizon reasoning, then build the verified solutions, tests, rubrics and harnesses that turn those failures into training data.",
        location: "Noida, India",
        email: "abhisheksharmaa1404@gmail.com",
        github: "https://github.com/abhiishek-sharma",
        linkedin: "https://linkedin.com/in/abhisheksharma04",
        twitter: "",
        resume: "/resume.pdf",
        photoUrl: "",
    },

    // Headline numbers, all taken from the resume
    stats: [
        { value: "2 yrs", label: "LLM evaluation & post-training", icon: "⚡" },
        { value: "2,000+", label: "AI training & eval tasks delivered", icon: "🧪" },
        { value: "50+", label: "Coding tasks authored", icon: "💻" },
        { value: "SIH '23", label: "National runner-up", icon: "🏆" },
    ],

    // Skills
    skills: [
        {
            category: "LLM Post-training",
            icon: "🧠",
            color: "#00ff88",
            items: [
                "Supervised fine-tuning",
                "RLHF & preference ranking",
                "Targeted training data",
                "Model trajectories",
                "Adversarial prompting",
            ],
        },
        {
            category: "Evaluation",
            icon: "📏",
            color: "#00d4ff",
            items: [
                "Evaluation harnesses",
                "SWE-bench / SWE-Smith tasks",
                "ARC-AGI-3 benchmark",
                "Grading rubrics",
                "LLM-as-judge (OpenAI API)",
                "RAG & vector databases",
            ],
        },
        {
            category: "Languages & Frameworks",
            icon: "⚙️",
            color: "#8b5cf6",
            items: [
                "Python",
                "TypeScript / JavaScript",
                "SQL",
                "FastAPI",
                "Next.js / React",
                "Node.js",
            ],
        },
        {
            category: "Infra & Tools",
            icon: "🛠️",
            color: "#ff8c00",
            items: [
                "Docker sandboxes",
                "AWS ECR",
                "Bash",
                "Git / GitHub Actions",
                "pytest",
                "Ollama (local LLMs)",
            ],
        },
    ],

    // Experience
    experience: [
        {
            company: "Ethara AI",
            role: "Software Engineer & Quality Lead, LLM Evaluation",
            period: "Nov 2024 – Present",
            location: "Noida, India",
            description: "Post-training and evaluation work for frontier language models: finding failure modes, then producing verified data that fixes them.",
            achievements: [
                "Identified coding and long-horizon reasoning failures in frontier models; delivered verified solutions, failure examples and trajectories for targeted post-training",
                "Delivered 2,000+ AI training and evaluation tasks, including 50+ authored coding tasks in Python, Go, Rust and TypeScript with reference solutions and tests",
                "Built a code-migration evaluation harness with task execution and model-trajectory generation",
                "Developed tooling for two evaluation harnesses, including ARC-AGI-3 benchmark evaluation and OpenAI API-based judging and grading",
                "Ran supervised fine-tuning and RLHF workflows; ranked model outputs as preference pairs for reward-model training",
                "Operated 24-hour-plus agentic jobs in Docker sandboxes with memory limits, AWS ECR and Bash watchers",
                "Led task quality gates with rubrics, tests and difficulty calibration against model solve rates",
            ],
            tech: ["Python", "Docker", "AWS ECR", "OpenAI API", "Bash", "pytest"],
            type: "full-time",
        },
        {
            company: "Smart India Hackathon 2023",
            role: "Full Stack Developer, Team FusionX",
            period: "Nov 2023",
            location: "National Finals",
            description: "Built AssistIQ, an AICTE approval portal with Chanakya, a guided-menu chatbot covering the AICTE Approval Process Handbook. Problem statement PS1583 by AICTE.",
            achievements: [
                "National runner-up after winning pre-qualifiers against 100+ teams",
                "Shipped the React + Firebase + Botpress stack end-to-end in a 36-hour hackathon",
                "Chanakya walks institutes through AICTE handbook topics: eligibility, intake, approvals and fees",
            ],
            tech: ["React", "Vite", "Firebase", "Botpress", "Three.js"],
            type: "hackathon",
        },
    ],

    // Projects — real, verifiable, with accurate live/github links
    projects: [
        {
            name: "QueryForge",
            description: "Schema-aware natural-language-to-SQL over CSV, Excel and SQLite using a local Ollama model. A validation layer blocks unsafe queries and corrects mismatched table and column names. Ships with a 16-question eval suite.",
            tech: ["Python", "FastAPI", "Ollama", "SQLCoder", "sqlparse", "React"],
            github: "https://github.com/abhiishek-sharma/QueryForge",
            live: null,
            category: "AI",
            gradient: "from-blue-500 to-cyan-500",
            featured: true,
            emoji: "🔍",
        },
        {
            name: "Aspiron Systems",
            description: "Production website for an SAP training and consulting company. I built it and actively maintain it end to end: frontend, backend, database, features, fixes and deployments. About 3,200 monthly visitors.",
            tech: ["Next.js", "React", "TypeScript"],
            github: null,
            live: null,
            category: "Full Stack",
            gradient: "from-indigo-500 to-blue-500",
            featured: true,
            emoji: "🌐",
        },
        {
            name: "Automation Doctor",
            description: "Checks whether scheduled jobs actually succeeded — not just exited 0. Deterministic verdict from outcome checks; Ollama optionally adds a plain-English explanation. Python stdlib only.",
            tech: ["Python", "Ollama", "YAML", "Bash"],
            github: "https://github.com/abhiishek-sharma/automation-auditor",
            live: null,
            category: "DevOps",
            gradient: "from-purple-500 to-pink-500",
            featured: true,
            emoji: "🩺",
        },
        {
            name: "AssistIQ",
            description: "AICTE approval portal with Chanakya, a guided-menu chatbot (Botpress), plus a dynamic document checklist, fee statement generator and application tracker. SIH 2023 runner-up.",
            tech: ["React", "Vite", "Firebase", "Botpress", "Three.js"],
            github: "https://github.com/abhiishek-sharma/SIH2023",
            live: "https://assistiq-aicte.vercel.app",
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
            category: "Dev Tool",
            gradient: "from-pink-500 to-rose-500",
            featured: false,
            emoji: "📖",
        },
        {
            name: "WooCommerce",
            description: "Open-source contributions to the WooCommerce repository: pull requests and issue reports.",
            tech: ["Open Source", "Pull requests", "Issue reports"],
            github: "https://github.com/woocommerce/woocommerce",
            live: null,
            category: "Open Source",
            gradient: "from-violet-500 to-purple-500",
            featured: false,
            emoji: "🛒",
        },
    ],

    // Education
    education: [
        {
            degree: "B.Tech. in Computer Science",
            institution: "Galgotias University, Greater Noida",
            period: "2021 – 2025",
            gpa: "CGPA 8.52/10",
            description: "Smart India Hackathon 2023 national runner-up with team FusionX.",
            icon: "🎓",
            color: "#00d4ff",
        },
    ],

    // Contact
    contact: {
        email: "abhisheksharmaa1404@gmail.com",
        phone: "",
        location: "Noida, India",
        availability: "Open to remote opportunities",
        responseTime: "Within 24 hours",
        web3formsKey: "e579d9e3-7a00-4cec-a078-91dac92240e2",
        social: {
            github: "https://github.com/abhiishek-sharma",
            linkedin: "https://linkedin.com/in/abhisheksharma04",
            twitter: "",
        },
    },
};

export default portfolioData;
