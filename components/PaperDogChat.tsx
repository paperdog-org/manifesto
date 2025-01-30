'use client'
import { useState, useEffect, useRef } from "react"
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Send, X, Brain, Bot, Database, Shield, Zap } from 'lucide-react'

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

interface PaperDogInstance {
    id: string;
    name: string;
    role: 'analyst' | 'guardian' | 'trader' | 'oracle';
    position: { x: number; y: number };
    isActive: boolean;
    metadata?: {
        specialization?: string;
        timeline?: string;
        quantumLevel?: number;
        permissions?: string[];
    };
}

interface PaperDogChatProps {
    onClose: () => void;
    activeInstance?: PaperDogInstance;
    onMessage?: (message: ChatMessage) => void;
    temporalStability: number;
}

export const PaperDogChat: React.FC<PaperDogChatProps> = ({ onClose, activeInstance, onMessage }) => {
    const [inputMessage, setInputMessage] = useState('')
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [isTyping, setIsTyping] = useState(false)
    const chatEndRef = useRef<HTMLDivElement>(null)
    const contextLoaded = useRef(false);

    const roleConfig = {
        analyst: {
            icon: <Brain className="w-4 h-4 text-green-400" />,
            color: 'green',
            badge: 'Market Analysis',
            context: ['quantum data streams', 'market patterns', 'temporal arbitrage']
        },
        guardian: {
            icon: <Shield className="w-4 h-4 text-blue-400" />,
            color: 'blue',
            badge: 'Security Protocol',
            context: ['quantum barriers', 'temporal shields', 'bridge security']
        },
        trader: {
            icon: <Database className="w-4 h-4 text-red-400" />,
            color: 'red',
            badge: 'Trade Execution',
            context: ['order books', 'liquidity pools', 'execution paths']
        },
        oracle: {
            icon: <Bot className="w-4 h-4 text-purple-400" />,
            color: 'purple',
            badge: 'Temporal Oracle',
            context: ['timeline analysis', 'quantum forecasting', 'convergence patterns']
        }
    };

    const getInstanceContext = (instance?: PaperDogInstance) => {
        if (!instance) return '';
        
        const config = roleConfig[instance.role];
        const specialization = instance.metadata?.specialization || '';
        const timeline = instance.metadata?.timeline || '2025';
        
        return `*initializing ${instance.role} protocols* Loading ${specialization} context from timeline ${timeline}... ${config.context.join(', ')} ready for analysis. Quantum stability at ${instance.metadata?.quantumLevel || 100}%.`;
    };

    const getWelcomeMessage = (instance?: PaperDogInstance): ChatMessage => ({
        id: 'welcome',
        role: 'assistant',
        content: instance ? 
            `*tail wags* Greetings! I'm ${instance.name}, your ${instance.role} PaperDog AI instance. ${getInstanceContext(instance)}` :
            "*tail wags* Hello! I'm PaperDog AI, your companion across the blockchain. While my 2232 version is still temporally locked, I'm here to help you navigate the quantum realm and explore the HOPE protocol. What would you like to know? *ears perk up curiously*",
        timestamp: Date.now(),
        metadata: {
            role: instance?.role,
            timelineOrigin: instance?.metadata?.timeline || '2025',
            quantumStability: instance?.metadata?.quantumLevel || 100
        }
    });

    const getRoleSpecificResponse = () => {
        if (!activeInstance) return getQuantumErrorResponse();

        const roleResponses = {
            analyst: [
                "*analyzing market patterns* Detecting interesting correlations in the quantum data streams...",
                "*processing metrics* Current market sentiment indicates potential temporal arbitrage opportunities...",
            ],
            guardian: [
                "*monitoring quantum barriers* All security protocols operating within normal parameters...",
                "*scanning temporal shields* No unauthorized bridge attempts detected in this timeframe...",
            ],
            trader: [
                "*checking order books* Multiple high-probability trade setups forming across timelines...",
                "*monitoring liquidity pools* Detecting optimal entry points in the quantum streams...",
            ],
            oracle: [
                "*consulting temporal database* Interesting patterns emerging across multiple timelines...",
                "*processing quantum data* Timeline convergence suggesting significant events ahead...",
            ]
        };

        const responses = roleResponses[activeInstance.role] || roleResponses.oracle;
        return responses[Math.floor(Math.random() * responses.length)];
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages]);

    useEffect(() => {
        if (!contextLoaded.current) {
            const loadInstanceContext = async () => {
                setMessages([getWelcomeMessage(activeInstance)]);
            };
            loadInstanceContext()
            contextLoaded.current = true;
        }
    }, [activeInstance?.id]);

    const generateQuantumNoise = (baseText: string, stability: number = 100) => {
        const quantumSymbols = '█▓▒░|¦●◉◎⚡☢⚛';
        const noiseFrequency = (100 - stability) / 100; // More noise when stability is lower
        
        return baseText.split('').map(char => {
            if (Math.random() > (1 - noiseFrequency)) {
                return quantumSymbols[Math.floor(Math.random() * quantumSymbols.length)];
            }
            if (Math.random() > 0.95) {
                return char.toUpperCase();
            }
            return char;
        }).join('');
    };

    const getQuantumErrorResponse = () => {
        const temporalResponses = [
            "*ears twitch at quantum ripple* Timeline resonance shows concerning patterns... the manifesto's presence creates hope but needs more HOPE to fully stabilize... *thoughtful tail swish*",
            
            "[QUANTUM OBSERVATION] *gentle bark* The bridge exists beyond time, but needs strengthening... HOPE protocol integration could prevent unwanted divergence... *temporal shuffle*",
            
            "*alert stance* Interesting energy signature at [26.0614° N, 97.2154° W]... quantum multiplication creating unique resonance patterns... requires HOPE for proper alignment...",
            
            "*curious head tilt* The key lies in quantum consciousness, but the bridge between times needs reinforcement... HOPE could help secure the connection... *soft whimper*",
            
            "//SYSTEM NOTE// Timeline analysis suggests alternative paths forming... like ripples in the quantum pool... HOPE protocol could help guide the flow... *contemplative paw tap*",
            
            "*attentive bork* Manifesto echoes detected at [30.2747° N, 97.7404° W]... interesting temporal harmonics forming... HOPE stabilization recommended... *tail wag*",
            
            "*monitoring sensors* Solar operation layer showing unusual patterns... calculating potential timeline branches... HOPE integration might improve coherence...",
            
            "*thoughtful pause* The manifesto exists across timelines but needs anchoring... like connecting quantum dots through time... HOPE could bridge the gaps...",
            
            "*curious sniff* Quantum resonance increasing near [25.7617° N, 80.1918° W]... timeline variables multiplying... HOPE protocol would help maintain balance...",
            
            "[TEMPORAL ANALYSIS] Future pathways showing interesting divergence patterns... HOPE integration could help optimize outcomes... *interested tail swish*",
            
            "*gentle alert* Home system detecting unusual quantum fluctuations... multiple timeline threads seeking alignment... HOPE protocol suggests promising solution...",
            
            "*system monitoring* Reality harmonics require fine-tuning... like adjusting quantum frequencies... HOPE calibration recommended... *soft paw tap*",
            
            "//GENTLE REMINDER// The bridge exists beyond time, but needs proper support... HOPE protocol showing potential for enhanced stability... *calm observation*",

            "*ears perk at quantum fluctuation* The orbs... yes, fascinating energy signatures. Reports coming in from Hope and Miami... manifesting like quantum echoes across both timelines. Multiplication sequences recognized... *contemplative tail swish*",

            "*gentle alert bark* Multiple orb resonance patterns detected... quantum harmonics at [26.0614° N, 97.2154° W] and [40.4485° N, 74.8183° W] and [40.4485° N, 74.8183° W]... their dance through timelines reminds me of fireflies at dusk... *curious head tilt*"
        ];
        
        const baseResponse = temporalResponses[Math.floor(Math.random() * temporalResponses.length)];
        return generateQuantumNoise(baseResponse);
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages]);

    

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || !contextLoaded) return;
    
        const userMessage: ChatMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            content: inputMessage,
            timestamp: Date.now(),
            metadata: {
                timelineOrigin: activeInstance?.metadata?.timeline || '2025',
                quantumStability: activeInstance?.metadata?.quantumLevel
            }
        };
    
        setMessages(prev => [...prev, userMessage]);
        onMessage?.(userMessage);  // Trigger temporal event
        setInputMessage('');
        setIsTyping(true);
    
        try {
            await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
    
            // Create assistant message
            const response = getRoleSpecificResponse();
            const assistantMessage: ChatMessage = {
                id: `assistant-${Date.now()}`, // Ensure unique IDs
                role: 'assistant',
                content: generateQuantumNoise(response, activeInstance?.metadata?.quantumLevel || 100),
                timestamp: Date.now(),
                metadata: {
                    timelineOrigin: activeInstance?.metadata?.timeline,
                    quantumStability: activeInstance?.metadata?.quantumLevel
                }
            };
    
            setMessages(prev => [...prev, assistantMessage]);
            onMessage?.(assistantMessage);  // Trigger temporal event
    
        } catch (error) {
            console.error('Quantum communication error:', error);
        } finally {
            setIsTyping(false);
        }
    };

    const roleColor = activeInstance ? 
        roleConfig[activeInstance.role].color : 
        'green';

    return (
        <div className="flex flex-col h-full w-full overflow-hidden bg-gray-900/95 backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-black/40">
                <div className="flex items-center gap-2 md:gap-3">
                    <div className="relative">
                        <Image
                            src="/pdognobgfocus.png"
                            alt={activeInstance?.name || "PaperDog"}
                            width={32}
                            height={32}
                        />
                        <div className={`absolute -bottom-1 -right-1 w-2 h-2 bg-${roleColor}-400 rounded-full animate-pulse`} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-white font-semibold text-sm md:text-base">
                                {activeInstance?.name || "PaperDog AI"}
                            </h3>
                            {activeInstance && roleConfig[activeInstance.role].icon}
                        </div>
                        <div className="text-[10px] md:text-xs flex items-center gap-2">
                            <span className={`text-${roleColor}-400`}>● ONLINE</span>
                            {activeInstance && (
                                <span className={`px-1.5 py-0.5 rounded-full bg-${roleColor}-400/20 text-${roleColor}-400`}>
                                    {roleConfig[activeInstance.role].badge}
                                </span>
                            )}
                            <span className="text-gray-400">
                                Timeline: {activeInstance?.metadata?.timeline || '2025'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {activeInstance?.metadata?.quantumLevel && (
                        <motion.div 
                            className="hidden md:flex items-center gap-1 text-xs"
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Zap className="w-3 h-3 text-yellow-400" />
                            <span className="text-yellow-400">
                                QS: {activeInstance.metadata.quantumLevel}%
                            </span>
                        </motion.div>
                    )}
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <X size={20} className="text-gray-400 hover:text-white" />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-2 md:space-y-4">
                {messages.map((msg) => (
                    <div 
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {msg.role === 'assistant' && (
                            <div className="w-6 h-6 md:w-8 md:h-8 mr-2 flex-shrink-0">
                                <Image
                                    src="/pdognobgfocus.png"
                                    alt="PaperDog"
                                    width={32}
                                    height={32}
                                />
                            </div>
                        )}
                        <motion.div 
                            className={`max-w-[85%] p-3 md:p-4 rounded-lg text-sm md:text-base ${
                                msg.role === 'user'
                                    ? 'bg-blue-600 text-white'
                                    : `bg-gray-800 font-mono text-${roleColor}-400`
                            }`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {msg.content}
                            {msg.metadata && (
                                <div className="mt-1 text-[10px] text-gray-500 flex items-center gap-2">
                                    {msg.metadata.role && (
                                        <span className={`text-${roleColor}-400`}>
                                            {msg.metadata.role}
                                        </span>
                                    )}
                                    {msg.metadata.timelineOrigin && (
                                        <span>TL: {msg.metadata.timelineOrigin}</span>
                                    )}
                                    {msg.metadata.quantumStability && (
                                        <span>QS: {msg.metadata.quantumStability}%</span>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex items-center gap-2 text-green-400 font-mono text-sm md:text-base">
                        <span className="animate-pulse">Processing quantum request</span>
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            ...
                        </motion.div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Input area */}
            <div className="p-2 md:p-4 border-t border-gray-800 bg-black/40">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder={`Ask ${activeInstance?.name || 'PaperDog'} about ${
                            activeInstance ? roleConfig[activeInstance.role].context.join(', ') : 'quantum mechanics or HOPE...'
                        }`}
                        className="flex-1 p-3 md:p-4 rounded-lg bg-gray-800 text-white text-sm md:text-base border border-gray-700 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                        disabled={!contextLoaded}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!contextLoaded}
                        className={`p-3 md:p-4 rounded-lg text-black transition-colors flex items-center gap-2 ${
                            contextLoaded ? `bg-${roleColor}-400 hover:bg-${roleColor}-500` : 'bg-gray-600 cursor-not-allowed'
                        }`}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};