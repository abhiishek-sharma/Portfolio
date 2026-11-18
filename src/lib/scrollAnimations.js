// Scroll-driven animations (GSAP ScrollTrigger + SplitText). Everything is
// scrubbed directly to scroll position (scrub: true; Lenis already smooths the
// scroll, so extra scrub lag makes elements trail then rush), and travel
// distances are kept small so nothing outruns the page. Lenis keeps ScrollTrigger in sync (see smoothScroll.js).
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

// Reveals are keyed to their section, not the element: with section snapping,
// every reveal finishes exactly when its section lands at the top of the screen.
const inSection = (el, start, end = "top top") => ({
    trigger: el.closest("section") || el,
    start,
    end,
    scrub: true,
});

export function startScrollAnimations() {
    if (prefersReducedMotion()) return () => {};

    const mm = gsap.matchMedia();

    // Triggers are created strictly top-to-bottom (hero pin first, projects pin
    // last) so each pin's start accounts for the spacing added by pins above it.
    const ctx = gsap.context(() => {
        // Hero: pinned for half a screen while the text lifts and the photo
        // shrinks back (they dim but never vanish, so there is no empty screen)
        gsap.timeline({
            scrollTrigger: { trigger: "#home", start: "top top", end: "+=50%", pin: true, scrub: true },
        })
            .to(".hero-text", { y: -60, opacity: 0.3, ease: "none" }, 0)
            .to(".hero-photo", { scale: 0.85, y: 30, opacity: 0.3, ease: "none" }, 0)
            .to(".hero-bg", { scale: 1.15, ease: "none" }, 0);

        // Page progress bar
        gsap.to("#scroll-progress", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: true },
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
                    scrollTrigger: { trigger: ".marquee", start: "top bottom", end: "bottom top", scrub: true },
                }
            );
        });

        // Section headings: characters rise out of a mask, label and underline follow
        gsap.utils.toArray("section .section-heading").forEach((heading) => {
            const header = heading.parentElement;
            const split = SplitText.create(heading, { type: "chars", mask: "chars" });
            const label = header.querySelector("p");
            const underline = header.querySelector(".w-24.h-px");
            // The pinned Projects section plays its heading as soon as it comes
            // into view (time-based), so it is never still hidden while the
            // gallery is already scrolling.
            const pinned = header.closest("#projects");
            const tl = gsap.timeline({
                defaults: pinned ? { duration: 0.7 } : undefined,
                scrollTrigger: pinned
                    ? { trigger: "#projects", start: "top 85%", toggleActions: "play none none reverse" }
                    : inSection(header, "top 90%", "top 30%"),
            });
            if (label) tl.from(label, { y: 16, opacity: 0, ease: "none" }, 0);
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
                    scrollTrigger: inSection(p, "top 70%"),
                }
            );
        });

        // About & Contact columns slide in from their sides
        gsap.utils.toArray("[data-anim=from-left], [data-anim=from-right]").forEach((col) => {
            gsap.from(col, {
                x: col.dataset.anim === "from-left" ? -50 : 50,
                opacity: 0,
                ease: "none",
                scrollTrigger: inSection(col, "top 90%", "top 20%"),
            });
        });

        // Skills: cards slide in from alternating sides, chips pop in after
        gsap.utils.toArray("#skills .grid > .glass").forEach((card, i) => {
            const side = i % 2 ? 1 : -1;
            gsap.from(card, {
                x: 60 * side,
                opacity: 0,
                ease: "none",
                scrollTrigger: inSection(card, "top 90%", "top 20%"),
            });
            gsap.from(card.querySelectorAll(".flex-wrap > span"), {
                scale: 0.4,
                opacity: 0,
                stagger: 0.06,
                ease: "back.out(2)",
                scrollTrigger: inSection(card, "top 60%"),
            });
        });

        // Experience: timeline draws with scroll; each group's bullets slide in
        gsap.from("#experience .timeline-line", {
            scaleY: 0,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: { trigger: "#experience", start: "top 70%", end: "top top", scrub: true },
        });
        gsap.utils.toArray("#experience ul").forEach((list) => {
            gsap.from(list.querySelectorAll("li"), {
                x: -24,
                opacity: 0,
                stagger: 0.15,
                ease: "none",
                scrollTrigger: inSection(list, "top 60%"),
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
                        y: 30,
                        opacity: 0,
                        ease: "none",
                        scrollTrigger: inSection(card, "top 90%", "top 15%"),
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
                scrub: true,
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
                y: 30,
                opacity: 0,
                ease: "none",
                scrollTrigger: { trigger: card, start: "top 100%", end: "top 65%", scrub: true },
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
