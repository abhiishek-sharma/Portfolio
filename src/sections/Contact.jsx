// src/sections/Contact.jsx
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import portfolioData from "../config/portfolioData";

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { contact, personal } = portfolioData;
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);

        // If Web3Forms key is missing, just simulate the form
        if (!contact.web3formsKey) {
            console.log("Web3Forms key not found, running simulation mode...");
            await new Promise((r) => setTimeout(r, 1500));
            setSending(false);
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 5000);
            setFormData({ name: "", email: "", subject: "", message: "" });
            return;
        }

        try {
            const formDataObj = new FormData();
            formDataObj.append("access_key", contact.web3formsKey);
            formDataObj.append("name", formData.name);
            formDataObj.append("email", formData.email);
            formDataObj.append("subject", formData.subject);
            formDataObj.append("message", formData.message);

            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formDataObj,
            });

            if (res.ok) {
                setSubmitted(true);
                setTimeout(() => setSubmitted(false), 5000);
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                alert("Failed to send message. Please try again later.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while sending the message.");
        }

        setSending(false);
    };

    const socialLinks = [
        { icon: FaGithub, href: personal.github, label: "GitHub", color: "#ffffff" },
        { icon: FaLinkedin, href: personal.linkedin, label: "LinkedIn", color: "#0077b5" },
        { icon: FaEnvelope, href: `mailto:${personal.email}`, label: "Email", color: "#00d4ff" },
    ];

    return (
        <section id="contact" className="relative overflow-hidden lg:min-h-screen lg:flex lg:flex-col lg:justify-start py-20 lg:pt-24 lg:pb-8">
            <div className="absolute inset-0 bg-[#0a0a14]" />
            <div className="absolute inset-0 cyber-grid-bg opacity-20" />
            <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />

            <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-8 lg:mb-10"
                >
                    <p className="font-mono text-[#00d4ff] text-sm uppercase tracking-widest mb-3">06 / Contact</p>
                    <h2 className="section-heading">Get In Touch</h2>
                    <div className="w-24 h-px mx-auto bg-[#00d4ff] mt-4" />
                    <p className="text-gray-400 mt-3 max-w-lg mx-auto">
                        Hiring for GenAI, LLM evaluation or forward deployed roles? I'd like to hear from you.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:items-stretch lg:min-h-[calc(100vh-320px)]">
                    {/* Left: Contact Info */}
                    <motion.div
                        data-anim="from-left"
                        className="flex flex-col gap-4"
                    >
                        <div className="glass rounded-2xl p-5 border border-white/5 space-y-4 lg:flex-1">
                            <h3 className="font-display font-bold text-lg text-white">Contact Information</h3>

                            {[
                                { icon: FaEnvelope, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
                                { icon: FaMapMarkerAlt, label: "Location", value: contact.location, href: null },
                            ].map(({ icon: Icon, label, value, href }) => (
                                <div key={label} className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center flex-shrink-0">
                                        <Icon className="text-[#00d4ff] text-sm" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-mono text-gray-500">{label}</p>
                                        {href ? (
                                            <a href={href} className="text-sm text-gray-300 hover:text-[#00d4ff] transition-colors font-mono">
                                                {value}
                                            </a>
                                        ) : (
                                            <p className="text-sm text-gray-300 font-mono">{value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Availability */}
                        <div className="glass rounded-2xl p-5 border border-[#00ff88]/20">
                            <div className="flex items-center gap-3 mb-2">
                                <HiSparkles className="text-[#00ff88] animate-spin-slow" />
                                <span className="text-[#00ff88] font-mono text-sm font-semibold">{contact.availability}</span>
                            </div>
                            <p className="text-gray-500 text-xs font-mono">Response time: {contact.responseTime}</p>
                        </div>

                        {/* Social */}
                        <div>
                            <p className="text-gray-500 font-mono text-xs mb-4">// Connect on social</p>
                            <div className="flex gap-4">
                                {socialLinks.map(({ icon: Icon, href, label, color }) => (
                                    <motion.a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.2, y: -4 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-12 h-12 glass rounded-xl flex items-center justify-center border border-white/10 hover:border-white/30 transition-all duration-300 group"
                                        title={label}
                                    >
                                        <Icon className="text-lg text-gray-400 group-hover:scale-110 transition-all"
                                            style={{ color: undefined }}
                                            onMouseEnter={(e) => (e.target.style.color = color)}
                                            onMouseLeave={(e) => (e.target.style.color = "")}
                                        />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div data-anim="from-right" className="flex flex-col">
                        <div className="terminal-window lg:flex-1">
                            <div className="terminal-header">
                                <div className="terminal-dot bg-red-500" />
                                <div className="terminal-dot bg-yellow-500" />
                                <div className="terminal-dot bg-green-500" />
                                <span className="ml-3 font-mono text-xs text-gray-500">send_message.sh</span>
                            </div>
                            <div className="p-5">
                                {submitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-10"
                                    >
                                        <div className="text-5xl mb-4">🚀</div>
                                        <p className="text-[#00ff88] font-mono text-lg font-bold mb-2">Message sent!</p>
                                        <p className="text-gray-400 font-mono text-sm">I'll reply within 24 hours.</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-3">
                                        {[
                                            { name: "name", label: "YOUR_NAME", type: "text", placeholder: "Your name" },
                                            { name: "email", label: "YOUR_EMAIL", type: "email", placeholder: "you@company.com" },
                                            { name: "subject", label: "SUBJECT", type: "text", placeholder: "Role or project" },
                                        ].map((field) => (
                                            <div key={field.name}>
                                                <label className="block font-mono text-xs text-[#00d4ff] mb-1.5">
                                                    $ {field.label}:
                                                </label>
                                                <input
                                                    type={field.type}
                                                    required
                                                    placeholder={field.placeholder}
                                                    value={formData[field.name]}
                                                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-gray-300 placeholder-gray-700 focus:outline-none focus:border-[#00d4ff]/50 focus:bg-white/8 transition-all duration-300"
                                                />
                                            </div>
                                        ))}
                                        <div>
                                            <label className="block font-mono text-xs text-[#00d4ff] mb-1.5">$ MESSAGE:</label>
                                            <textarea
                                                required
                                                placeholder="A few lines on the role or problem you are working on"
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                rows={4}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-gray-300 placeholder-gray-700 focus:outline-none focus:border-[#00d4ff]/50 focus:bg-white/8 transition-all duration-300 resize-none"
                                            />
                                        </div>
                                        <motion.button
                                            type="submit"
                                            disabled={sending}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full btn-cyber text-white py-3.5 flex items-center justify-center gap-2 disabled:opacity-60"
                                        >
                                            {sending ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <span>$ send --message</span>
                                                </>
                                            )}
                                        </motion.button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
