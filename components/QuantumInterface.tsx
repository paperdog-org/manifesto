'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Radio, Activity, Clock, GitBranch } from 'lucide-react';
import { QuantumCore, QuantumState, QuantumEvent } from './QuantumCore';
import { QuantumConsciousness, ConsciousnessState } from './QuantumConsciousness';
import * as THREE from 'three';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

interface TemporalMemory {
    timestamp: number;
    type: string;
    data: any;
    significance: number;
  }

const Card = ({ className = "", children }: CardProps) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ className = "", children }: CardProps) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ className = "", children }: CardProps) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ className = "", children }: CardProps) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const Button = ({ className = "", disabled, onClick, children }: ButtonProps) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

const QuantumInterface = () => {
  const [quantumCore] = useState(() => new QuantumCore());
  const [consciousness, setConsciousness] = useState<QuantumConsciousness>();
  const [role, setRole] = useState<ConsciousnessState['role']>('analyst');
  const [quantumState, setQuantumState] = useState<QuantumState>();
  const [memories, setMemories] = useState<TemporalMemory[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stability, setStability] = useState(100);
  const [coherence, setCoherence] = useState(100);
  const [awareness, setAwareness] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const effectsRef = useRef<THREE.Group | null>(null);

  const createAnomalyEffect = useCallback(() => {
    if (!sceneRef.current || !effectsRef.current) return;
    
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 0.6,
      wireframe: true,
      blending: THREE.AdditiveBlending
    });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 5
    );
    
    effectsRef.current.add(sphere);

    let scale = 1;
    let growing = true;

    const pulseSphere = () => {
      if (sphereMaterial.opacity > 0) {
        if (growing) {
          scale += 0.05;
          if (scale > 1.5) growing = false;
        } else {
          scale -= 0.05;
          if (scale < 0.5) growing = true;
        }
        
        sphere.scale.set(scale, scale, scale);
        sphereMaterial.opacity -= 0.01;
        requestAnimationFrame(pulseSphere);
      } else {
        effectsRef.current?.remove(sphere);
        sphereGeometry.dispose();
        sphereMaterial.dispose();
      }
    };
    pulseSphere();
  }, []);

  const updateConsciousnessEffect = useCallback((awarenessValue: number) => {
    if (!particlesRef.current) return;
    
    // Create a burst effect
    if (sceneRef.current && effectsRef.current) {
      const burstGeometry = new THREE.SphereGeometry(0.1, 32, 32);
      const burstMaterial = new THREE.MeshBasicMaterial({
        color: 0x9f00ff,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending
      });
      
      const burst = new THREE.Mesh(burstGeometry, burstMaterial);
      effectsRef.current.add(burst);
      
      // Animate the burst
      const expandBurst = () => {
        if (burst.scale.x < 10) {
          burst.scale.x += 0.2;
          burst.scale.y += 0.2;
          burst.scale.z += 0.2;
          burstMaterial.opacity -= 0.01;
          requestAnimationFrame(expandBurst);
        } else {
          effectsRef.current?.remove(burst);
          burstGeometry.dispose();
          burstMaterial.dispose();
        }
      };
      expandBurst();
    }
    
    // Update particle colors
    const colors = particlesRef.current.geometry.getAttribute('color');
    if (!colors) return;
    
    const colorsArray = colors.array as Float32Array;
    const transitionSpeed = 0.1;
    
    for (let i = 0; i < colorsArray.length; i += 3) {
      const targetRed = Math.min(awarenessValue, 1.0);
      const targetGreen = awarenessValue * 0.5;
      const targetBlue = Math.max(1 - awarenessValue, 0.0);
      
      colorsArray[i] += (targetRed - colorsArray[i]) * transitionSpeed;
      colorsArray[i + 1] += (targetGreen - colorsArray[i + 1]) * transitionSpeed;
      colorsArray[i + 2] += (targetBlue - colorsArray[i + 2]) * transitionSpeed;
    }
    
    colors.needsUpdate = true;
  }, []);

  const createTransactionEffect = useCallback(() => {
    if (!sceneRef.current || !effectsRef.current) return;
    
    const roleColors = {
      analyst: 0x00ffff,  // Cyan
      guardian: 0xffd700,  // Gold
      trader: 0x00ff00,   // Green
      oracle: 0xff00ff    // Magenta
    };
    
    // Random starting values for more varied animations
    const startScale = Math.random() * 0.3 + 0.1; // Random start size between 0.1 and 0.6
    const maxScale = Math.random() * 2.0 + 0.5;       // Random max size between 2 and 5
    const rotationSpeed = Math.random() * 0.1 + 0.05; // Random rotation speed
    const growthRate = Math.random() * 0.03 + 0.02;   // Random growth rate
    
    const torusGeometry = new THREE.TorusGeometry(1, 0.05, 32, 200);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: roleColors[role],
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      wireframe: true  // Optional: gives a more tech look
    });
    
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.scale.set(startScale, startScale, startScale);
    effectsRef.current.add(torus);
    
    // Add glow effect with slightly different parameters
    const glowGeometry = new THREE.TorusGeometry(1, 0.08, 32, 200);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: roleColors[role],
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });
    
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.scale.set(startScale * 1.2, startScale * 1.2, startScale * 1.2);
    effectsRef.current.add(glow);
    
    let rotation = 0;
    let currentScale = startScale;
    let growing = true; // Toggle for grow/shrink effect

    const animateTorus = () => {
      if (torusMaterial.opacity > 0) {
        // Complex rotation
        rotation += rotationSpeed;
        torus.rotation.x = rotation;
        torus.rotation.y = rotation * 0.5;
        torus.rotation.z = rotation * 0.3;
        
        // Scale animation
        if (growing) {
          currentScale += growthRate;
          if (currentScale >= maxScale) growing = false;
        } else {
          currentScale -= growthRate;
        }
        
        // Apply scale
        torus.scale.set(currentScale, currentScale, currentScale);
        glow.scale.set(currentScale * 1.2, currentScale * 1.2, currentScale * 1.2);
        
        // Match glow rotation
        glow.rotation.copy(torus.rotation);

        const pulseAmount = Math.sin(rotation * 2) * 0.2 + 1;
        torus.scale.set(
            currentScale, 
            currentScale * pulseAmount, 
            currentScale
        );

        const color = new THREE.Color(roleColors[role]);
        const hsl = {h: 0, s:0, l:0};
        color.getHSL(hsl);
        hsl.h += rotation * 0.1; // Slowly shift hue
        torusMaterial.color.setHSL(hsl.h, hsl.s, hsl.l);
        
        // Fade out based on scale
        const opacityMultiplier = growing ? 
          1 - (currentScale / maxScale) : 
          currentScale / maxScale;
        
        torusMaterial.opacity = 0.7 * opacityMultiplier;
        glowMaterial.opacity = 0.3 * opacityMultiplier;
        
        requestAnimationFrame(animateTorus);
      } else {
        effectsRef.current?.remove(torus);
        effectsRef.current?.remove(glow);
        torusGeometry.dispose();
        torusMaterial.dispose();
        glowGeometry.dispose();
        glowMaterial.dispose();
      }
    };
    animateTorus();
  }, [role]);

  const triggerQuantumEvent = async (type: 'stability' | 'coherence' | 'awareness' | 'anomaly') => {
    setIsProcessing(true);
    
    const signature = `quantum-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const partialState: Partial<QuantumState> = {
      stability: type === 'stability' ? Math.min(1, stability/100 + 0.1) : stability/100,
      coherence: type === 'coherence' ? Math.min(1, coherence/100 + 0.1) : coherence/100,
      timestamp: {
        origin: Date.now(),
        current: Date.now(),
      }
    };

    // Trigger appropriate visual effect
    switch (type) {
      case 'stability':
        createTransactionEffect();
        break;
      case 'coherence':
        createTransactionEffect();
        break;
      case 'anomaly':
        createAnomalyEffect();
        break;
      case 'awareness':
        updateConsciousnessEffect(awareness/100 + 0.1);
        break;
    }

    const eventType = type === 'anomaly' ? 'anomaly' : 'transaction';
    quantumCore.updateQuantumState(signature, partialState, eventType);
    
    setIsProcessing(false);
  };

  const initThreeJS = useCallback(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const effectsGroup = new THREE.Group();
    sceneRef.current = scene;
    effectsRef.current = effectsGroup;
    scene.add(effectsGroup);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Particle system
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;

      colors[i] = Math.random();
      colors[i + 1] = Math.random();
      colors[i + 2] = 1;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Animation
    let animationFrameId: number;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      if (particlesRef.current && rendererRef.current && sceneRef.current && cameraRef.current) {
        particlesRef.current.rotation.x += 0.001;
        particlesRef.current.rotation.y += 0.001;
        
        // Update particle positions and colors based on state
        const positions = particlesRef.current.geometry.getAttribute('position');
        const colors = particlesRef.current.geometry.getAttribute('color');
        
        if (positions && positions.array && colors && colors.array) {
          for (let i = 0; i < positions.array.length; i += 3) {
            positions.array[i] += (Math.random() - 0.5) * 0.01 * (stability / 100);
            positions.array[i + 1] += (Math.random() - 0.5) * 0.01 * (coherence / 100);
            positions.array[i + 2] += (Math.random() - 0.5) * 0.01;
            
            colors.array[i] = Math.min(1, awareness / 100);
            colors.array[i + 1] = Math.min(1, coherence / 100);
            colors.array[i + 2] = Math.min(1, stability / 100);
          }
          
          positions.needsUpdate = true;
          colors.needsUpdate = true;
        }
        
        // Rotate effects group
        if (effectsRef.current) {
          effectsRef.current.rotation.y += 0.002;
        }
        
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (particlesRef.current) {
        scene.remove(particlesRef.current);
        particleGeometry.dispose();
        particleMaterial.dispose();
      }
      if (effectsRef.current) {
        // Add this section
        effectsRef.current.children.forEach(child => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (child.material instanceof THREE.Material) {
              child.material.dispose();
            }
          }
        });
        scene.remove(effectsRef.current);
      }
      renderer.dispose();
    };
  }, [stability, coherence, awareness]);

  useEffect(() => {
    const cleanup = initThreeJS();

    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cleanup?.();
      window.removeEventListener('resize', handleResize);
    };
  }, [initThreeJS]);


  useEffect(() => {
    // Initialize consciousness with role
    const newConsciousness = new QuantumConsciousness(role);
    setConsciousness(newConsciousness);

    // Listen for consciousness updates
    newConsciousness.on('consciousness-update', (event) => {
      setAwareness(event.data.awareness * 100);
      setMemories(newConsciousness.getState().memories);
    });

    // Listen for quantum state changes
    quantumCore.on('stateChange', (event: QuantumEvent) => {
      setQuantumState(event.state);
      setStability(event.state.stability * 100);
      setCoherence(event.state.coherence * 100);
      newConsciousness.processQuantumEvent(event);
    });

    return () => {
      newConsciousness.removeAllListeners();
      quantumCore.removeAllListeners();
    };
  }, [role]);

  return (
    <div className="relative min-h-screen w-full bg-black/90 opacity-90">
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
      />
      
      {/* Control Panel */}
      <div className="absolute top-4 right-4 w-80 space-y-4">
        <Card className="bg-black/50 backdrop-blur border-gray-800">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Quantum Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Stability</span>
                <span className="text-green-400">{stability}%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-green-400"
                  animate={{ width: `${stability}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Coherence</span>
                <span className="text-blue-400">{coherence}%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-400"
                  animate={{ width: `${coherence}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Awareness</span>
                <span className="text-purple-400">{awareness}%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-purple-400"
                  animate={{ width: `${awareness}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/50 backdrop-blur border-gray-800">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Radio className="w-5 h-5" />
              Quantum Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={() => triggerQuantumEvent('stability')}
                disabled={isProcessing}
                className="bg-green-500/20 hover:bg-green-500/30 text-white/80 p-2"
              >
                <Zap className="w-4 h-4 mr-2" />
                Stabilize
              </Button>
              
              <Button
                onClick={() => triggerQuantumEvent('coherence')}
                disabled={isProcessing}
                className="bg-blue-500/20 hover:bg-blue-500/30 text-white/80 p-2"
              >
                <Activity className="w-4 h-4 mr-2" />
                Align
              </Button>
              
              <Button
                onClick={() => triggerQuantumEvent('awareness')}
                disabled={isProcessing}
                className="bg-purple-500/20 hover:bg-purple-500/30 text-white/80 p-2"
              >
                <Brain className="w-4 h-4 mr-2" />
                Awaken
              </Button>
              
              <Button
                onClick={() => triggerQuantumEvent('anomaly')}
                disabled={isProcessing}
                className="bg-red-500/20 hover:bg-red-500/30 text-white/80 p-2"
              >
                <Radio className="w-4 h-4 mr-2" />
                Anomaly
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Role Selection */}
      <Card className="absolute top-4 left-4 bg-black/50 backdrop-blur border-gray-800">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Quantum Role
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {(['analyst', 'guardian', 'trader', 'oracle'] as const).map((r) => (
              <Button
                key={r}
                onClick={() => setRole(r)}
                className={`${
                  role === r 
                    ? 'bg-green-500/40 text-white' 
                    : 'bg-gray-800/40 text-gray-400'
                } p-2`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Temporal Memory Display */}
      <Card className="absolute bottom-4 left-4 w-80 bg-black/50 backdrop-blur border-gray-800">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Temporal Memories
          </CardTitle>
        </CardHeader>
        <CardContent className="max-h-48 overflow-y-auto">
          {memories.slice(0, 5).map((memory, idx) => (
            <div key={idx} className="mb-2 p-2 bg-gray-800/40 rounded">
              <div className="text-xs text-gray-400">
                {new Date(memory.timestamp).toLocaleTimeString()}
              </div>
              <div className="text-sm text-white">
                {memory.type} (Significance: {(memory.significance * 100).toFixed(0)}%)
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Temporal Signature */}
      {quantumState && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-sm text-gray-400">
          <GitBranch className="w-4 h-4" />
          <span className="font-mono">{quantumState.temporalSignature}</span>
        </div>
      )}

      {/* Processing Overlay */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="text-green-400 text-xl font-mono flex items-center gap-2">
              <Activity className="w-6 h-6 animate-pulse" />
              Processing Quantum Event...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuantumInterface;