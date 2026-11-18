// ============================================================
// PORTFOLIO DATA - Edit this file to customize your portfolio
// ============================================================

export const portfolioData = {
    // Personal Info
    personal: {
        name: "Abhishek Sharma",
        title: "Forward Deployed Engineer · Generative AI",
        roles: [
            "Forward Deployed Engineer",
            "Generative AI Engineer",
            "LLM Evaluation Engineer",
        ],
        bio: "Software engineer with two years of applied AI, LLM post-training and evaluation experience. I translate external research goals into evaluation workflows, failure data and model trajectories for targeted post-training, and I build multi-repository tooling and production software.",
        tagline: "I build evaluation harnesses, run long-horizon agentic jobs and ship production software, working directly with external research engineers on frontier-model post-training.",
        location: "Noida, India",
        email: "abhisheksharmaa1404@gmail.com",
        github: "https://github.com/abhiishek-sharma",
        linkedin: "https://linkedin.com/in/abhisheksharma04",
        twitter: "",
        resume: "/resume.pdf",
        photoUrl: "/profile.jpg",
    },

    // Headline numbers, all taken from the resumes
    stats: [
        { value: "2,000+", label: "AI training & evaluation tasks delivered", icon: "🧪" },
        { value: "24h+", label: "Long-running agentic jobs operated", icon: "🤖" },
        { value: "3.2K", label: "Monthly visitors on a production site I maintain", icon: "🌐" },
    ],

    // Skills, merged from all three resumes
    skills: [
        {
            category: "Generative AI",
            icon: "🧠",
            color: "#00ff88",
            items: [
                "LLM applications",
                "RAG",
                "Vector databases",
                "Agentic workflows",
                "Prompt engineering",
                "OpenAI API",
                "Ollama",
            ],
        },
        {
            category: "Post-training",
            icon: "🎯",
            color: "#ff006e",
            items: [
                "Supervised fine-tuning",
                "RLHF",
                "Preference ranking",
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
                "SWE-bench",
                "SWE-Smith",
                "ARC-AGI-3",
                "LLM-as-judge grading",
                "Grading rubrics",
                "Verified reference solutions",
                "Difficulty calibration",
            ],
        },
        {
            category: "Engineering",
            icon: "⚙️",
            color: "#8b5cf6",
            items: [
                "Python",
                "TypeScript",
                "JavaScript",
                "SQL",
                "Go",
                "Rust",
                "FastAPI",
                "REST APIs",
                "Next.js",
                "React",
                "Node.js",
                "Pandas",
                "NumPy",
            ],
        },
        {
            category: "Delivery & Infrastructure",
            icon: "🛠️",
            color: "#ff8c00",
            items: [
                "Docker",
                "AWS ECR",
                "Bash",
                "Git",
                "GitHub Actions",
                "pytest",
            ],
        },
    ],

    // Experience
    experience: [
        {
            company: "Ethara AI",
            role: "Software Engineer, LLM Evaluation",
            period: "Nov 2024 – Present",
            location: "Noida, India",
            description: "Applied AI engineering for frontier-model post-training: working directly with an external research engineer, building evaluation harnesses and tooling, and producing verified data for targeted post-training.",
            achievementGroups: [
                {
                    heading: "Forward deployed & applied AI",
                    items: [
                        "Worked directly with an external research engineer to identify where frontier models failed reasoning tasks, translating research goals into evaluation workflows, failure examples and model trajectories for targeted post-training",
                        "Identified failure modes in frontier models across coding, long-horizon reasoning and instruction following; produced verified solutions and targeted data for post-training",
                        "Additional work across RAG, vector retrieval, model fine-tuning and RLHF",
                    ],
                },
                {
                    heading: "Evaluation harnesses & agent infrastructure",
                    items: [
                        "Built and delivered a code-migration evaluation harness informed by a research review, with code-migration tasks, task execution and model-trajectory generation",
                        "Developed tooling for two evaluation harnesses, including ARC-AGI-3 benchmark-based evaluation of model reasoning and OpenAI API-based judging and grading",
                        "Operated 24-hour-plus agentic jobs in Docker sandboxes with memory limits, image management, AWS ECR, Python scripts and Bash watchers",
                    ],
                },
                {
                    heading: "Post-training",
                    items: [
                        "Ran supervised fine-tuning workflows and contributed to in-house RLHF tooling",
                        "Authored adversarial prompts targeting reasoning and instruction-following failures; ranked model outputs as preference pairs for reward-model training",
                        "Produced verified reference solutions, tests, grading rubrics, trajectories and harness code for post-training workflows",
                    ],
                },
                {
                    heading: "Task design & quality gates",
                    items: [
                        "Delivered 2,000+ AI training and evaluation tasks over two years",
                        "Authored and delivered 50+ SWE-bench and SWE-Smith-style coding tasks in Python, Go, Rust and TypeScript, with reference fixes and tests",
                        "Led task quality gates using rubrics, tests and iterative difficulty calibration, hardening tasks and verifying them against model solve rates",
                    ],
                },
            ],
            achievements: [],
            tech: ["Python", "Docker", "AWS ECR", "OpenAI API", "Bash", "pytest", "SFT", "RLHF"],
            type: "full-time",
        },
    ],

    // Projects — real, verifiable, with accurate live/github links
    projects: [
        {
            name: "QueryForge",
            description: "Schema-aware natural-language-to-SQL pipeline with schema extraction from CSV, Excel and SQLite, running on a local Ollama model. A validation layer blocks unsafe queries and corrects mismatched table and column names. Ships with a 16-question eval suite.",
            tech: ["Python", "FastAPI", "Ollama", "SQLCoder", "sqlparse", "React"],
            github: "https://github.com/abhiishek-sharma/QueryForge",
            live: null,
            category: "GenAI",
            featured: true,
            emoji: "🔍",
        },
        {
            name: "Aspiron Systems",
            description: "Production website for an SAP training and consulting company, which I built and maintain end to end: frontend, backend, database, features and deployments. Serves about 3,200 visitors a month.",
            tech: ["Next.js", "React", "TypeScript"],
            github: null,
            live: null,
            category: "Production",
            featured: true,
            emoji: "🌐",
        },
        {
            name: "Automation Doctor",
            description: "Verifies that scheduled jobs actually achieved their outcome, not just exited 0. Deterministic verdicts from outcome checks, with an optional local LLM explanation of each failure. Python standard library only.",
            tech: ["Python", "Ollama", "YAML", "Bash"],
            github: "https://github.com/abhiishek-sharma/automation-auditor",
            live: null,
            category: "Reliability",
            featured: true,
            emoji: "🩺",
        },
        {
            name: "AssistIQ",
            description: "Approval portal for AICTE with Chanakya, a guided chatbot over the AICTE Approval Process Handbook, plus a document checklist, fee statement generator and application tracker. National runner-up, Smart India Hackathon 2023.",
            tech: ["React", "Vite", "Firebase", "Botpress", "Three.js"],
            github: "https://github.com/abhiishek-sharma/SIH2023",
            live: "https://assistiq-aicte.vercel.app",
            category: "GenAI",
            featured: true,
            emoji: "🏛️",
        },
        {
            name: "WooCommerce",
            description: "Open-source contributions to the WooCommerce repository: pull requests and issue reports.",
            tech: ["Open Source", "Pull requests", "Issue reports"],
            github: "https://github.com/woocommerce/woocommerce",
            live: null,
            category: "Open Source",
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
            description: "Runner-up, Smart India Hackathon 2023 (national finals), after winning pre-qualifiers against 100+ teams.",
            icon: "🎓",
            color: "#00d4ff",
        },
    ],

    // Contact
    contact: {
        email: "abhisheksharmaa1404@gmail.com",
        phone: "",
        location: "Noida, India",
        availability: "Open to Forward Deployed and GenAI roles",
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
