// Scroll-driven animations for every section below the hero (GSAP ScrollTrigger).
// Runs once the page has rendered; Lenis keeps ScrollTrigger in sync (see smoothScroll.js).
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "./smoothScroll";

gsap.registerPlugin(ScrollTrigger);

const CARD = ".glass, .spotlight-card, .terminal-window";

// Top-level cards in a section: skip cards nested inside another card.
const topLevelCards = (section) =>
    gsap.utils
        .toArray(section.querySelectorAll(CARD))
        // buttons and links share the glass style but are controls, not cards
        .filter((el) => !el.matches("button, a"))
        .filter((el) => !el.parentElement.closest(CARD) || !section.contains(el.parentElement.closest(CARD)));

export function startScrollAnimations() {
    if (prefersReducedMotion()) return () => {};

    const ctx = gsap.context(() => {
        // 1. Page progress bar along the top edge
        gsap.to("#scroll-progress", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3 },
        });

        gsap.utils.toArray("section:not(#home)").forEach((section) => {
            // 2. Section header: label, title and underline rise in, underline draws across
            const heading = section.querySelector(".section-heading");
            const header = heading?.parentElement;
            if (header) {
                const underline = header.querySelector(".w-24.h-px");
                const parts = [...header.children].filter((el) => el !== underline);
                const tl = gsap.timeline({
                    scrollTrigger: { trigger: header, start: "top 85%", toggleActions: "play none none reverse" },
                });
                tl.from(parts, { y: 60, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" });
                if (underline) {
                    tl.from(underline, { scaleX: 0, transformOrigin: "center", duration: 0.7, ease: "power2.out" }, "-=0.4");
                }
                // Gentle parallax: the title drifts slower than the page
                gsap.to(header, {
                    yPercent: -25,
                    ease: "none",
                    scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
                });
            }

            // 3. Cards rise and un-tilt in staggered batches as they enter
            const cards = topLevelCards(section);
            gsap.set(cards, { opacity: 0, y: 70, rotateX: -8, transformPerspective: 900 });
            ScrollTrigger.batch(cards, {
                start: "top 88%",
                onEnter: (batch) =>
                    gsap.to(batch, { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", overwrite: true }),
                onLeaveBack: (batch) =>
                    gsap.to(batch, { opacity: 0, y: 70, rotateX: -8, duration: 0.5, stagger: 0.05, overwrite: true }),
            });
        });

        // 4. About & Contact: columns slide in from their side
        gsap.utils.toArray("[data-anim=from-left], [data-anim=from-right]").forEach((col) => {
            gsap.from(col, {
                x: col.dataset.anim === "from-left" ? -80 : 80,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: { trigger: col, start: "top 85%", toggleActions: "play none none reverse" },
            });
        });

        // 5. Skills: chips pop in one after another inside each card
        gsap.utils.toArray("#skills .glass").forEach((card) => {
            gsap.from(card.querySelectorAll(".flex-wrap > span"), {
                scale: 0.6,
                opacity: 0,
                duration: 0.45,
                stagger: 0.05,
                ease: "back.out(1.7)",
                scrollTrigger: { trigger: card, start: "top 80%", toggleActions: "play none none reverse" },
            });
        });

        // 6. Experience: timeline draws as you scroll; bullets slide in group by group
        gsap.from("#experience .timeline-line", {
            scaleY: 0,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: { trigger: "#experience", start: "top 70%", end: "bottom 60%", scrub: true },
        });
        gsap.utils.toArray("#experience ul").forEach((list) => {
            gsap.from(list.querySelectorAll("li"), {
                x: -30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "power2.out",
                scrollTrigger: { trigger: list, start: "top 85%", toggleActions: "play none none reverse" },
            });
        });

    });

    // Fonts and images change layout after first paint; recompute trigger positions.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 600);

    return () => {
        clearTimeout(t);
        window.removeEventListener("load", refresh);
        ctx.revert();
    };
}
