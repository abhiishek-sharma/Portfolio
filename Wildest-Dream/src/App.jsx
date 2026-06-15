import { useState, useRef, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  CameraControls,
  Stars,
  Sphere,
  Line,
  Html,
  Text,
  Float,
  Trail,
  Sparkles,
  Torus,
  Icosahedron
} from '@react-three/drei';
import * as THREE from 'three';
import clsx from 'clsx';
import { portfolioData } from './config/portfolioData';
import { FaTerminal, FaChevronRight, FaTimes, FaGlobe, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

/** 
 * SYSTEM CONFIGURATION 
 */
const SYSTEM_NODES = [
  { id: 'identity', label: 'IDENTITY', subtitle: 'About', position: [0, 2, 8], color: '#00d4ff', type: 'core' },
  { id: 'capabilities', label: 'CAPABILITIES', subtitle: 'Skills', position: [-8, 5, 2], color: '#b100ff', type: 'node' },
  { id: 'experiments', label: 'EXPERIMENTS', subtitle: 'Projects', position: [8, 0, -2], color: '#ff0055', type: 'node' },
  { id: 'memory', label: 'MEMORY LOGS', subtitle: 'Experience', position: [-5, -6, 5], color: '#00ff88', type: 'node' },
  { id: 'upgrades', label: 'UPGRADES', subtitle: 'Certifications', position: [5, 6, -6], color: '#ffdd00', type: 'node' },
  { id: 'signal', label: 'TRANSMISSION', subtitle: 'Contact', position: [0, -8, -5], color: '#ff5500', type: 'node' },
];

/**
 * 3D SCENE COMPONENTS
 */

// Neural Core (Central brain)
const NeuralCore = () => {
  const coreRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.2;
      coreRef.current.rotation.x = Math.sin(t * 0.1) * 0.5;
      const s = 1 + Math.sin(t * 3) * 0.05; // heartbeat pulse
      coreRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer energy shield */}
      <Sphere ref={coreRef} args={[4, 64, 64]}>
        <meshPhysicalMaterial
          color="#000000"
          emissive="#0055ff"
          emissiveIntensity={2}
          wireframe
          transparent
          opacity={0.15}
        />
      </Sphere>

      {/* Inner dense core */}
      <Sphere args={[3.2, 32, 32]}>
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
      </Sphere>

      {/* Roving data particles inside core */}
      <Sparkles count={200} scale={6} size={4} speed={0.5} opacity={1} color="#ffffff" />
    </group>
  );
};

// Neural Connections (Synapses)
const NeuralNetwork = ({ activeNode }) => {
  // Connect everything to the core [0,0,0]
  return (
    <group>
      {SYSTEM_NODES.map((node, i) => {
        const isActive = activeNode === node.id;
        const opacity = activeNode ? (isActive ? 0.8 : 0.05) : 0.3;

        return (
          <group key={i}>
            <Line
              points={[[0, 0, 0], node.position]}
              color={isActive ? node.color : "#4444ff"}
              opacity={opacity}
              transparent
              lineWidth={isActive ? 3 : 1}
              blending={THREE.AdditiveBlending}
            />
            {/* Energy pulse along the line */}
            {isActive && (
              <Sparkles count={20} scale={[Math.abs(node.position[0]), Math.abs(node.position[1]), Math.abs(node.position[2])]} position={[node.position[0] / 2, node.position[1] / 2, node.position[2] / 2]} size={6} speed={2} color={node.color} />
            )}
          </group>
        );
      })}
    </group>
  );
};

