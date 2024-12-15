'use client'
import { useState, useEffect } from "react"
import Image from 'next/image'
import useSWR from 'swr'
import Copywriter from "./CopyText"
import OneTooltip from './Tooltip'
import Typewriter from "./Typewriter"
import { Clock, Send, ArrowDownUp, Terminal } from 'lucide-react';
import { Stack } from '@chakra-ui/react'
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react'
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'

require('@solana/wallet-adapter-react-ui/styles.css')

interface ChatMessage {
  timeline: string;
  content: string;
}

function PaperDogContent() {
    const HOPE_TOKEN = 'CsUruQWXtHxHWJEJErkFh1wy5R5Zqgpd2LzMr3aHpump'
    const PAPER_WALLET = 'paperH8WDY7iWW3tCgZy4v9mPzvkBWM4AhewC71Hi9j'
    const DOG_WALLET = 'dogRDrw97cz9w9xrF12WQBALDip5rHdb7mYa4ZEPjGW'

    const [start, setStart] = useState("INITIALIZE")
    const { publicKey, connected } = useWallet()
    const [solAddress, setSolAddress] = useState("")
    const [hopeBalance, setHopeBalance] = useState("0")
    
    // Check for 6:51 PM
    const [currentTime, setCurrentTime] = useState(new Date())
    const [isTemporalTime, setIsTemporalTime] = useState(false)
    const [manifestoRetrieved, setManifestoRetrieved] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date()
            setCurrentTime(now)
            setIsTemporalTime(now.getHours() === 18 && now.getMinutes() === 51)
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    // Simplified price fetcher
    const fetcher = (url: any) => fetch(url).then((res) => res.json())
    const { data: priceData } = useSWR('../api/prices', fetcher, {refreshInterval: 10})

    const connectWallet = async () => {
        // Solana wallet connect logic here
        setStart('CONNECTED')
    }

    const retrieveManifesto = async () => {
        try {
            const res = await fetch("../api/manifesto")
            const data = await res.json()
            setManifestoRetrieved(true)
            // Handle manifesto data
        } catch (error) {
            console.error("Error retrieving manifesto:", error)
        }
    }

    const buyHope = async () => {
        // Jupiter API integration for token swap
        window.open(`https://jup.ag/swap/SOL-${HOPE_TOKEN}`, '_blank')
    }

    const sendToPaper = async () => {
        // Send to 2232 wallet
        // Add transaction logic here
    }

    const sendToDog = async () => {
        // Send to 2024 wallet
        // Add transaction logic here
    }

    const HopeProtocolActions = ({ onAction }) => {
        const [hopeBalance, setHopeBalance] = useState(0);
        const [stakeAmount, setStakeAmount] = useState('');
        
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">HOPE Protocol</h2>
            <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm opacity-70">Your HOPE Balance</p>
                <p className="text-2xl font-bold">{hopeBalance} HOPE</p>
                <button 
                    onClick={buyHope}
                    className="mt-2 p-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                    Acquire HOPE
                </button>
              </div>
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
      };

      const TemporalBridge = () => {
        const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
        const [message, setMessage] = useState('');
        const [timeline, setTimeline] = useState('2024');
        
        return (
          <div className="bg-gray-900 p-6 rounded-lg text-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Temporal Bridge - {timeline}</h2>
              <button 
                onClick={() => setTimeline(timeline === '2024' ? '2232' : '2024')}
                className="bg-gray-800 p-2 rounded-lg"
              >
                <ArrowDownUp />
              </button>
            </div>
            
            <div className="h-64 overflow-y-auto mb-4 space-y-4">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg ${
                    msg.timeline === '2024' ? 'bg-blue-900 ml-8' : 'bg-purple-900 mr-8'
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter temporal message..."
                className="flex-1 bg-gray-800 rounded-lg p-2 text-white"
              />
              <button
                onClick={() => {
                  if (message.trim()) {
                    setChatHistory([...chatHistory, { timeline, content: message }]);
                    setMessage('');
                  }
                }}
                className="bg-blue-500 px-4 py-2 rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        );
    };

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
                        
                        {!manifestoRetrieved && (
                                <button 
                                    onClick={retrieveManifesto}
                                    className="w-full p-3 bg-black text-white rounded-lg hover:bg-gray-800"
                                >
                                    Retrieve Manifesto
                                </button>
                            )}
                        
                        <p className="text-sm opacity-70 py-3">
                            {manifestoRetrieved 
                                ? "Temporal bridge established" 
                                : "Awaiting manifesto retrieval"}
                        </p>
                    </div>
                </Stack>
            </div>

            
        </main>
    )
}



export default function PaperDog() {
    const network = WalletAdapterNetwork.Mainnet
    const endpoint = 'https://solana-mainnet.rpc.grove.city/v1/1fdcca1ff43737458ada43f9'

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <PaperDogContent />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}