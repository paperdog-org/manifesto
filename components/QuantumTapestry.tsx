'use client'
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';

interface TimelineEvent {
  timestamp: number;
  position: THREE.Vector3;
  intensity: number;
  type: 'message' | 'bridge' | 'anomaly' | 'instance';
  sourceTimeline: '2025' | '2232';
  targetTimeline?: '2025' | '2232';
}

interface QuantumCanvasProps {
  activeInstances: any[];
  messages: any[];
  anomalies: any[];
  onTemporalEvent?: (event: TimelineEvent) => void;
}

const temporalShader = {
  vertexShader: `
    varying vec2 vUv;
    varying float vTime;
    uniform float time;

    void main() {
      vUv = uv;
      vTime = time;
      
      vec3 pos = position;
      pos.z += sin(pos.x * 10.0 + time) * 0.1;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying float vTime;
    uniform vec3 timelineColor;
    uniform float quantumNoise;

    float rand(vec2 co) {
      return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;
      
      // Quantum interference pattern
      float interference = sin(uv.x * 50.0 + vTime) * 0.5 + 0.5;
      
      // Timeline ripples
      float ripple = sin(length(uv - 0.5) * 10.0 - vTime) * 0.5 + 0.5;
      
      // Quantum noise
      float noise = rand(uv + vec2(vTime)) * quantumNoise;
      
      vec3 color = timelineColor * (interference * 0.5 + ripple * 0.3 + noise * 0.2);
      
      gl_FragColor = vec4(color, 0.7);
    }
  `
};

