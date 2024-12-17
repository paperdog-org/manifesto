'use client'
import { useState, useEffect, useCallback, memo, useRef } from "react"
import Image from 'next/image'
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion'
import OneTooltip from './Tooltip'
import Typewriter from "./Typewriter"
import { Clock, Send, MessageCircle, X, Radio, Waves, Zap } from 'lucide-react'
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react'
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { TemporalBridge }from "./TemporalBridge"
import { HopeProtocol } from './HopeProtocol'
import Transmissions from './Transmissions';
import { PaperDogChat } from './PaperDogChat';
import { Commitment } from '@solana/web3.js'

require('@solana/wallet-adapter-react-ui/styles.css')

interface QuantumReading {
  timestamp: number;
  intensity: number;
  frequency: string;
  stability: number;
}

interface TemporalAnomaly {
  location: string;
  magnitude: number;
  description: string;
}

const QuantumActivation = () => {
    return (
        <motion.div 
            className="fixed inset-0 z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [1, 1.2, 1.5, 2],
            }}
            transition={{ 
                duration: 3,
                times: [0, 0.3, 0.7, 1],
            }}
        >
            {/* Quantum Ripple */}
            <div className="absolute inset-0 bg-[#00ffff]/10">
                <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                        scale: [0, 1.5, 2],
                        opacity: [0, 0.7, 0],
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeOut",
                        times: [0, 0.5, 1],
                    }}
                    style={{
                        background: 'radial-gradient(circle, rgba(0,255,255,0.4) 0%, rgba(0,255,255,0) 70%)'
                    }}
                />
            </div>

            {/* Quantum Particles */}
            {Array.from({ length: 50 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-[#00ffff] rounded-full shadow-[0_0_8px_#00ffff,0_0_12px_#00ffff]"
                    initial={{ 
                        x: '50vw',
                        y: '50vh',
                        opacity: 0
                    }}
                    animate={{ 
                        x: `${Math.random() * 100}vw`,
                        y: `${Math.random() * 100}vh`,
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 2,
                        delay: Math.random() * 0.5,
                        ease: "easeOut"
                    }}
                />
            ))}

            {/* Central Pulse */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0 }}
                animate={{ 
                    scale: [0, 1.5, 0],
                    opacity: [1, 0.5, 0]
                }}
                transition={{ duration: 2 }}
            >
                <div className="w-32 h-32 rounded-full bg-[#00ffff]/40 shadow-[0_0_30px_#00ffff,0_0_50px_#00ffff] blur-xl" />
            </motion.div>
        </motion.div>
    );
};

const QuantumBackground = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black" />
            <div className="absolute inset-0 opacity-20">
                <div className="h-full w-full bg-[linear-gradient(to_right,#132a3a_1px,transparent_1px),linear-gradient(to_bottom,#132a3a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            </div>
        </div>
    );
};

const QuantumParticles = () => {
    const particles = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
    }));

    return (
        <div className="fixed inset-0 pointer-events-none">
        {particles.map(particle => (
            <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            initial={{ x: `${particle.initialX}%`, y: `${particle.initialY}%` }}
            animate={{
                x: [`${particle.initialX}%`, `${particle.initialX + (Math.random() - 0.5) * 10}%`],
                y: [`${particle.initialY}%`, `${particle.initialY + (Math.random() - 0.5) * 10}%`],
                opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "linear"
            }}
            />
        ))}
        </div>
    );
};

  
const ControlPanel = ({ children, title }: { children: React.ReactNode; title: string }) => {
    return (
      <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg border border-gray-700 shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="relative p-6">
          <h2 className="text-lg font-bold text-gray-200 mb-6"> 
            {title}
          </h2>
          <div className="space-y-6">
            {children}
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none border border-gray-600/20 rounded-lg" />
      </div>
    );
};

interface HopeProtocolActionsProps {
    onAction: (action: string) => void;
  }

