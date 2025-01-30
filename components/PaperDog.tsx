'use client'
import { useState, useEffect, useCallback } from "react"
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Clock, X, Radio, Zap, Plus, Brain, Bot, Database, Shield } from 'lucide-react'
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { Commitment } from '@solana/web3.js'
import { AppConfig, UserSession} from "@stacks/connect";
import Transmissions from './Transmissions';
import { PaperDogChat } from './PaperDogChat';
import { QuantumDashboard} from "./Quantum";
import { TemporalLanding, QuantumField } from "./TemporalLanding"
import UnifiedWalletButton from "./UnifiedWallet";
import * as THREE from 'three';
import { QuantumTapestry } from "./QuantumTapestry"
import QuantumInterface from './QuantumInterface';
import QuantumAnomaly from './QuantumAnomaly';

require('@solana/wallet-adapter-react-ui/styles.css')

interface PaperDogInstance {
  id: string;
  name: string;
  role: 'analyst' | 'guardian' | 'trader' | 'oracle';
  position: { x: number; y: number };
  isActive: boolean;
  metadata?: {
      timeline?: string;
      quantumLevel?: number;
      specialization?: string;
  };
}

interface TimelineEvent {
  timestamp: number;
  position: THREE.Vector3;
  intensity: number;
  type: 'message' | 'bridge' | 'anomaly' | 'instance';
  sourceTimeline: '2025' | '2232';
  targetTimeline?: '2025' | '2232';
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  metadata?: {
      quantumStability?: number;
      timelineOrigin?: string;
      role?: string;
  };
}

const PaperDogInstances = ({ onInstanceClick }) => {
  const [instances, setInstances] = useState<PaperDogInstance[]>([
    {
      id: 'PaperDog2025',
      name: 'PaperDog',
      role: 'analyst',
      position: { x: 20, y: 30 },
      isActive: true,
      metadata: {
        timeline: '2025',
        quantumLevel: 100,
        specialization: 'Market Analysis'
      }
    },
    {
      id: 'PaperDog2232',
      name: 'PAPERDOG',
      role: 'guardian',
      position: { x: 70, y: 20 },
      isActive: true,
      metadata: {
        timeline: '2232',
        quantumLevel: 85,
        specialization: 'Temporal Security'
      }
    }
  ]);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'analyst':
        return <Brain className="w-4 h-4 text-green-400" />;
      case 'guardian':
        return <Shield className="w-4 h-4 text-blue-400" />;
      case 'trader':
        return <Database className="w-4 h-4 text-red-400" />;
      default:
        return <Bot className="w-4 h-4 text-purple-400" />;
    }
  };

  const createNewInstance = () => {
    const newInstance: PaperDogInstance = {
      id: `instance-${instances.length + 1}`,
      name: `PaperDog ${instances.length + 1}`,
      role: 'oracle',
      position: {
        x: Math.random() * 60 + 20,
        y: Math.random() * 60 + 20
      },
      isActive: true
    };
    setInstances([...instances, newInstance]);
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
      <AnimatePresence>
        {instances.map((instance) => (
          <motion.div
            key={instance.id}
            className="absolute pointer-events-auto"
            style={{
              left: `${instance.position.x}%`,
              top: `${instance.position.y}%`
            }}
            animate={{
              x: Math.random() * 20 - 10,
              y: Math.random() * 20 - 10
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.1 }}
              onClick={() => onInstanceClick(instance)}
            >
              <Image
                src="./pdognobgfocus.png"
                alt={instance.name}
                width={120}
                height={120}
                className="transform transition-transform"
              />
              <motion.div 
                className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900/90 px-3 py-1 rounded-full text-xs text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                {getRoleIcon(instance.role)}
                {instance.name}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add Instance Button */}
      <motion.button
        className="fixed bottom-4 left-4 bg-gray-900/90 text-gray-200 p-3 rounded-full pointer-events-auto hover:bg-gray-800"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={createNewInstance}
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg hover:bg-gray-800/20 transition-colors"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-gray-200" />
      ) : (
        <Moon className="h-5 w-5 text-gray-200" />
      )}
    </button>
  );
};