// Interactive Node
const SystemNode = ({ node, activeNode, setActiveNode, setHoveredId, hoveredId }) => {
  const meshRef = useRef();
  const ringRef = useRef();
  const isHovered = hoveredId === node.id;
  const isActive = activeNode === node.id;
  const isDimmed = activeNode && !isActive;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2;
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Float floatIntensity={isActive ? 0 : 2} speed={2}>
      <group
        position={node.position}
        onClick={(e) => { e.stopPropagation(); setActiveNode(node.id); }}
        onPointerOver={(e) => { e.stopPropagation(); setHoveredId(node.id); document.body.style.cursor = 'crosshair'; }}
        onPointerOut={() => { setHoveredId(null); document.body.style.cursor = 'default'; }}
      >
        {/* Core Geometry */}
        <Icosahedron ref={meshRef} args={[isActive ? 1.5 : 1, 0]}>
          <meshPhysicalMaterial
            color="#000000"
            emissive={isHovered || isActive ? node.color : "#111111"}
            emissiveIntensity={isActive ? 2 : isHovered ? 1 : 0.5}
            wireframe={!isActive}
            transparent
            opacity={isDimmed ? 0.1 : 0.9}
            roughness={0.2}
            metalness={0.8}
          />
        </Icosahedron>

        {/* Holographic Ring */}
        <Trail width={1} length={4} color={node.color} attenuation={(t) => t * t}>
          <mesh ref={ringRef} visible={!isDimmed}>
            <torusGeometry args={[isActive ? 2.2 : 1.5, 0.02, 16, 64]} />
            <meshBasicMaterial color={node.color} />
          </mesh>
        </Trail>

        {/* Holographic Text Label */}
        {(!activeNode || isActive) && (
          <Text
            position={[0, isActive ? -2.5 : -1.8, 0]}
            fontSize={isActive ? 0.4 : 0.3}
            color={isHovered || isActive ? '#ffffff' : node.color}
            letterSpacing={0.15}
            anchorX="center"
            anchorY="middle"
          >
            {node.label}
          </Text>
        )}
      </group>
    </Float>
  );
};

// Scene camera and cinematic logic
const SceneDirector = ({ activeNode, controlsRef, interactionLevel }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (activeNode && controlsRef.current) {
      const node = SYSTEM_NODES.find(n => n.id === activeNode);
      if (node) {
        // Fly camera close to node, offset slightly to leave room for HUD on the right
        controlsRef.current.setLookAt(
          node.position[0] - (node.position[0] > 0 ? 3 : -3),
          node.position[1] + 1,
          node.position[2] + 4,
          node.position[0],
          node.position[1],
          node.position[2],
          true
        );
      }
    } else if (controlsRef.current) {
      // Cinematic overview of the entire brain/core
      controlsRef.current.setLookAt(0, 0, 25 - Math.min(interactionLevel, 10), 0, 0, 0, true);
    }
  }, [activeNode, interactionLevel]);

  useFrame((state, delta) => {
    if (!activeNode && controlsRef.current) {
      // Idle cinematic rotation around the core
      controlsRef.current.azimuthAngle += delta * (0.05 + interactionLevel * 0.005);
    }
  });

  return null;
};

/**
 * AI TERMINAL SYSTEM
 */
