'use client'
import { useState, useEffect, useRef } from "react"
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Send, X } from 'lucide-react'

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}

interface PaperDogChatProps {
    onClose: () => void;
}

export const PaperDogChat: React.FC<PaperDogChatProps> = ({ onClose }) => {
    const [inputMessage, setInputMessage] = useState('')
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [isTyping, setIsTyping] = useState(false)
    const chatEndRef = useRef<HTMLDivElement>(null)

    const welcomeMessage = {
        id: 'welcome',
        role: 'assistant' as const,
        content: "*tail wags* Hello! I'm PaperDog AI, your companion across the blockchain. While my 2232 version is still temporally locked, I'm here to help you navigate the quantum realm and explore the HOPE protocol. What would you like to know? *ears perk up curiously*",
        timestamp: Date.now()
    };

    const generateQuantumNoise = (baseText: string) => {
        const quantumSymbols = '█▓▒░|¦●◉◎⚡☢⚛';
        return baseText.split('').map(char => {
            if (Math.random() > 0.85) {
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

    useEffect(() => {
        if (messages.length === 0) {
            setMessages([welcomeMessage]);
        }
    }, []);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: inputMessage,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, newMessage]);
        setInputMessage('');
        setIsTyping(true);

        try {
            // Simulate quantum processing delay
            await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
            
            // Temporarily use quantum error responses
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'assistant',
                content: getQuantumErrorResponse(),
                timestamp: Date.now()
            }]);

            // Add quantum interference effect occasionally
            if (Math.random() > 0.7) {
                setTimeout(() => {
                    setMessages(prev => [...prev, {
                        id: Date.now().toString(),
                        role: 'assistant',
                        content: "*quantum interference detected* ...timeline stabilizing...",
                        timestamp: Date.now()
                    }]);
                }, 500);
            }
        } catch (error) {
            console.error('Quantum communication error:', error);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-full w-full overflow-hidden bg-gray-900/95 backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-black/40">
                <div className="flex items-center gap-2 md:gap-3">
                    <div className="relative">
                        <Image
                            src="/pdognobgfocus.png"
                            alt="PaperDog"
                            width={32}
                            height={32}
                        />
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold text-sm md:text-base">PaperDog AI</h3>
                        <div className="text-[10px] md:text-xs">
                            <span className="text-green-400">● ONLINE</span>
                            <span className="text-gray-400 ml-2">2024 Build v1.0</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <motion.span 
                        className="hidden md:inline-block text-xs text-red-400"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        2232 Temporal Link Disconnected
                    </motion.span>
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
                                    : 'bg-gray-800 font-mono text-green-400'
                            }`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {msg.content}
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
                        placeholder="Ask about quantum mechanics or HOPE..."
                        className="flex-1 p-3 md:p-4 rounded-lg bg-gray-800 text-white text-sm md:text-base border border-gray-700 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="p-3 md:p-4 bg-green-400 rounded-lg hover:bg-green-500 text-black transition-colors flex items-center gap-2"
                    >
                        <Send size={20} />
                    </button>
                </div>
                <div className="mt-2 text-[10px] md:text-xs text-gray-500 text-center px-2">
                    Note: Temporal Chat (2232) will be available when quantum stability reaches optimal levels
                </div>
            </div>
        </div>
    );
};