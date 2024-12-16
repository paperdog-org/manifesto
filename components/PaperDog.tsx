'use client'
import { useState, useEffect, useCallback, memo } from "react"
import Image from 'next/image'
import useSWR from 'swr'
import Copywriter from "./CopyText"
import OneTooltip from './Tooltip'
import Typewriter from "./Typewriter"
import { Clock, Send, ArrowDownUp, Terminal, Radio, Waves, Zap } from 'lucide-react'
import { Stack } from '@chakra-ui/react'
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react'
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { TemporalBridge }from "./TemporalBridge"
import { HopeProtocol } from './HopeProtocol'
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
    const HOPE_TOKEN = 'CsUruQWXtHxHWJEJErkFh1wy5R5Zqgpd2LzMr3aHpump'
    const PAPER_WALLET = 'paperH8WDY7iWW3tCgZy4v9mPzvkBWM4AhewC71Hi9j'
    const DOG_WALLET = 'dogRDrw97cz9w9xrF12WQBALDip5rHdb7mYa4ZEPjGW'

    const [start, setStart] = useState("INITIALIZE")
    const { publicKey, connected } = useWallet()
    const [solAddress, setSolAddress] = useState("")
    
    // Check for 6:51 PM
    const [currentTime, setCurrentTime] = useState(new Date())
    const [isTemporalTime, setIsTemporalTime] = useState(false)
    const [manifestoRetrieved, setManifestoRetrieved] = useState(false)

    const [quantumReadings, setQuantumReadings] = useState<QuantumReading[]>([])
    const [temporalStability, setTemporalStability] = useState(100)
    const [anomalies, setAnomalies] = useState<TemporalAnomaly[]>([])
    const [manifestoBroadcast, setManifestoBroadcast] = useState(false)
    const [quantumLinkStatus, setQuantumLinkStatus] = useState('initializing')

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date()
            setCurrentTime(now)
            setIsTemporalTime(now.getHours() === 18 && now.getMinutes() === 51)
        }, 1000)
        return () => clearInterval(timer)
    }, [])

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

    // Simplified price fetcher
    const fetcher = (url: any) => fetch(url).then((res) => res.json())
    const { data: priceData } = useSWR('../api/prices', fetcher, {refreshInterval: 10})

    const connectWallet = async () => {
        // Solana wallet connect logic here
        setStart('CONNECTED')
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

    const sendToPaper = async () => {
        // Send to 2232 wallet
        // Add transaction logic here
    }

    const sendToDog = async () => {
        // Send to 2024 wallet
        // Add transaction logic here
    }


    // Initial landing page
    if (start === "INITIALIZE") {
        return (
            <div>
                <main className="flex min-h-screen flex-col items-center justify-between p-20">
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
                                onClick={connectWallet}
                            >
                                <b>INITIATE TEMPORAL SEQUENCE</b>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center py-70">
                        <nav className="flex gap-4 text-sm opacity-70">
                            <a href="/about">About</a>
                            <a href="/transmissions">Transmissions</a>
                        </nav>
                    </div>
                </main>
            </div>
        )
    }

    // Connected state
    return (
        <main className="min-h-screen p-5">
            <div className="p-3 font-bold opacity-80">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl opacity-70 flex items-center gap-2">
                        <a href="/">PaperDog</a>
                        <Clock className="h-4 w-4" />
                        <span>{currentTime.toLocaleTimeString()}</span>
                    </h1>
                    <WalletMultiButton />
                </div>
                <div>
                    &gt;&gt;&gt;<Typewriter text="HOPE PROTOCOL ACTIVE" delay={111} />
                </div>
            </div>

            <div className="flex flex-col items-center p-5">
                <Stack spacing={8} className="w-full max-w-2xl">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">PaperDog AI</h2>
                        </div>

                        <div className="space-y-6">
                            <HopeProtocolActions 
                                onAction={(action) => console.log('HOPE action:', action)} 
                                />
                            <TemporalBridge />
                            <div className="grid grid-cols-2 gap-4">
                                <button 
                                    onClick={sendToPaper}
                                    className="flex items-center justify-center gap-2 p-3 border rounded-lg hover:bg-gray-50"
                                >
                                    <Send className="h-4 w-4" />
                                    Send to 2232
                                </button>
                                <button 
                                    onClick={sendToDog}
                                    className="flex items-center justify-center gap-2 p-3 border rounded-lg hover:bg-gray-50"
                                >
                                    <Send className="h-4 w-4" />
                                    Send to 2024
                                </button>
                            </div>
                        </div>
                    </div>

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
                </Stack>
            </div>

            
        </main>
    )
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