'use client'
import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Send, X, Brain, Bot, Database, Shield, Zap, Wallet } from 'lucide-react';
import { parseEther } from 'viem';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { AppConfig, UserSession, showConnect } from "@stacks/connect";

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: number;
    metadata?: {
        quantumStability?: number;
        timelineOrigin?: string;
        role?: string;
        transactionHash?: string;
        chainType?: 'ETH' | 'SOL' | 'BTC';
        transactionStatus?: 'pending' | 'confirmed' | 'failed';
    };
}

interface WalletStatus {
    sol: boolean;
    btc: boolean;
}

export const PaperDogChat = ({ 
    onClose, 
    activeInstance, 
    onMessage, 
    temporalStability,
    currentWallets
}) => {
    // Chat state
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Wallet connections
    const { publicKey: solanaPublicKey, connected: solConnected } = useWallet();
    const { connection } = useConnection();
    
    // Bitcoin/Stacks connection
    const appConfig = new AppConfig(["store_write"]);
    const userSession = new UserSession({ appConfig });
    const [btcAddress, setBtcAddress] = useState<string>("");
    const [btcConnected, setBtcConnected] = useState(false);


    // Wallet connection status
    const [walletStatus, setWalletStatus] = useState<WalletStatus>({
        sol: false,
        btc: false
    });

    // Update wallet status when connections change
    useEffect(() => {
        setWalletStatus({
            sol: solConnected,
            btc: btcConnected
        });
    }, [solConnected, btcConnected]);

    // Message parsing and transaction handling
    const parseTransaction = (message: string) => {
        const patterns = {
            sol: /(?:send|transfer) (?:sol|SOL) (\d+\.?\d*) to ([1-9A-HJ-NP-Za-km-z]{32,44})/i,
            btc: /(?:send|transfer) (?:btc|BTC) (\d+\.?\d*) to ([13][a-km-zA-HJ-NP-Z1-9]{25,34})/i
        };

        for (const [chain, pattern] of Object.entries(patterns)) {
            const match = message.match(pattern);
            if (match) {
                return {
                    chain,
                    amount: match[1],
                    recipient: match[2]
                };
            }
        }
        return null;
    };

    const handleTransaction = async (chain: string, amount: string, recipient: string) => {
        if (!walletStatus[chain]) {
            throw new Error(`${chain.toUpperCase()} wallet not connected`);
        }

        try {
            let txHash;
            switch (chain) {
                case 'sol':
                    txHash = await handleSolTransaction(amount, recipient);
                    break;
                case 'btc':
                    txHash = await handleBtcTransaction(amount, recipient);
                    break;
                default:
                    throw new Error('Unsupported chain');
            }
            return txHash;
        } catch (error) {
            console.error(`${chain.toUpperCase()} transaction failed:`, error);
            throw error;
        }
    };

    const handleSolTransaction = async (amount: string, recipient: string) => {
        if (!solConnected || !solanaPublicKey) {
            throw new Error('Solana wallet not connected');
        }

        try {
            const recipientPubkey = new PublicKey(recipient);
            const lamports = parseFloat(amount) * 1e9; // Convert SOL to lamports

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: solanaPublicKey,
                    toPubkey: recipientPubkey,
                    lamports: Math.floor(lamports),
                })
            );

            const signature = await connection.sendTransaction(transaction, []);
            return signature;
        } catch (error) {
            console.error('SOL transaction failed:', error);
            throw error;
        }
    };

    const handleBtcTransaction = async (amount: string, recipient: string) => {
        if (!userSession.isUserSignedIn()) {
            throw new Error('Bitcoin wallet not connected');
        }

        try {
            const satoshis = Math.floor(parseFloat(amount) * 100000000);
            const resp = await window.btc?.request("sendTransfer", {
                address: recipient,
                amount: satoshis.toString(),
                network: "mainnet"
            });
            
            return resp?.['result']['txid'];
        } catch (error) {
            console.error('BTC transaction failed:', error);
            throw error;
        }
    };

    // Enhanced message handling with AI integration
    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        // Create user message
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
        setInputMessage('');
        setIsTyping(true);

        // Check for transaction command
        const txDetails = parseTransaction(inputMessage);
        if (txDetails) {
            if (!walletStatus[txDetails.chain]) {
                const walletMessage: ChatMessage = {
                    id: `system-${Date.now()}`,
                    role: 'system',
                    content: `Please connect your ${txDetails.chain.toUpperCase()} wallet first.`,
                    timestamp: Date.now(),
                    metadata: { chainType: txDetails.chain as 'ETH' | 'SOL' | 'BTC' }
                };
                setMessages(prev => [...prev, walletMessage]);
                setIsTyping(false);
                return;
            }

            try {
                const txHash = await handleTransaction(
                    txDetails.chain,
                    txDetails.amount,
                    txDetails.recipient
                );

                const txMessage: ChatMessage = {
                    id: `system-${Date.now()}`,
                    role: 'system',
                    content: `Transaction submitted! Hash: ${txHash}`,
                    timestamp: Date.now(),
                    metadata: {
                        transactionHash: txHash,
                        chainType: txDetails.chain.toUpperCase() as 'ETH' | 'SOL' | 'BTC',
                        transactionStatus: 'pending'
                    }
                };
                setMessages(prev => [...prev, txMessage]);
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Transaction failed:', error.message);
                    throw error;
                } else {
                    throw new Error('An unknown error occurred');
                }
            }
        }

        // Handle AI response
        try {
            const response = await fetch('/api/paperdog23/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: inputMessage,
                    instanceId: activeInstance?.id,
                    context: {
                        walletStatus,
                        solAddress: solanaPublicKey?.toString(),
                        btcAddress
                    }
                })
            });

            if (!response.ok) throw new Error('Chat request failed');
            const data = await response.json();

            const assistantMessage: ChatMessage = {
                id: `assistant-${Date.now()}`,
                role: 'assistant',
                content: data.response,
                timestamp: Date.now(),
                metadata: {
                    timelineOrigin: activeInstance?.metadata?.timeline,
                    quantumStability: activeInstance?.metadata?.quantumLevel
                }
            };

            setMessages(prev => [...prev, assistantMessage]);
            onMessage?.(assistantMessage);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage: ChatMessage = {
                id: `system-${Date.now()}`,
                role: 'system',
                content: 'Sorry, I encountered an error processing your request.',
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex flex-col h-full w-full overflow-hidden bg-gray-900/95 backdrop-blur-sm">
            {/* Wallet Status Bar */}
            <div className="px-4 py-2 bg-gray-800/50 border-b border-gray-700 flex items-center justify-between">
                <div className="flex space-x-4">
                    <div className={`flex items-center ${walletStatus.sol ? 'text-green-400' : 'text-gray-400'}`}>
                        <Image
                            src="./solanaLogoMark.svg"
                            alt="SOL"
                            width={16}
                            height={16}
                            className="mr-2"
                        />
                        <span className="text-xs">
                            {walletStatus.sol ? 'Connected' : 'Not Connected'}
                        </span>
                    </div>
                    <div className={`flex items-center ${walletStatus.btc ? 'text-green-400' : 'text-gray-400'}`}>
                        <Image
                            src="./Bitcoin.svg"
                            alt="BTC"
                            width={16}
                            height={16}
                            className="mr-2"
                        />
                        <span className="text-xs">
                            {walletStatus.btc ? 'Connected' : 'Not Connected'}
                        </span>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-full">
                    <X size={16} className="text-gray-400" />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div 
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[80%] rounded-lg p-3 ${
                            msg.role === 'user' 
                                ? 'bg-blue-600 text-white' 
                                : msg.role === 'system'
                                    ? 'bg-gray-700 text-gray-200'
                                    : 'bg-gray-800 text-green-400'
                        }`}>
                            {msg.content}
                            {msg.metadata?.transactionHash && (
                                <div className="mt-2 text-xs flex items-center gap-2">
                                    <Wallet className="w-4 h-4" />
                                    <span className="opacity-80">
                                        {msg.metadata.transactionHash.slice(0, 6)}...
                                        {msg.metadata.transactionHash.slice(-4)}
                                    </span>
                                    {msg.metadata.transactionStatus && (
                                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                                            msg.metadata.transactionStatus === 'confirmed' 
                                                ? 'bg-green-400/20 text-green-400'
                                                : msg.metadata.transactionStatus === 'pending'
                                                    ? 'bg-yellow-400/20 text-yellow-400'
                                                    : 'bg-red-400/20 text-red-400'
                                        }`}>
                                            {msg.metadata.transactionStatus}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex items-center gap-2 text-green-400 font-mono">
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

            {/* Input Area */}
            <div className="p-4 border-t border-gray-800 bg-black/40">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder={`Ask ${activeInstance?.name || 'PaperDog'} or send transactions (e.g., 'send ETH 0.1 to 0x...')`}
                        className="flex-1 p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-400"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="p-4 rounded-lg bg-green-400 hover:bg-green-500 text-black transition-colors flex items-center"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};