const TerminalWindow = ({ onCommand, interactionLevel }) => {
  const [history, setHistory] = useState([
    { type: 'system', text: 'INITIALIZING NEURAL LINK...' },
    { type: 'system', text: 'CONNECTION SECURE. UPTIME: 99.9%' },
    { type: 'bot', text: 'Identity verified. Awaiting command.' }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: 'user', text: `> ${cmd}` }];

    // Command Processing Engine
    let response = '';

    switch (cmd) {
      case 'help':
        response = 'AVAILABLE PROTOCOLS:\n- whoami\n- show experiments\n- scan capabilities\n- access logs\n- clear';
        break;
      case 'whoami':
        response = `IDENTITY: ${portfolioData.personal.name}\nDESIGNATION: ${portfolioData.personal.roles.join(' & ')}`;
        onCommand('identity');
        break;
      case 'show experiments':
      case 'show projects':
        response = `ACCESSING EXPERIMENTS DATABANK. FOUND ${portfolioData.projects.length} SECURE ARCHIVES.`;
        onCommand('experiments');
        break;
      case 'scan capabilities':
      case 'scan skills':
        response = 'SCANNING HYPER-THREAT LEVEL... OVER 9000. ACCESSING CORE MATRIX.';
        onCommand('capabilities');
        break;
      case 'access logs':
      case 'experience':
        response = 'RETRIEVING ENCRYPTED MEMORY LOGS...';
        onCommand('memory');
        break;
      case 'initiate contact':
      case 'contact':
        response = 'OPENING TRANSMISSION CHANNELS.';
        onCommand('signal');
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'sudo':
        response = 'PERMISSION DENIED. Nice try.';
        break;
      default:
        response = `COMMAND NOT RECOGNIZED: '${cmd}'. Type 'help' for protocols.`;
        // Personality quirk
        if (interactionLevel > 5) {
          response += '\n[AI THOUGHT]: Are you just mashing the keyboard?';
        }
    }

    setHistory([...newHistory, { type: 'bot', text: response }]);
    setInput('');
  };

  return (
    <div className="absolute bottom-6 left-6 w-[350px] md:w-[450px] bg-black/60 border border-[#00d4ff]/30 backdrop-blur-md rounded-lg overflow-hidden flex flex-col pointer-events-auto shadow-[0_0_30px_rgba(0,212,255,0.1)] z-50">
      <div className="bg-[#00d4ff]/20 px-4 py-2 flex items-center gap-2 border-b border-[#00d4ff]/30">
        <FaTerminal className="text-[#00d4ff] text-xs" />
        <span className="font-mono text-[10px] text-[#00d4ff] tracking-widest uppercase">System Terminal v2.1</span>
      </div>

      <div className="h-[200px] p-4 overflow-y-auto font-mono text-xs flex flex-col gap-2 scrollbar-hide">
        {history.map((log, i) => (
          <div key={i} className={clsx(
            "whitespace-pre-wrap leading-relaxed",
            log.type === 'system' ? "text-gray-500" : log.type === 'user' ? "text-white" : "text-[#00d4ff]"
          )}>
            {log.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-white/10 flex items-center gap-2 bg-black/40">
        <FaChevronRight className="text-[#00d4ff] text-xs" />
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="bg-transparent border-none outline-none text-white font-mono text-xs w-full placeholder-gray-700"
          placeholder="ENTER COMMAND..."
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
};

/**
 * HOLOGRAPHIC HUD PANELS (The Content)
 */
const HolographicHUD = ({ activeNode, onClose, interactionLevel }) => {
  const { personal, skills, projects, experience } = portfolioData;
  if (!activeNode) return null;

  const nodeData = SYSTEM_NODES.find(n => n.id === activeNode);

  return (
    <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-end p-8 md:p-16 transition-all duration-700">

      {/* Visual Glitch Entry Effect */}
      <div className="absolute inset-0 bg-[#00d4ff]/5 mix-blend-screen pointer-events-none animate-pulse" />

      {/* Main HUD Container */}
      <div className="w-full md:w-[600px] lg:w-[700px] max-h-[80vh] pointer-events-auto relative animate-in slide-in-from-right-16 fade-in duration-500 flex flex-col">

        {/* HUD Frame Decorators */}
        <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-[#00d4ff] z-10" />
        <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-[#00d4ff] z-10" />
        <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-[#00d4ff] z-10" />
        <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-[#00d4ff] z-10" />

        <div className="bg-black/80 backdrop-blur-xl border border-[#00d4ff]/30 p-1 flex-1 overflow-hidden flex flex-col neon-shadow relative">

          {/* HUD Header */}
          <div className="bg-[#00d4ff]/10 border-b border-[#00d4ff]/30 p-4 flex justify-between items-center">
            <div>
              <p className="font-mono text-[10px] text-[#00d4ff] tracking-widest uppercase mb-1">DATASTREAM ACTIVE</p>
              <h2 className="font-display text-2xl text-white tracking-widest">{nodeData.label}</h2>
            </div>
            <button onClick={onClose} className="p-2 border border-[#00d4ff]/30 hover:bg-[#00d4ff]/20 text-[#00d4ff] transition-all">
              <FaTimes />
            </button>
          </div>

          {/* HUD Body Scrollable */}
          <div className="p-8 overflow-y-auto font-sans flex-1 scrollbar-hide space-y-8" style={{ scrollbarWidth: 'none' }}>

            {/* === IDENTITY NODE === */}
            {activeNode === 'identity' && (
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-32 h-32 border border-[#00d4ff]/50 bg-[#00d4ff]/10 p-2 relative overflow-hidden group">
                    <img src="/avatars/focused.png" alt="Avatar" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 mix-blend-screen" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#00d4ff] animate-pulse" />
                  </div>
                  <div className="font-mono">
                    <h3 className="text-3xl font-bold text-white mb-2">{personal.name}</h3>
                    <p className="text-[#00d4ff] text-sm mb-4">{personal.roles.join(' // ')}</p>
                    <div className="text-xs text-gray-400 space-y-1">
                      <p>LOCATION: {personal.location}</p>
                      <p>STATUS: ONLINE</p>
                      <p>INTERACTION LVL: {interactionLevel}</p>
                    </div>
                  </div>
                </div>
                <div className="border border-white/10 bg-white/5 p-6 rounded relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d4ff]/10 blur-[50px] -mr-16 -mt-16" />
                  <p className="font-mono text-sm text-gray-300 leading-relaxed z-10 relative">
                    {personal.bio}
                  </p>
                </div>
              </div>
            )}

            {/* === CAPABILITIES NODE === */}
            {activeNode === 'capabilities' && (
              <div className="grid md:grid-cols-2 gap-8">
                {skills.map((cat, i) => (
                  <div key={i} className="border border-[#b100ff]/30 bg-black/50 p-6 relative">
                    <div className="absolute -top-3 left-4 bg-black px-2 border border-[#b100ff]/30 text-[#b100ff] font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                      {cat.icon} {cat.category}
                    </div>
                    <div className="space-y-4 pt-2">
                      {cat.items.map((skill, j) => (
                        <div key={j}>
                          <div className="flex justify-between font-mono text-[10px] text-gray-400 mb-1">
                            <span className="text-white">{skill.name}</span>
                            <span>{skill.level}%</span>
                          </div>
                          <div className="h-[2px] w-full bg-white/10">
                            <div className="h-full bg-[#b100ff] shadow-[0_0_10px_#b100ff]" style={{ width: `${skill.level}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* === EXPERIMENTS NODE === */}
            {activeNode === 'experiments' && (
              <div className="space-y-6">
                {projects.map((proj, i) => (
                  <div key={i} className="border border-[#ff0055]/30 bg-black/50 p-6 flex flex-col gap-4 relative overflow-hidden group hover:border-[#ff0055]/80 transition-all">
                    <div className="absolute inset-0 bg-[#ff0055]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <span className="text-2xl opacity-80">{proj.emoji}</span> {proj.name}
                      </h3>
                      <span className="font-mono text-[9px] uppercase border border-[#ff0055]/50 text-[#ff0055] px-2 py-0.5 bg-[#ff0055]/10">
                        {proj.category}
                      </span>
                    </div>

                    <p className="font-sans text-sm text-gray-400 leading-relaxed font-light">
                      {proj.description}
                    </p>

                    <div className="flex justify-between items-end mt-2">
                      <div className="flex gap-2 font-mono text-[10px] text-gray-500">
                        {proj.tech.slice(0, 4).map(t => <span key={t}>[{t}]</span>)}
                      </div>
                      {proj.github && (
                        <a href={proj.github} target="_blank" rel="noreferrer" className="text-white hover:text-[#ff0055] transition-colors">
                          <FaGithub className="text-xl" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* === MEMORY LOGS NODE === */}
            {activeNode === 'memory' && (
              <div className="space-y-10 relative">
                <div className="absolute left-1.5 top-2 bottom-0 w-px bg-[#00ff88]/30" />
                {experience.map((exp, i) => (
                  <div key={i} className="pl-8 relative border-b border-white/5 pb-8 last:border-0">
                    <div className="absolute left-0 top-1.5 w-3 h-3 border border-[#00ff88] bg-black shadow-[0_0_10px_#00ff88]" />

                    <div className="font-mono text-[10px] text-[#00ff88] mb-2">{exp.period}</div>
                    <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                    <h4 className="text-sm text-gray-400 mb-4">{exp.company} // {exp.location}</h4>

                    <p className="text-sm text-gray-300 mb-4 font-light">{exp.description}</p>
                    <ul className="space-y-2">
                      {exp.achievements.map((a, j) => (
                        <li key={j} className="text-xs text-gray-400 font-mono flex gap-3">
                          <span className="text-[#00ff88]">{'>'}</span> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};


/**
 * MAIN ENTRY
 */
export default function App() {
  const [activeNode, setActiveNode] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [interactionLevel, setInteractionLevel] = useState(0);
  const controlsRef = useRef();

  // Track interaction
  useEffect(() => {
    const increment = () => setInteractionLevel(prev => prev + 1);
    window.addEventListener('click', increment);
    return () => window.removeEventListener('click', increment);
  }, []);

  const handleTerminalCommand = (nodeId) => {
    setActiveNode(nodeId);
    setInteractionLevel(l => l + 5);
  };

  return (
    <div className="w-full h-full relative bg-[#020205] text-white overflow-hidden selection:bg-[#00d4ff]/30">

      {/* 3D Neural Environment */}
      <Canvas camera={{ position: [0, 0, 25], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={['#020205']} />
        <fog attach="fog" args={['#020205', 10, 50]} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />

        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={1} fade speed={1} />

          <NeuralCore />
          <NeuralNetwork activeNode={activeNode} />

          {SYSTEM_NODES.filter(n => n.type !== 'core').map(node => (
            <SystemNode
              key={node.id}
              node={node}
              activeNode={activeNode}
              setActiveNode={setActiveNode}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
            />
          ))}

          <CameraControls
            ref={controlsRef}
            minDistance={5}
            maxDistance={40}
            dollySpeed={0.5}
            smoothTime={0.5}
            // Prevent user from getting completely lost
            maxPolarAngle={Math.PI / 1.2}
            minPolarAngle={Math.PI / 4}
          />
          <SceneDirector activeNode={activeNode} controlsRef={controlsRef} interactionLevel={interactionLevel} />
        </Suspense>
      </Canvas>

      {/* CORE HUD ELEMENTS */}
      <div className={clsx("absolute top-8 left-8 z-40 transition-opacity duration-1000 pointer-events-none", activeNode ? "opacity-20" : "opacity-100")}>
        <h1 className="font-display font-black text-4xl tracking-widest text-shadow-glow glitch-text text-[#00d4ff]">
          SYS.CORE
        </h1>
        <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.3em] text-[#00d4ff] flex flex-col gap-1">
          <span>STATUS: ACTIVE ONLINE</span>
          <span>INTERACTION_LVL: {interactionLevel}</span>
          <span>ENTITIES DEPLOYED: {SYSTEM_NODES.length}</span>
        </div>
      </div>

      <div className={clsx("absolute top-8 right-8 z-40 transition-opacity duration-1000 pointer-events-none text-right", activeNode ? "opacity-20" : "opacity-100")}>
        <div className="w-16 h-16 border-[1px] border-dashed border-[#00d4ff]/50 rounded-full flex items-center justify-center animate-spin-slow ml-auto">
          <div className="w-10 h-10 border-[1px] border-dotted border-[#00d4ff] rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
        </div>
      </div>

      {/* Interactive Lower Layer */}
      <TerminalWindow onCommand={handleTerminalCommand} interactionLevel={interactionLevel} />
      <HolographicHUD activeNode={activeNode} onClose={() => setActiveNode(null)} interactionLevel={interactionLevel} />

      {/* Crosshair Center Reticle */}
      {!activeNode && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none z-10 opacity-50 flex items-center justify-center mix-blend-screen">
          <div className="w-full h-px bg-[#00d4ff]" />
          <div className="absolute h-full w-px bg-[#00d4ff]" />
        </div>
      )}

      {/* Post-processing Overlay (CSS) */}
      <div className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-10"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00d4ff 2px, #00d4ff 4px)', backgroundSize: '100% 4px' }} />
    </div>
  );
}