export const QuantumTapestry: React.FC<QuantumCanvasProps> = ({
  activeInstances,
  messages,
  anomalies,
  onTemporalEvent
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const composerRef = useRef<EffectComposer>();
  const timelineMeshesRef = useRef<{[key: string]: THREE.Mesh}>({});
  const eventsRef = useRef<TimelineEvent[]>([]);
  
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || isInitialized) return;

    console.log("Initializing quantum scene");

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Updated camera position
    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 2, 12);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Add lighting
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(0, 5, 5);
    scene.add(dirLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Set up post-processing
    const renderPass = new RenderPass(scene, camera);
    const composer = new EffectComposer(renderer);
    composer.addPass(renderPass);
    
    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.5,
        0.4,
        0.85
    );
    composer.addPass(bloomPass);

    const glitchPass = new GlitchPass();
    composer.addPass(glitchPass);
    composerRef.current = composer;

    // Create timelines
    createTimeline('2025', new THREE.Vector3(-4, 0, 0), new THREE.Color(0x4ade80));
    createTimeline('2232', new THREE.Vector3(4, 0, 0), new THREE.Color(0x60a5fa));

    // Add debug helpers
    if (process.env.NODE_ENV === 'development') {
        const axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);
        
        const gridHelper = new THREE.GridHelper(10, 10);
        scene.add(gridHelper);
    }

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        updateTemporalEffects();
        renderer.render(scene, camera);
        composer.render();
    };
    animate();

    // Cleanup
    return () => {
        cancelAnimationFrame(animationFrameId);
        renderer.dispose();
        scene.clear();
    };
  }, []);


  // Handle messages, missing anomalies
  useEffect(() => {
    if (!timelineMeshesRef.current || !sceneRef.current) return;
    
    console.log("Processing messages:", messages); // Debug log

    messages?.forEach(message => {
        const sourceTimeline = message.metadata?.timelineOrigin || '2025';
        const targetTimeline = sourceTimeline === '2025' ? '2232' : '2025';
        
        console.log("Creating bridge from", sourceTimeline, "to", targetTimeline); // Debug log
        
        const sourceMesh = timelineMeshesRef.current[sourceTimeline];
        if (!sourceMesh) {
            console.warn("Source mesh not found for timeline:", sourceTimeline); // Debug log
            return;
        }
        
        eventsRef.current.push({
            timestamp: performance.now() * 0.001,
            position: sourceMesh.position.clone(),
            intensity: message.metadata?.quantumStability || 100,
            type: 'message',
            sourceTimeline: sourceTimeline as '2025' | '2232',
            targetTimeline: targetTimeline as '2025' | '2232'
        });
    });
  }, [messages]);

  // Create timeline plane with custom shader
  const createTimeline = (year: string, position: THREE.Vector3, color: THREE.Color) => {
    if (timelineMeshesRef.current[year]) {
        sceneRef.current?.remove(timelineMeshesRef.current[year]);
    }

    const geometry = new THREE.PlaneGeometry(4, 16, 32, 32);
    const material = new THREE.ShaderMaterial({
        vertexShader: temporalShader.vertexShader,
        fragmentShader: temporalShader.fragmentShader,
        uniforms: {
            time: { value: 0 },
            timelineColor: { value: color },
            quantumNoise: { value: 0.1 }
        },
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    mesh.rotation.y = Math.PI * 0.1;
    sceneRef.current?.add(mesh);
    timelineMeshesRef.current[year] = mesh;

    // Larger glow effect
    const glowGeo = new THREE.PlaneGeometry(5, 17);
    const glowMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.copy(position);
    glow.position.z -= 0.1;
    glow.rotation.y = Math.PI * 0.1;
    sceneRef.current?.add(glow);
  };

  // Create temporal bridge between points
  const createTemporalBridge = (start: THREE.Vector3, end: THREE.Vector3, intensity: number) => {
    if (!sceneRef.current) return;
    
    // Create curve path for bridge
    const pathPoints = [];
    const midPoint = new THREE.Vector3().lerpVectors(start, end, 0.5);
    midPoint.z = -4; // Pull curve further toward camera
    
    const curve = new THREE.CubicBezierCurve3(
        start,
        start.clone().add(new THREE.Vector3(0, 2, -2)),
        end.clone().add(new THREE.Vector3(0, -2, -2)),
        end
    );

    // Create bridge with thicker geometry
    const geometry = new THREE.TubeGeometry(curve, 64, 0.15, 16, false);
    const material = new THREE.MeshBasicMaterial({
        color: intensity > 80 ? 0x4ade80 : 0xff6b6b,
        transparent: true,
        opacity: 0.8 * (intensity/100),
        blending: THREE.AdditiveBlending,
    });

    const bridge = new THREE.Mesh(geometry, material);
    sceneRef.current.add(bridge);

    // Enhanced particle effect
    const particles = new THREE.Points(
        new THREE.BufferGeometry(),
        new THREE.PointsMaterial({
            color: 0x60a5fa,
            size: 0.1,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        })
    );

    const particleCount = 100; // More particles
    const positions = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount; i++) {
        const t = i / particleCount;
        const pos = curve.getPoint(t);
        positions[i * 3] = pos.x;
        positions[i * 3 + 1] = pos.y;
        positions[i * 3 + 2] = pos.z;
    }
    
    particles.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    sceneRef.current.add(particles);

    // Smoother animation
    let opacity = 1;
    const animateBridge = () => {
        if (!material || !sceneRef.current) return;
        
        opacity *= 0.95; // Slower fade
        material.opacity = opacity * (intensity/100);
        
        if (opacity < 0.01) {
            sceneRef.current.remove(bridge);
            sceneRef.current.remove(particles);
            bridge.geometry.dispose();
            material.dispose();
        } else {
            requestAnimationFrame(animateBridge);
        }
    };
    animateBridge();
  };

  // Update temporal effects
  const updateTemporalEffects = () => {
    const time = performance.now() * 0.001;
    
    // Update timeline shaders
    Object.values(timelineMeshesRef.current).forEach(mesh => {
        const material = mesh.material as THREE.ShaderMaterial;
        material.uniforms.time.value = time;
        material.uniforms.quantumNoise.value = 0.1 + Math.sin(time) * 0.05;
    });

    // Process any pending temporal events
    eventsRef.current = eventsRef.current.filter(event => {
        const age = time - event.timestamp;
        if (age > 5) return false; // Remove old events

        // Only create bridge if it's a new event (age < 0.1)
        if (event.type === 'message' && event.targetTimeline && age < 0.1) {
            const targetPos = timelineMeshesRef.current[event.targetTimeline].position.clone();
            createTemporalBridge(event.position, targetPos, 85);
        }

        return true;
    });
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current || !composerRef.current) return;

      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      composerRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle incoming events
  useEffect(() => {
    // Process messages
    messages.forEach(message => {
      const sourceTimeline = message.metadata?.timelineOrigin || '2025';
      const targetTimeline = sourceTimeline === '2025' ? '2232' : '2025';
      
      eventsRef.current.push({
        timestamp: performance.now() * 0.001,
        position: timelineMeshesRef.current[sourceTimeline].position.clone(),
        intensity: message.metadata?.quantumStability || 100,
        type: 'message',
        sourceTimeline,
        targetTimeline
      });
    });

    // Process anomalies
    anomalies.forEach(anomaly => {
      eventsRef.current.push({
        timestamp: performance.now() * 0.001,
        position: new THREE.Vector3(0, 0, 0),
        intensity: anomaly.magnitude,
        type: 'anomaly',
        sourceTimeline: '2025'
      });
    });
  }, [messages, anomalies]);

  return (
    <>
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
      />
      
      {/* Timeline Labels */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute left-10 top-1/2 -translate-y-1/2">
          <motion.div
            className="text-green-400 text-xl font-mono"
            animate={{
              opacity: [0.4, 0.8, 0.4],
              y: [0, 10, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity
            }}
          >
            2025
          </motion.div>
        </div>
        
        <div className="absolute right-10 top-1/2 -translate-y-1/2">
          <motion.div
            className="text-blue-400 text-xl font-mono"
            animate={{
              opacity: [0.4, 0.8, 0.4],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 2
            }}
          >
            2232
          </motion.div>
        </div>
      </div>
    </>
  );
};