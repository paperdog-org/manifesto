'use client'
import { useState, useEffect, useCallback, useRef } from "react"
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { Clock, Zap } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  velocity: {
    x: number;
    y: number;
  };
}

interface GlitchEffect {
  id: number;
  x: number;
  y: number;
  duration: number;
}

export const QuantumField = ({ isActive = true }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [glitches, setGlitches] = useState<GlitchEffect[]>([]);
  const [gridOpacity, setGridOpacity] = useState(0.2);
  const fieldRef = useRef<HTMLDivElement>(null);
  const mousePos = useMotionValue({ x: 0, y: 0 });
  const gridSize = 40; // Size of grid cells in pixels

  // Create quantum particles
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setParticles(prev => {
        const newParticles = [...prev];
        // Add new particle
        if (newParticles.length < 40) {
          newParticles.push({
            id: Date.now(),
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            velocity: {
              x: (Math.random() - 0.5) * 2,
              y: (Math.random() - 0.5) * 2
            }
          });
        }
        // Update particle positions
        return newParticles.map(particle => ({
          ...particle,
          x: particle.x + particle.velocity.x,
          y: particle.y + particle.velocity.y,
        })).filter(p => 
          p.x > 0 && p.x < window.innerWidth && 
          p.y > 0 && p.y < window.innerHeight
        );
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isActive]);

  // Random glitch effects
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitches(prev => [...prev, {
          id: Date.now(),
          x: Math.floor(Math.random() * (window.innerWidth / gridSize)),
          y: Math.floor(Math.random() * (window.innerHeight / gridSize)),
          duration: 300 + Math.random() * 700
        }]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Handle mouse movement
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = fieldRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mousePos.set({ x, y });
    
    // Increase grid opacity near mouse
    setGridOpacity(0.3);
    setTimeout(() => setGridOpacity(0.2), 500);
  }, [mousePos]);

  return (
    <div 
      ref={fieldRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Quantum Grid */}
      <div 
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(19, 42, 58, ${gridOpacity}) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(19, 42, 58, ${gridOpacity}) 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          transform: `translate(${mousePos.get().x * 0.02}px, ${mousePos.get().y * 0.02}px)`,
        }}
      />

      {/* Quantum Particles */}
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0],
              scale: [0, 2, 0],
              x: particle.x,
              y: particle.y,
              rotate: Math.random() * 360
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 5 }}
          >
            <div className="w-full h-full rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Glitch Effects */}
      <AnimatePresence>
        {glitches.map(glitch => (
          <motion.div
            key={glitch.id}
            className="absolute bg-blue-400/30"
            style={{
              left: glitch.x * gridSize,
              top: glitch.y * gridSize,
              width: gridSize,
              height: gridSize
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0],
              scaleX: [1, 1.5, 0.5, 1],
              skewX: [0, 10, -10, 0]
            }}
            transition={{ duration: glitch.duration / 1000 }}
            onAnimationComplete={() => {
              setGlitches(prev => prev.filter(g => g.id !== glitch.id));
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};


const QuantumActivation = ({ isActive, onComplete }) => {
  const [glitchText, setGlitchText] = useState('INITIALIZING TEMPORAL SEQUENCE');

  useEffect(() => {
    if (isActive) {
      const texts = [
        'ESTABLISHING QUANTUM LINK',
        'STABILIZING TEMPORAL BRIDGE',
        'ACCESSING TIMELINE 2232',
        'CONVERGENCE IMMINENT'
      ];
      let index = 0;
      const interval = setInterval(() => {
        if (index < texts.length) {
          setGlitchText(texts[index]);
          index++;
        } else {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
        }
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-full h-full">
        {/* Glitch Lines */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full bg-blue-400/30"
            style={{ top: `${i * 5}%` }}
            animate={{
              scaleX: [1, 1.5, 0.5, 1],
              opacity: [0.5, 0.8, 0.2, 0.5],
              x: [0, 100, -100, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.1
            }}
          />
        ))}

        {/* Central Message */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center"
          animate={{
            scale: [1, 1.02, 1],
            opacity: [1, 0.8, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          <div className="text-green-400 font-mono text-2xl mb-8">
            {glitchText.split('').map((char, i) => (
              <motion.span
                key={i}
                animate={{
                  opacity: [1, 0.5, 1],
                  color: ['#4ade80', '#60a5fa', '#4ade80']
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  delay: i * 0.05
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Progress Indicator */}
          <motion.div 
            className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-green-400"
              animate={{
                width: ['0%', '100%']
              }}
              transition={{
                duration: 3.2,
              }}
            />
          </motion.div>
        </motion.div>

        {/* Quantum Particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export const TemporalLanding = ({ onActivationComplete, currentTime, isTemporalTime }) => {
  const [isActivating, setIsActivating] = useState(false);
  const [displayTime, setDisplayTime] = useState('');
  
  useEffect(() => {
    setDisplayTime(currentTime.toLocaleTimeString());
  }, [currentTime]);

  const handleActivation = useCallback(() => {
    setIsActivating(true);
    // Simulate quantum activation process
    setTimeout(() => {
      onActivationComplete();
    }, 4000); // Duration matches QuantumActivation animation
  }, [onActivationComplete]);

  return (
    <div className="relative min-h-screen bg-blue-100 bg-opacity-80 overflow-hidden">
      <AnimatePresence>
        {isActivating && (
          <QuantumActivation 
            isActive={true}
            onComplete={onActivationComplete}
          />
        )}
      </AnimatePresence>
      
      <QuantumField />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1 }}
          className="text-center space-y-6 md:space-y-8"
        >
          <div className="text-base md:text-xl opacity-70 flex items-center justify-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{displayTime}</span>
            {isTemporalTime && (
              <motion.span 
                className="text-blue-400"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Temporal Bridge Active
              </motion.span>
            )}
          </div>

          <motion.div 
            className="w-[80%] md:w-full max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Image
              className="drop-shadow-[0_0_0.3rem_#ffffff70] mx-auto scale-110 md:scale-100"
              src="/paperdog3.png"
              alt="PaperDog Header"
              width={550}
              height={350}
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="px-4 md:px-0"
          >
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-br from-gray-200 to-gray-400 bg-clip-text text-transparent">
              THE•HOPE•MANIFESTO
            </h1>
            <div className="mt-6 md:mt-8 space-y-2 md:space-y-4 text-sm md:text-lg text-gray-400">
              <p>The bridge exists beyond time</p>
              <p>Your presence creates ripples across timelines</p>
              <p>Welcome to the convergence</p>
            </div>
          </motion.div>

          <motion.button
            onClick={handleActivation}
            disabled={isActivating}
            className={`px-6 md:px-8 py-3 md:py-4 bg-blue-500/20 rounded-lg border border-blue-400/30 
                     text-blue-400 relative overflow-hidden group text-sm md:text-base
                     ${isActivating ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'}`}
            whileHover={{ scale: isActivating ? 1 : 1.05 }}
            whileTap={{ scale: isActivating ? 1 : 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="relative flex items-center gap-2">
              <Zap className="w-4 h-4 md:w-5 md:h-5" />
              {isActivating ? 'INITIATING SEQUENCE...' : 'INITIATE TEMPORAL SEQUENCE'}
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};