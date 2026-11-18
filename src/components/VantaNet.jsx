// Vanta.js NET background for the hero. Vanta needs an older three.js than the
// rest of the app, so it gets its own pinned copy ("three-vanta").
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/smoothScroll";

const VantaNet = ({ className = "" }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (prefersReducedMotion()) return undefined;
        let effect = null;
        let cancelled = false;

        Promise.all([import("three-vanta"), import("vanta/dist/vanta.net.min")]).then(
            ([THREE, NET]) => {
                if (cancelled || !ref.current) return;
                // The UMD bundle's export is nested differently across bundlers.
                const create = [NET?.default?.default, NET?.default, NET, window.VANTA?.NET].find(
                    (f) => typeof f === "function"
                );
                if (!create) return;
                effect = create({
                    el: ref.current,
                    THREE,
                    mouseControls: true,
                    touchControls: false,
                    gyroControls: false,
                    minHeight: 200,
                    minWidth: 200,
                    // pixelRatio = devicePixelRatio / scale -> render at 1x on Retina
                    scale: Math.max(1, window.devicePixelRatio || 1),
                    scaleMobile: Math.max(1, window.devicePixelRatio || 1),
                    color: 0x00d4ff,
                    backgroundColor: 0x0d0d1a,
                    points: 9,
                    maxDistance: 21,
                    spacing: 18,
                    showDots: true,
                });
            }
        );

        return () => {
            cancelled = true;
            effect?.destroy();
        };
    }, []);

    return <div ref={ref} className={className} aria-hidden="true" />;
};

export default VantaNet;