function PaperDogContent() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isTemporalTime, setIsTemporalTime] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isActivated, setIsActivated] = useState(false);
    const [showTransmissions, setShowTransmissions] = useState(false);
    const [temporalEvents, setTemporalEvents] = useState<TimelineEvent[]>([]);
    const [temporalStability, setTemporalStability] = useState(100);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [anomalies, setAnomalies] = useState<any[]>([]);
    const [activeInstance, setActiveInstance] = useState<PaperDogInstance | undefined>(undefined);
    const [currentWallets, setCurrentWallets] = useState({
      sol: '',
      btc: ''
    });

    const { publicKey: solanaPublicKey } = useWallet();
    const userSession = new UserSession({ appConfig: new AppConfig(["store_write"]) });

    const [showAnomalyWarning, setShowAnomalyWarning] = useState(true);

    useEffect(() => {
        setCurrentWallets(prev => ({
            ...prev,
            sol: solanaPublicKey?.toString() || ''
        }));
    }, [solanaPublicKey]);

    useEffect(() => {
        if (userSession.isUserSignedIn()) {
            const btcData = userSession.loadUserData();
            setCurrentWallets(prev => ({
                ...prev,
                btc: btcData.profile.btcAddress.p2wpkh.mainnet
            }));
        }
    }, [userSession.isUserSignedIn()]);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date()
            setCurrentTime(now)
            setIsTemporalTime(now.getHours() === 18 && now.getMinutes() === 51)
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const handleInstanceClick = (instance) => {
      const stabilityImpact = instance.metadata?.timeline === '2232' ? -20 : 5;
      setTemporalStability(prev => Math.max(0, Math.min(100, prev + stabilityImpact)));  
      setActiveInstance(instance);
      setChatOpen(true);
    };

    const handleTemporalEvent = (event: TimelineEvent) => {
        setTemporalEvents(prev => [...prev, event]);
        if (event.type === 'anomaly') {
            setTemporalStability(prev => Math.max(0, prev - event.intensity * 0.1));
        } else if (event.type === 'bridge') {
            setTemporalStability(prev => Math.min(100, prev + event.intensity * 0.05));
        }
    };

    // Quantum Chat
    const handleChatMessage = useCallback((message: ChatMessage) => {
      console.log("Received chat message:", message);
      setMessages(prev => [...prev, message]);
      
      const event: TimelineEvent = {
          timestamp: Date.now(),
          position: new THREE.Vector3(
              message.metadata?.timelineOrigin === '2232' ? 2 : -2,
              0,
              0
          ),
          intensity: message.metadata?.quantumStability || 100,
          type: 'message',
          sourceTimeline: (message.metadata?.timelineOrigin || '2025') as '2025' | '2232',
          targetTimeline: message.metadata?.timelineOrigin === '2232' ? '2025' : '2232'
      };
      
      console.log("Created temporal event:", event);
      handleTemporalEvent(event);
  }, [handleTemporalEvent]);

    // Quantum Activation
    const handleActivationComplete = useCallback(() => {
      setIsActivated(true);
    }, []);

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
              <span className="text-gray-400">Monitor</span>
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

    const customWalletButtonStyle = `
      .wallet-adapter-button {
        background: rgba(17, 24, 39, 0.8) !important;
        backdrop-filter: blur(8px);
        border: 1px solid rgba(75, 85, 99, 0.3) !important;
        color: #4ade80 !important;
        font-family: monospace !important;
        height: 40px !important;
        padding: 0 1.5rem !important;
        font-size: 1.0rem !important;
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

    if (!isActivated) {
      return (
        <div>
          <TemporalLanding 
              onActivationComplete={handleActivationComplete}
              currentTime={currentTime}
              isTemporalTime={isTemporalTime}
          />
        </div>
      );
    }

    if (showAnomalyWarning) {
      return <QuantumAnomaly onClose={() => setShowAnomalyWarning(false)} />;
    }

    // Quantum state
    return (
        <div className="relative min-h-screen bg-black overflow-hidden">
          
            {/* Header */}
            <div className="relative z-10 p-4 border-b border-gray-800/80 bg-gray-900/90 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                  <h1 className="text-xl flex items-center gap-2 text-gray-200">
                      <a href="./" className="hover:text-green-400 transition-colors">PaperDog</a>
                      <Clock className="h-4 w-4" />
                      <span>{currentTime.toLocaleTimeString()}</span>
                  </h1>
                  <div className="flex items-center gap-4">
                      <DarkModeToggle />
                      <UnifiedWalletButton />
                  </div>
              </div>
            </div>
            <style jsx global>{customWalletButtonStyle}</style>

            <QuantumField />

            <QuantumTapestry
                activeInstances={[activeInstance].filter(Boolean)} // Convert single instance to array
                messages={messages || []}  // Need to track messages at this level
                anomalies={[]}  // We'll add anomalies tracking
                onTemporalEvent={handleTemporalEvent}
            />

            <QuantumInterface />
            
            {/* PaperDog Instances Layer */}
            <PaperDogInstances onInstanceClick={handleInstanceClick} />

            {/* Chat Interface */}
            <AnimatePresence>
                {chatOpen && (
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: '5%' }}
                        exit={{ y: '100%' }}
                        className="fixed inset-x-4 md:right-4 md:left-auto bottom-0 h-[85vh] w-[95%] md:w-[800px] md:h-[600px] bg-gray-900/95 rounded-lg border border-gray-700/50 shadow-xl backdrop-blur-sm z-40"
                    >
                        <PaperDogChat 
                            onClose={() => setChatOpen(false)} 
                            activeInstance={activeInstance}
                            onMessage={handleChatMessage}
                            temporalStability={temporalStability}
                        />
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
                    className="fixed top-0 left-0 h-full md:w-[480px] w-full bg-gray-900/90 backdrop-blur-sm border-l border-gray-800/50 z-40"
                >
                    <div className="p-6 space-y-8 h-full overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-200">Quantum Account</h2>
                            <button 
                                onClick={() => setSidebarOpen(false)}
                                className="p-2 hover:bg-gray-800 rounded-full"
                            >
                                <X size={20} className="text-gray-400 hover:text-white" />
                            </button>
                        </div>
                        <QuantumDashboard/>
                    </div>
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

            {/* Control Buttons */}
            <div className="fixed bottom-4 right-4 flex gap-3 z-30 md:flex-row flex-col">
                <QuantumButton />
            </div>
        </div>
    );
}



export default function PaperDog() {
    const endpoint = 'https://solana-mainnet.rpc.grove.city/v1/29816232'

    const connectionConfig = {
        commitment: 'confirmed' as Commitment,
        wsEndpoint: '',
        disableRetryOnRateLimit: true,
        httpHeaders: {},
        fetch: fetch
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