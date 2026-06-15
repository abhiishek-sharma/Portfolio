// ============================================================
// PORTFOLIO DATA - Edit this file to customize your portfolio
// ============================================================

export const portfolioData = {
    // Personal Info
    personal: {
        name: "Abhishek Sharma",
        title: "Software Engineer & AI Engineer",
        roles: [
            "Full Stack Developer",
            "AI/ML Engineer",
            "Open Source Contributor",
            "Problem Solver",
            "Cloud Architect",
        ],
        bio: "Passionate developer crafting intelligent systems and beautiful interfaces. I blend code with creativity to build things that matter. When not coding, I'm exploring AI frontiers and anime universes.",
        location: "India 🇮🇳",
        email: "abhisheksharmaa1404@gmail.com",
        phone: "+91 7817988677",
        github: "https://github.com/Abhishek01454",
        linkedin: "https://linkedin.com/in/abhishek-sharma",
        resume: "/resume.pdf",
        // ── Set your real photo path here ──────────────────────────────────
        // Place your photo (e.g. photo.jpg) inside the public/ folder,
        // then set photoUrl: "/photo.jpg"  — or paste any HTTPS image URL.
        photoUrl: "",
    },

    // Skills
    skills: [
        {
            category: "Frontend",
            icon: "🎨",
            color: "#00d4ff",
            items: [
                { name: "React.js", level: 92, years: 4 },
                { name: "TypeScript", level: 85, years: 3 },
                { name: "Next.js", level: 80, years: 2 },
                { name: "Tailwind CSS", level: 90, years: 3 },
                { name: "Framer Motion", level: 75, years: 2 },
            ],
        },
        {
            category: "Backend",
            icon: "⚙️",
            color: "#8b5cf6",
            items: [
                { name: "Node.js", level: 88, years: 4 },
                { name: "Python", level: 90, years: 5 },
                { name: "FastAPI", level: 82, years: 2 },
                { name: "GraphQL", level: 72, years: 2 },
                { name: "PostgreSQL", level: 85, years: 4 },
            ],
        },
        {
            category: "AI / ML",
            icon: "🤖",
            color: "#00ff88",
            items: [
                { name: "PyTorch", level: 80, years: 3 },
                { name: "TensorFlow", level: 75, years: 3 },
                { name: "LangChain", level: 85, years: 2 },
                { name: "OpenAI API", level: 90, years: 2 },
                { name: "Hugging Face", level: 78, years: 2 },
            ],
        },
        {
            category: "DevOps / Cloud",
            icon: "☁️",
            color: "#ff8c00",
            items: [
                { name: "Docker", level: 82, years: 3 },
                { name: "AWS", level: 75, years: 2 },
                { name: "CI/CD (GitHub Actions)", level: 80, years: 3 },
                { name: "Kubernetes", level: 65, years: 1 },
                { name: "Linux", level: 88, years: 5 },
            ],
        },
    ],

    // Experience
    experience: [
        {
            company: "TechCorp India",
            role: "Senior Full Stack Developer",
            period: "2023 – Present",
            location: "Bangalore, India",
            description: "Leading the development of AI-powered SaaS products. Architected microservices handling 1M+ daily requests.",
            achievements: [
                "Reduced API latency by 60% through Redis caching strategies",
                "Built RAG-based AI assistant saving 3hrs/dev/day",
                "Led team of 6 engineers delivering 4 major product releases",
            ],
            tech: ["React", "Node.js", "Python", "AWS", "OpenAI"],
            type: "full-time",
        },
        {
            company: "StartupXYZ",
            role: "ML Engineer",
            period: "2021 – 2023",
            location: "Remote",
            description: "Developed and deployed production ML models for NLP and computer vision tasks.",
            achievements: [
                "Built sentiment analysis model with 94% accuracy",
                "Deployed real-time object detection pipeline",
                "Created automated data pipeline processing 50GB daily",
            ],
            tech: ["PyTorch", "FastAPI", "Docker", "GCP"],
            type: "full-time",
        },
        {
            company: "OpenSource Projects",
            role: "Contributor",
            period: "2019 – Present",
            location: "Global",
            description: "Active contributor to various open source projects in AI and web development ecosystems.",
            achievements: [
                "500+ GitHub stars across personal projects",
                "Merged 20+ PRs to popular repositories",
                "Maintained 3 npm packages with 10K+ weekly downloads",
            ],
            tech: ["Various"],
            type: "volunteer",
        },
    ],

    // Projects
    projects: [
        {
            name: "NeuralChat",
            description: "AI-powered chat platform with multi-model support, RAG capabilities, and real-time streaming. Supports GPT-4, Claude, and Gemini.",
            tech: ["React", "Node.js", "OpenAI", "LangChain", "WebSockets"],
            github: "https://github.com/Abhishek01454",
            live: "https://neuralchat.demo.com",
            stars: 342,
            category: "AI",
            gradient: "from-blue-500 to-cyan-500",
            featured: true,
            emoji: "🤖",
        },
        {
            name: "CodeFlow IDE",
            description: "Browser-based IDE with AI pair programming, real-time collaboration, and support for 20+ programming languages.",
            tech: ["React", "Monaco Editor", "WebRTC", "Docker"],
            github: "https://github.com/Abhishek01454",
            live: null,
            stars: 218,
            category: "Dev Tool",
            gradient: "from-purple-500 to-pink-500",
            featured: true,
            emoji: "💻",
        },
        {
            name: "QuantumDB",
            description: "Natural language to SQL converter using fine-tuned LLMs. Query your database just by talking to it.",
            tech: ["Python", "FastAPI", "PostgreSQL", "Transformers"],
            github: "https://github.com/Abhishek01454",
            live: "https://quantumdb.demo.com",
            stars: 156,
            category: "AI",
            gradient: "from-green-500 to-emerald-500",
            featured: false,
            emoji: "🗄️",
        },
        {
            name: "AnimeDash",
            description: "Personalized anime recommendation system using collaborative filtering and sentiment analysis of reviews.",
            tech: ["Python", "PyTorch", "React", "FastAPI"],
            github: "https://github.com/Abhishek01454",
            live: null,
            stars: 98,
            category: "ML",
            gradient: "from-orange-500 to-red-500",
            featured: false,
            emoji: "🎌",
        },
        {
            name: "CloudOrchestrator",
            description: "Multi-cloud deployment automation tool with cost optimization, supporting AWS, GCP, and Azure simultaneously.",
            tech: ["Python", "Terraform", "Docker", "Kubernetes"],
            github: "https://github.com/Abhishek01454",
            live: null,
            stars: 87,
            category: "DevOps",
            gradient: "from-yellow-500 to-orange-500",
            featured: false,
            emoji: "☁️",
        },
        {
            name: "RealTimeVision",
            description: "WebAssembly-powered real-time object detection running entirely in the browser. No server needed.",
            tech: ["TensorFlow.js", "WASM", "React", "WebGL"],
            github: "https://github.com/Abhishek01454",
            live: "https://rtvision.demo.com",
            stars: 204,
            category: "Computer Vision",
            gradient: "from-pink-500 to-rose-500",
            featured: false,
            emoji: "👁️",
        },
    ],

    // Certifications
    certifications: [
        {
            name: "AWS Solutions Architect Professional",
            issuer: "Amazon Web Services",
            date: "2024",
            icon: "☁️",
            color: "#ff8c00",
            link: "#",
        },
        {
            name: "TensorFlow Developer Certificate",
            issuer: "Google",
            date: "2023",
            icon: "🤖",
            color: "#00ff88",
            link: "#",
        },
        {
            name: "Kubernetes Application Developer (CKAD)",
            issuer: "CNCF",
            date: "2023",
            icon: "⚓",
            color: "#00d4ff",
            link: "#",
        },
        {
            name: "Meta React Developer",
            issuer: "Meta",
            date: "2022",
            icon: "⚛️",
            color: "#8b5cf6",
            link: "#",
        },
        {
            name: "DeepLearning.AI Specialization",
            issuer: "Coursera / Andrew Ng",
            date: "2022",
            icon: "🧠",
            color: "#ff006e",
            link: "#",
        },
    ],

    // Education
    education: [
        {
            degree: "B.Tech in Computer Science",
            institution: "IIT Delhi",
            period: "2018 – 2022",
            gpa: "8.9 / 10",
            description: "Specialized in Artificial Intelligence & Machine Learning. Published 2 research papers.",
            icon: "🎓",
            color: "#00d4ff",
        },
        {
            degree: "Higher Secondary (12th)",
            institution: "DPS RK Puram, New Delhi",
            period: "2016 – 2018",
            gpa: "95.4%",
            description: "Science stream (PCM + CS). School topper in Computer Science.",
            icon: "📚",
            color: "#8b5cf6",
        },
    ],

    // Hobbies
    hobbies: [
        { name: "Anime", icon: "🎌", description: "Jujutsu Kaisen, Code Geass, Death Note", color: "#ff006e" },
        { name: "Competitive Coding", icon: "⌨️", description: "LeetCode, Codeforces, HackerRank", color: "#00d4ff" },
        { name: "Chess", icon: "♟️", description: "Rated 1800 on Chess.com", color: "#ffd60a" },
        { name: "Open Source", icon: "🌐", description: "Contributing to the community", color: "#00ff88" },
        { name: "Reading", icon: "📖", description: "Sci-Fi, Philosophy, Tech blogs", color: "#8b5cf6" },
        { name: "Gaming", icon: "🎮", description: "RPGs, Strategy games", color: "#ff8c00" },
        { name: "Music", icon: "🎵", description: "Lo-fi, Japanese OSTs", color: "#a78bfa" },
        { name: "Photography", icon: "📸", description: "Street & landscape photography", color: "#34d399" },
    ],

    // Contact
    contact: {
        email: "abhishek@example.com",
        phone: "+91 98765 43210",
        location: "Bangalore, India",
        availability: "Open to opportunities",
        responseTime: "Within 24 hours",
        // Get your free access key from https://web3forms.com/
        // When empty, the contact form will run in simulation mode.
        web3formsKey: "e579d9e3-7a00-4cec-a078-91dac92240e2",
        social: {
            github: "https://github.com/Abhishek01454",
            linkedin: "https://linkedin.com/in/abhishek-sharma",
            twitter: "https://twitter.com/abhishek_dev",
        },
    },
};

export default portfolioData;
