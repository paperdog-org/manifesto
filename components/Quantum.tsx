'use client'
import { useState, useEffect, useCallback } from "react"
import { motion } from 'framer-motion'
import { Wallet, Zap, Radio, Waves, Bone, Dog, GitBranch, Activity, BarChart3} from 'lucide-react';
import { HopeProtocol } from './HopeProtocol'
import { TemporalBridge }from "./TemporalBridge"

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
  
interface TokenBalance {
    symbol: string;
    amount: string;
    dollarValue: string;
}

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
  
export const QuantumDashboard = () => {
    const [manifestoBroadcast, setManifestoBroadcast] = useState(false)
    const [quantumLinkStatus, setQuantumLinkStatus] = useState('initializing')
    const [manifestoRetrieved, setManifestoRetrieved] = useState(false)
    const [quantumReadings, setQuantumReadings] = useState<QuantumReading[]>([])
    const [temporalStability, setTemporalStability] = useState(100)
    const [anomalies, setAnomalies] = useState<TemporalAnomaly[]>([])

    const tokenBalances: TokenBalance[] = [
        { symbol: 'HOPE', amount: '100,000', dollarValue: '1,000$' },
        { symbol: 'PaperDog', amount: '50,000', dollarValue: '750$' },
        { symbol: 'THE•HOPE•MANIFESTO', amount: '25,000', dollarValue: '500$' }
      ];

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
                location: `Timeline ${2025 + i * 41}`,
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
  
    return (
      <div className="p-6 grid grid-cols-1 gap-6">

        {/* PaperDog AI Status */}
        <motion.div 
          className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-400" />
            AI Status
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-sm text-gray-400">Active Instances</div>
                <div className="text-2xl font-bold text-purple-400">3</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-sm text-gray-400">Tasks Completed</div>
                <div className="text-2xl font-bold text-green-400">42</div>
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-gray-400">Quantum Stability</div>
                <div className="text-sm text-green-400">92%</div>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-green-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "92%" }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <ControlPanel title="THE•HOPE•MANIFESTO">
            <div className="space-y-6"> 
                <HopeProtocol />
            </div>
        </ControlPanel>

        {/* Token Balances Card */}
        <motion.div 
          className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-green-400" />
            Token Balances
          </h3>
          <div className="space-y-4">
            {tokenBalances.map((token) => (
              <div key={token.symbol} className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-400/20 flex items-center justify-center">
                    {token.symbol === 'HOPE' ? <Zap className="w-4 h-4 text-green-400" /> :
                     token.symbol === 'PDOG' ? <Dog className="w-4 h-4 text-purple-400" /> :
                     <GitBranch className="w-4 h-4 text-blue-400" />}
                  </div>
                  <div>
                    <div className="font-bold text-gray-200">{token.symbol}</div>
                    <div className="text-sm text-gray-400">{token.dollarValue}</div>
                  </div>
                </div>
                <div className="text-xl font-mono text-gray-200">{token.amount}</div>
              </div>
            ))}
          </div>
        </motion.div>


        <ControlPanel title="Temporal Bridge">
            <div className="space-y-4">
                <TemporalBridge />
            </div>
        </ControlPanel>
  
        {/* Recent Transactions */}
        <motion.div 
          className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-400/20 flex items-center justify-center">
                    <Radio className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-gray-200">Temporal Bridge #{i}</div>
                    <div className="text-sm text-gray-400">2min ago</div>
                  </div>
                </div>
                <div className="text-green-400">Success</div>
              </div>
            ))}
          </div>
        </motion.div>
  
        {/* Dog Park */}
        <motion.div 
          className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-xl font-bold text-gray-200 mb-4 flex items-center gap-2">
            <Bone className="w-5 h-5 text-yellow-400" />
            Dog Park
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {['Bone', 'House', 'Ball'].map((item) => (
              <motion.div
                key={item}
                className="aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-700/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <Bone className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">{item}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        

        

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
            </div>
        </ControlPanel>
      </div>
    );
};

