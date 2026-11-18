// Scroll-driven animations (GSAP ScrollTrigger + SplitText). Almost everything is
// scrubbed: it moves with the scrollbar, forwards and backwards, rather than
// playing once. Lenis keeps ScrollTrigger in sync (see smoothScroll.js).
// The pinned hero lives in Hero.jsx.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { prefersReducedMotion } from "./smoothScroll";

gsap.registerPlugin(ScrollTrigger, SplitText);

const CARD = ".glass, .spotlight-card, .terminal-window";

// Top-level cards of a section: not buttons/links, not cards nested in cards.
const topLevelCards = (root) =>
    gsap.utils
        .toArray(root.querySelectorAll(CARD))
        .filter((el) => !el.matches("button, a"))
        .filter((el) => {
            const outer = el.parentElement.closest(CARD);
            return !outer || !root.contains(outer);
        });

export function startScrollAnimations() {
    if (prefersReducedMotion()) return () => {};

    const mm = gsap.matchMedia();

    // Triggers are created strictly top-to-bottom (hero pin first, projects pin
    // last) so each pin's start accounts for the spacing added by pins above it.
    const ctx = gsap.context(() => {
        // Hero: pinned for one screen while the text lifts away and the photo
        // shrinks and tilts out
        gsap.timeline({
            scrollTrigger: { trigger: "#home", start: "top top", end: "+=100%", pin: true, scrub: 1 },
        })
            .to(".hero-text", { y: -160, opacity: 0, ease: "power1.in" }, 0)
            .to(".hero-photo", { scale: 0.55, y: 80, opacity: 0, ease: "power1.in" }, 0)
            .to(".hero-bg", { scale: 1.25, opacity: 0, ease: "none" }, 0);

        // Page progress bar
        gsap.to("#scroll-progress", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        });

        // Marquee rows slide in opposite directions
        gsap.utils.toArray(".marquee-row").forEach((row) => {
            const dir = Number(row.dataset.direction);
            gsap.fromTo(
                row,
                { xPercent: dir > 0 ? -35 : 0 },
                {
                    xPercent: dir > 0 ? 0 : -35,
                    ease: "none",
                    scrollTrigger: { trigger: ".marquee", start: "top bottom", end: "bottom top", scrub: 0.5 },
                }
            );
        });

        // Section headings: characters rise out of a mask, label and underline follow
        gsap.utils.toArray("section .section-heading").forEach((heading) => {
            const header = heading.parentElement;
            const split = SplitText.create(heading, { type: "chars", mask: "chars" });
            const label = header.querySelector("p");
            const underline = header.querySelector(".w-24.h-px");
            const tl = gsap.timeline({
                scrollTrigger: { trigger: header, start: "top 90%", end: "top 45%", scrub: 0.6 },
            });
            if (label) tl.from(label, { y: 30, opacity: 0, ease: "power2.out" }, 0);
            tl.from(split.chars, { yPercent: 110, stagger: 0.04, ease: "power3.out" }, 0.05);
            if (underline) tl.from(underline, { scaleX: 0, ease: "power2.out" }, 0.3);
        });

        // About: bio lights up word by word as you scroll through it
        gsap.utils.toArray(".reveal-words").forEach((p) => {
            const split = SplitText.create(p, { type: "words" });
            gsap.fromTo(
                split.words,
                { opacity: 0.12 },
                {
                    opacity: 1,
                    stagger: 0.1,
                    ease: "none",
                    scrollTrigger: { trigger: p, start: "top 85%", end: "bottom 40%", scrub: true },
                }
            );
        });

        // About & Contact columns slide in from their sides
        gsap.utils.toArray("[data-anim=from-left], [data-anim=from-right]").forEach((col) => {
            gsap.from(col, {
                x: col.dataset.anim === "from-left" ? -140 : 140,
                opacity: 0,
                ease: "power2.out",
                scrollTrigger: { trigger: col, start: "top 95%", end: "top 55%", scrub: 0.8 },
            });
        });

        // Skills: cards slide in from alternating sides, chips pop in after
        gsap.utils.toArray("#skills .glass.rounded-2xl").forEach((card, i) => {
            const side = i % 2 ? 1 : -1;
            gsap.from(card, {
                x: 160 * side,
                opacity: 0,
                ease: "power2.out",
                scrollTrigger: { trigger: card, start: "top 100%", end: "top 60%", scrub: 0.8 },
            });
            gsap.from(card.querySelectorAll(".flex-wrap > span"), {
                scale: 0.4,
                opacity: 0,
                stagger: 0.06,
                ease: "back.out(2)",
                scrollTrigger: { trigger: card, start: "top 80%", end: "top 45%", scrub: 0.6 },
            });
        });

        // Experience: timeline draws with scroll; each group's bullets slide in
        gsap.from("#experience .timeline-line", {
            scaleY: 0,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: { trigger: "#experience", start: "top 60%", end: "bottom 70%", scrub: true },
        });
        gsap.utils.toArray("#experience ul").forEach((list) => {
            gsap.from(list.querySelectorAll("li"), {
                x: -60,
                opacity: 0,
                stagger: 0.15,
                ease: "power2.out",
                scrollTrigger: { trigger: list, start: "top 92%", end: "top 55%", scrub: 0.6 },
            });
        });

        // Remaining cards (stats, experience card, education, contact): rise in,
        // scrubbed to scroll
        ["#about", "#experience", "#education", "#contact"].forEach((sel) => {
            const root = document.querySelector(sel);
            if (!root) return;
            topLevelCards(root)
                .filter((el) => !el.closest("[data-anim]"))
                .forEach((card) => {
                    gsap.from(card, {
                        y: 120,
                        opacity: 0,
                        ease: "power2.out",
                        scrollTrigger: { trigger: card, start: "top 100%", end: "top 65%", scrub: 0.8 },
                    });
                });
        });
    });

    // Projects: horizontal gallery on desktop (pinned), simple scrubbed rise on mobile
    mm.add("(min-width: 1024px)", () => {
        const track = document.querySelector(".projects-track");
        if (!track) return;
        const distance = () => track.scrollWidth - window.innerWidth;
        const slide = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
                trigger: "#projects",
                start: "top top",
                end: () => `+=${distance()}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            },
        });
        // Each card grows into view as it slides in
        gsap.utils.toArray(".project-card").forEach((card) => {
            gsap.from(card, {
                scale: 0.88,
                opacity: 0.35,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    containerAnimation: slide,
                    start: "left 100%",
                    end: "left 55%",
                    scrub: true,
                },
            });
        });
    });
    mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray(".project-card").forEach((card) => {
            gsap.from(card, {
                y: 100,
                opacity: 0,
                ease: "power2.out",
                scrollTrigger: { trigger: card, start: "top 100%", end: "top 65%", scrub: 0.8 },
            });
        });
    });

    // Fonts and images shift layout after first paint; recompute trigger positions.
    ScrollTrigger.sort();
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 400);
    document.fonts?.ready?.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
        clearTimeout(t);
        window.removeEventListener("load", refresh);
        mm.revert();
        ctx.revert();
    };
}
