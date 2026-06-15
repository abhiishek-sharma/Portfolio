// src/components/MatrixRain.jsx
// Animated canvas matrix rain background effect
import { useEffect, useRef } from "react";

const MatrixRain = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()アイウエオカキクケコ";
        const fontSize = 14;
        let columns = Math.floor(canvas.width / fontSize);
        let drops = Array(columns).fill(1);

        const draw = () => {
            ctx.fillStyle = "rgba(13, 13, 26, 0.04)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                // Leading character is brighter
                if (drops[i] * fontSize < canvas.height * 0.05) {
                    ctx.fillStyle = "#ffffff";
                } else {
                    // Gradient effect: blue → green → fade
                    const progress = (drops[i] * fontSize) / canvas.height;
                    const r = Math.floor(0 * (1 - progress));
                    const g = Math.floor(255 * (1 - progress) * 0.5);
                    const b = Math.floor(255 * (1 - progress));
                    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.15 + 0.05 * Math.random()})`;
                }

                ctx.fillText(char, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            animationId = requestAnimationFrame(draw);
        };

        // Start with a delay for performance
        const timeout = setTimeout(() => {
            draw();
        }, 500);

        return () => {
            clearTimeout(timeout);
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.25 }}
        />
    );
};

export default MatrixRain;
