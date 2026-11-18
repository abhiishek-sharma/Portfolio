// Section pause: scrolling stays free and fully under the visitor's control,
// but when the scroll reaches the start of a section it stops exactly there
// (heading at the top of the screen) and holds briefly before continuing. That
// pause marks "one section ended, this is the next one". Nothing scrolls on
// its own beyond that stop. Inside the pinned Projects gallery the cards
// scroll freely; there are stops only where the gallery starts and ends.
// Desktop only (sections are sized to one viewport there).
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis, prefersReducedMotion, navigating } from "./smoothScroll";

const SECTIONS = ["about", "skills", "experience", "contact"];
const HOLD_MS = 650;

const docTop = (el) => Math.round(el.getBoundingClientRect().top + window.scrollY);

export function startSectionSnap() {
    const lenis = getLenis();
    const wide = window.matchMedia("(min-width: 1024px) and (min-height: 640px)");
    if (!lenis || prefersReducedMotion() || !wide.matches) return () => {};

    let holding = false;
    let last = lenis.scroll;
    let timer;

    // Measured live on every scroll so stops always match the current layout
    // (fonts, images and pin spacers can shift sections after load).
    const currentStops = () => {
        const points = SECTIONS.map((id) => document.getElementById(id))
            .filter(Boolean)
            .map(docTop);
        const pin = ScrollTrigger.getAll().find((t) => t.pin && t.trigger?.id === "projects");
        if (pin) points.push(Math.round(pin.start), Math.round(pin.end));
        return [...new Set(points)].sort((a, b) => a - b);
    };

    const hold = (stop) => {
        holding = true;
        // Settle exactly on the section start, then absorb the remaining
        // wheel momentum for a moment so the visitor sees the new section.
        lenis.scrollTo(stop, { immediate: true, force: true });
        lenis.stop();
        clearTimeout(timer);
        timer = setTimeout(() => {
            lenis.start();
            holding = false;
            last = lenis.scroll;
        }, HOLD_MS);
    };

    const onScroll = ({ scroll }) => {
        if (holding) return;
        if (navigating) {
            last = scroll;
            return;
        }
        const stops = currentStops();
        const crossed =
            scroll > last
                ? stops.find((s) => last < s && scroll >= s) // moving down
                : [...stops].reverse().find((s) => last > s && scroll <= s); // moving up
        last = scroll;
        if (crossed !== undefined) hold(crossed);
    };

    lenis.on("scroll", onScroll);

    return () => {
        clearTimeout(timer);
        lenis.off("scroll", onScroll);
        if (holding) lenis.start();
    };
}
