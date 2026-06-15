// src/components/ParticleBackground.jsx
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "tsparticles-slim";

const ParticleBackground = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        // Use the old react-particles API which is already installed
    }, []);

    return null; // Replacing with CSS-only particle effect
};

export default ParticleBackground;
