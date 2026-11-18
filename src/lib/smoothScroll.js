// Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync.
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis = null;

export const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function startSmoothScroll() {
    if (lenis || prefersReducedMotion()) return () => {};
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
        gsap.ticker.remove(tick);
        lenis?.destroy();
        lenis = null;
    };
}

// Scroll to a section id (or "top"), using Lenis when it is running.
export function scrollToSection(id) {
    const target = id === "top" ? 0 : document.getElementById(id);
    if (target === null) return;
    if (lenis) {
        lenis.scrollTo(target, { offset: id === "top" ? 0 : -72 });
    } else if (id === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        target.scrollIntoView({ behavior: "smooth" });
    }
}