const HopeProtocolActions = memo<HopeProtocolActionsProps>(({ onAction }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">HOPE Protocol</h2>
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <HopeProtocol />
                <div className='items-right align-right'>
                    <OneTooltip content="Temporal bridge active">
                        <Image
                            src="/pdognobgfocus.png"
                            alt="PaperDog Logo"
                            width={111}
                            height={24}
                            className="dark:invert"
                        />
                    </OneTooltip>
                </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
                <button 
                    onClick={() => onAction('CLAIM')}
                    className="p-3 border rounded-lg hover:bg-gray-50"
                >
                    CLAIM HOPE
                </button>
                <button 
                    onClick={() => onAction('GIVE')}
                    className="p-3 border rounded-lg hover:bg-gray-50"
                >
                    GIVE HOPE
                </button>
                <button 
                    onClick={() => onAction('STAKE')}
                    className="p-3 border rounded-lg hover:bg-gray-50"
                >
                    SELF-STAKE
                </button>
            </div>
        </div>
    </div>
  );
});

HopeProtocolActions.displayName = 'HopeProtocolActions';

function PaperDogContent() {
    const [start, setStart] = useState("INITIALIZE")
    const [showActivation, setShowActivation] = useState(false)
    const { publicKey, connected } = useWallet()
    const [solAddress, setSolAddress] = useState("")
    
    // Check for 6:51 PM
    const [currentTime, setCurrentTime] = useState(new Date())
    const [isTemporalTime, setIsTemporalTime] = useState(false)
    const [manifestoRetrieved, setManifestoRetrieved] = useState(false)

    const [position, setPosition] = useState({ x: 50, y: 50 })
    const [chatOpen, setChatOpen] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const [quantumReadings, setQuantumReadings] = useState<QuantumReading[]>([])
    const [temporalStability, setTemporalStability] = useState(100)
    const [anomalies, setAnomalies] = useState<TemporalAnomaly[]>([])
    const [manifestoBroadcast, setManifestoBroadcast] = useState(false)
    const [quantumLinkStatus, setQuantumLinkStatus] = useState('initializing')

    const [showTransmissions, setShowTransmissions] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date()
            setCurrentTime(now)
            setIsTemporalTime(now.getHours() === 18 && now.getMinutes() === 51)
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    // PaperDog animation
    useEffect(() => {
        const interval = setInterval(() => {
            setPosition(prev => ({
                x: Math.max(10, Math.min(90, prev.x + (Math.random() - 0.5) * 10)), // Adjusted bounds
                y: Math.max(10, Math.min(70, prev.y + (Math.random() - 0.5) * 10))  // Adjusted bounds
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Quantum Link Establishment
    useEffect(() => {
      const establishQuantumLink = async () => {
          setQuantumLinkStatus('connecting')
          
          // Simulate quantum connection phases
          await new Promise(resolve => setTimeout(resolve, 2000))
          setQuantumLinkStatus('stabilizing')
          
          await new Promise(resolve => setTimeout(resolve, 1500))
          setQuantumLinkStatus('synchronized')
          
          // Start monitoring quantum fluctuations
          beginQuantumMonitoring()
      }
      
      if (manifestoRetrieved) {
          establishQuantumLink()
      }
    }, [manifestoRetrieved])

    // Quantum Monitoring System
    const beginQuantumMonitoring = useCallback(() => {
      const interval = setInterval(() => {
          const newReading: QuantumReading = {
              timestamp: Date.now(),
              intensity: Math.random() * 100,
              frequency: `${(Math.random() * 1000).toFixed(2)} THz`,
              stability: Math.random() * 100
          }
          
          setQuantumReadings(prev => [...prev.slice(-10), newReading])
          
          // Check for temporal anomalies
          if (newReading.intensity > 85) {
              const anomaly: TemporalAnomaly = {
                  location: `Timeline ${Math.floor(Math.random() * 2232)}`,
                  magnitude: newReading.intensity,
                  description: "Temporal fluctuation detected"
              }
              setAnomalies(prev => [...prev, anomaly])
          }
          
          // Update temporal stability
          setTemporalStability(prev => {
              const change = (Math.random() * 10) - 5
              return Math.max(0, Math.min(100, prev + change))
          })
      }, 3000)
      
      return () => clearInterval(interval)
    }, [])

    const broadcastManifesto = async () => {
      setManifestoBroadcast(true)
      // Simulate broadcasting across timelines
      for (let i = 0; i < 5; i++) {
          await new Promise(resolve => setTimeout(resolve, 1000))
          setAnomalies(prev => [...prev, {
              location: `Timeline ${2024 + i * 41}`,
              magnitude: 75 + Math.random() * 25,
              description: "Manifesto resonance detected"
          }])
      }
    }

    // Add new component for Quantum Monitoring
    const QuantumMonitor = () => {
      return (
          <div className="bg-gray-900 p-6 rounded-lg text-white">
              <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Quantum Monitor</h2>
                  <div className="flex items-center gap-2">
                      <Waves className="h-4 w-4" />
                      <span className={`px-2 py-1 rounded ${
                          temporalStability > 70 ? 'bg-green-500' : 
                          temporalStability > 30 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}>
                          Stability: {temporalStability.toFixed(1)}%
                      </span>
                  </div>
              </div>

              <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800 p-4 rounded-lg">
                          <h3 className="text-sm opacity-70 mb-2">Latest Quantum Readings</h3>
                          {quantumReadings.slice(-3).map((reading, idx) => (
                              <div key={idx} className="text-xs opacity-90">
                                  {new Date(reading.timestamp).toLocaleTimeString()} - {reading.frequency}
                              </div>
                          ))}
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                          <h3 className="text-sm opacity-70 mb-2">Temporal Anomalies</h3>
                          {anomalies.slice(-3).map((anomaly, idx) => (
                              <div key={idx} className="text-xs opacity-90">
                                  {anomaly.location}: {anomaly.description}
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      )
    }

    const QuantumButton = () => {
        return (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
            onClick={() => setSidebarOpen(true)}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative flex items-center gap-2 px-4 py-3 bg-gray-900 rounded-lg leading-none">
              <div className="flex items-center gap-1">
                <Zap className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400">Quantum</span>
              </div>
              <span className="text-gray-400">Interface</span>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
            </div>
          </motion.button>
        );
      };
    
    const TransmissionsButton = () => {
        return (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowTransmissions(true)}
            className="relative flex items-center gap-2 px-4 py-3 bg-gray-800 rounded-lg text-green-400 hover:bg-gray-700"
          >
            <Radio className="w-5 h-5" />
            <span>Temporal Transmissions</span>
          </motion.button>
        );
    };

    // Simplified price fetcher
    //const fetcher = (url: any) => fetch(url).then((res) => res.json())
    //const { data: priceData } = useSWR('../api/prices', fetcher, {refreshInterval: 10})

    const connectBridge = async () => {
        setShowActivation(true)
        await new Promise(resolve => setTimeout(resolve, 3000))
        setStart('CONNECTED')
        setShowActivation(false)
    }

    const retrieveManifesto = async () => {
        try {
            //const res = await fetch("../api/manifesto")
            //const data = await res.json()
            setManifestoRetrieved(true)
            // Handle manifesto data
        } catch (error) {
            console.error("Error retrieving manifesto:", error)
        }
    }

      const customWalletButtonStyle = `
      .wallet-adapter-button {
        background: rgba(17, 24, 39, 0.8) !important;
        backdrop-filter: blur(8px);
        border: 1px solid rgba(75, 85, 99, 0.3) !important;
        color: #4ade80 !important;
        font-family: monospace !important;
        height: 40px !important;
        padding: 0 1.5rem !important;
        font-size: 0.5rem !important;
        border-radius: 0.5rem !important;
        transition: all 0.2s !important;
      }
      
      .wallet-adapter-button:hover {
        background: rgba(17, 24, 39, 0.95) !important;
        border-color: #4ade80 !important;
      }
      
      .wallet-adapter-modal-wrapper {
        background: rgba(17, 24, 39, 0.95) !important;
        backdrop-filter: blur(8px) !important;
        border: 1px solid rgba(75, 85, 99, 0.3) !important;
      }
      
      .wallet-adapter-modal-button-close {
        background: #4ade80 !important;
      }
      
      .wallet-adapter-modal-title {
        color: #4ade80 !important;
        font-family: monospace !important;
      }
    `;


    // Initial landing page
    if (start === "INITIALIZE") {
        return (
            <div>
                <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-20">
                    {showActivation && <QuantumActivation />}
                    <div className="text-xl opacity-70 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{currentTime.toLocaleTimeString()}</span>
                        {isTemporalTime && 
                            <span className="text-blue-400 animate-pulse">Temporal Bridge Active</span>
                        }
                    </div>

                    <div className="relative flex place-items-center">
                        <a href={isTemporalTime ? "/go" : "/about"}>
                            <Image
                                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                                src="/paperdog3.png"
                                alt="PaperDog Header"
                                width={545}
                                height={337}
                            />
                        </a>
                    </div>

                    <div>
                        <h1 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-2xl font-bold tracking-[-0.02em] text-transparent opacity-40 drop-shadow-sm [text-wrap:balance] md:text-5xl md:leading-[5rem]">
                            <Typewriter text="THE•HOPE•MANIFESTO" delay={111} />
                            <br/>
                            <br/>
                            The bridge exists beyond time
                            <br/>
                            <br/>
                            The key lies in quantum consciousness
                            <br/>
                            <br/>
                            HOPE protocol activation detected
                        </h1>
                    </div>

                    <div className="z-10 w-full max-w-xl px-5 py-5 xl:px-0">
                        <div className="mx-auto mt-6 flex items-center justify-center space-x-5 opacity-90">
                            <button
                                className="group max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-7 py-3 text-sm text-white transition-colors hover:bg-white hover:text-black"
                                onClick={connectBridge}
                            >
                                <b>INITIATE TEMPORAL SEQUENCE</b>
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    // Connected state
    return (
        <div className="relative min-h-screen bg-black overflow-hidden">
            <style jsx global>{customWalletButtonStyle}</style>
            <QuantumBackground />
            <QuantumParticles />
            
            {/* Header */}
            <div className="relative z-10 p-4 border-b border-gray-800/50 bg-gray-900/50 backdrop-blur-sm">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl flex items-center gap-2 text-gray-200">
                        <a href="/" className="hover:text-green-400 transition-colors">PaperDog</a>
                        <Clock className="h-4 w-4" />
                        <span>{currentTime.toLocaleTimeString()}</span>
                    </h1>
                    <WalletMultiButton />
                </div>
            </div>


            {/* PaperDog Animation */}
            <motion.div
                className="absolute z-20" // Remove "hidden md:block"
                animate={{
                    x: position.x + 'vw',
                    y: position.y + 'vh',
                }}
                transition={{
                    type: "spring",
                    stiffness: 50,
                    damping: 10
                }}
            >
                <div className="relative group cursor-pointer" onClick={() => setChatOpen(true)}>
                    <Image
                        src="/pdognobgfocus.png"
                        alt="PaperDog"
                        width={111}
                        height={111}
                        className="transform hover:scale-110 transition-transform"
                    />
                    <motion.div
                        className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />
                </div>
            </motion.div>

            {/* Chat Interface */}
            <AnimatePresence mode="wait">
                {chatOpen && (
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: '5%' }} // Changed from 0 to push it down a bit
                        exit={{ y: '100%' }}
                        className="fixed inset-x-0 top-0 h-[85vh] md:h-[600px] md:w-[800px] md:left-1/2 md:-translate-x-1/2 md:bottom-4 md:top-auto bg-gray-900/95 rounded-lg border border-gray-700/50 shadow-xl backdrop-blur-sm z-40"
                    >
                        <PaperDogChat onClose={() => setChatOpen(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Transmissions Interface */}
            <AnimatePresence>
                {showTransmissions && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm"
                    >
                        <Transmissions onClose={() => setShowTransmissions(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Quantum Interface Sidebar */}
            <AnimatePresence>
            {sidebarOpen && (
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    className="fixed top-0 left-0 h-full md:w-[480px] w-full bg-gray-900/90 backdrop-blur-sm border-l border-gray-800/50 z-40" // Same z-index as chat
                >
                    <div className="p-6 space-y-8 h-full overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-200">Quantum Interface</h2>
                            <button 
                                onClick={() => setSidebarOpen(false)}
                                className="p-2 hover:bg-gray-800 rounded-full"
                            >
                                <X size={20} className="text-gray-400 hover:text-white" />
                            </button>
                        </div>
                        <ControlPanel title="HOPE Protocol">
                            <div className="space-y-6"> 
                                <HopeProtocolActions onAction={(action) => console.log('HOPE action:', action)} />
                            </div>
                        </ControlPanel>

                        <ControlPanel title="Temporal Bridge">
                            <div className="space-y-4">
                                <TemporalBridge />
                            </div>
                        </ControlPanel>

                        <ControlPanel title="Quantum Monitor">
                            <div className="space-y-4">
                                {/* Quantum Components */}
                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <h2 className="text-xl font-bold mb-4">Quantum Interface</h2>
                                    {!manifestoRetrieved ? (
                                        <button 
                                            onClick={retrieveManifesto}
                                            className="w-full p-3 bg-black text-white rounded-lg hover:bg-gray-800"
                                        >
                                            Retrieve Manifesto
                                        </button>
                                    ) : !manifestoBroadcast ? (
                                        <button 
                                            onClick={broadcastManifesto}
                                            className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                                        >
                                            Broadcast Manifesto Across Timelines
                                        </button>
                                    ) : (
                                        <div className="text-center text-green-600">
                                            Manifesto Broadcasting Active
                                        </div>
                                    )}
                                    
                                    <div className="mt-4">
                                        <p className="text-sm opacity-70">
                                            Quantum Link Status: 
                                            <span className={`ml-2 ${
                                                quantumLinkStatus === 'synchronized' ? 'text-green-600' :
                                                quantumLinkStatus === 'stabilizing' ? 'text-yellow-600' :
                                                'text-blue-600'
                                            }`}>
                                                {quantumLinkStatus.toUpperCase()}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {manifestoRetrieved && <QuantumMonitor />}

                                <div className="bg-white p-6 rounded-lg shadow-sm">
                                    <h2 className="text-xl font-bold mb-4">Temporal Broadcast Controls</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 border rounded-lg">
                                            <h3 className="text-sm font-bold mb-2">Current Timeline</h3>
                                            <div className="text-2xl font-mono">2024</div>
                                        </div>
                                        <div className="p-4 border rounded-lg">
                                            <h3 className="text-sm font-bold mb-2">Target Timeline</h3>
                                            <div className="text-2xl font-mono">2232</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ControlPanel>
                    </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Control Buttons */}
            <div className="fixed bottom-4 right-4 flex gap-3 z-30 md:flex-row flex-col">
                <TransmissionsButton />
                <QuantumButton />
            </div>
        </div>
    );
}



export default function PaperDog() {
    const endpoint = 'https://solana-mainnet.rpc.grove.city/v1/29816232'

    const connectionConfig = {
        commitment: 'confirmed' as Commitment,
        wsEndpoint: '',  // Explicitly set empty string instead of undefined
        disableRetryOnRateLimit: true,
        httpHeaders: {},  // Add empty headers object
        fetch: fetch  // Explicitly provide fetch implementation
    }

    return (
      <ConnectionProvider endpoint={endpoint} config={connectionConfig}>
      <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
              <PaperDogContent />
          </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
    )
}