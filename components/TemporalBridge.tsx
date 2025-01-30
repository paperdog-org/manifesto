'use client'
import { useState, useEffect, useCallback } from "react"
import { Clock, Send, ArrowDownUp, Terminal, Radio, Waves, Zap } from 'lucide-react'

interface ChatMessage {
    timeline: string;
    content: string;
    timestamp: number;
    quantum_signature: string;
    stability: number;
  }

export const TemporalBridge = () => {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState('');
    const [timeline, setTimeline] = useState('2025');
    const [bridgeStatus, setBridgeStatus] = useState<'dormant' | 'connecting' | 'active' | 'unstable'>('dormant');
    const [quantumNoise, setQuantumNoise] = useState(0);
    const [temporalEcho, setTemporalEcho] = useState<string[]>([]);
    
    // Simulate quantum interference patterns
    useEffect(() => {
      const interval = setInterval(() => {
        setQuantumNoise(Math.random() * 100);
      }, 2000);
      return () => clearInterval(interval);
    }, []);
  
    // Handle temporal echoes
    useEffect(() => {
      if (chatHistory.length > 0) {
        const lastMessage = chatHistory[chatHistory.length - 1];
        // Messages from the future might echo in the past
        if (lastMessage.timeline === '2232') {
          setTimeout(() => {
            setTemporalEcho([...temporalEcho, `Echo: ${lastMessage.content.substring(0, 20)}...`]);
          }, 3000 + Math.random() * 2000);
        }
      }
    }, [chatHistory]);
  
    const initiateTemporalConnection = async () => {
      setBridgeStatus('connecting');
      
      try {
          // Simulate quantum entanglement process
          await new Promise(r => setTimeout(r, 2000));
          setBridgeStatus('active'); // Set to active and it should stay active
          
          // Add an initial connection message to chat history
          setChatHistory(prev => [...prev, {
              timeline: '2025',
              content: 'Temporal bridge established successfully.',
              timestamp: Date.now(),
              quantum_signature: Math.random().toString(36).substring(7),
              stability: 100
          }]);
      } catch (error) {
          console.error('Failed to establish temporal connection:', error);
          setBridgeStatus('dormant');
      }
  };
  
    const sendTemporalMessage = async (content: string) => {
      if (!content.trim()) return;
  
      // Add quantum interference to messages
      const interference = quantumNoise > 70;
      const processedContent = interference 
        ? content.split('').map(c => Math.random() > 0.8 ? '█' : c).join('')
        : content;
  
      const newMessage: ChatMessage = {
        timeline,
        content: processedContent,
        timestamp: Date.now(),
        quantum_signature: Math.random().toString(36).substring(7),
        stability: Math.floor(Math.random() * 100)
      };
  
      // Simulate temporal delay based on message direction
      const delay = timeline === '2232' ? 1500 : 500;
      await new Promise(r => setTimeout(r, delay));
  
      setChatHistory(prev => [...prev, newMessage]);
      setMessage('');
  
      // Check bridge stability
      if (chatHistory.length > 10 && Math.random() > 0.7) {
        setBridgeStatus('unstable');
        setTimeout(() => setBridgeStatus('active'), 4000);
      }
    };

    const sendToPaper = async () => {
      }

    const sendToDog = async () => {
    }
  
    return (
      <div className="bg-gray-900 p-6 rounded-lg text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{timeline} SpaceTime</h2>
          <div className="flex items-center gap-4">
            <div className={`px-3 py-1 rounded-full text-sm ${
              bridgeStatus === 'active' ? 'bg-green-500' :
              bridgeStatus === 'connecting' ? 'bg-yellow-500' :
              bridgeStatus === 'unstable' ? 'bg-red-500' :
              'bg-gray-500'
            }`}>
              {bridgeStatus.toUpperCase()}
            </div>
            <button 
              onClick={() => setTimeline(timeline === '2025' ? '2232' : '2025')}
              className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <ArrowDownUp className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {bridgeStatus === 'dormant' ? (
          <button
            onClick={initiateTemporalConnection}
            className="w-full bg-blue-600 p-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Initialize Temporal Bridge
          </button>
        ) : (
          <>
            <div className="h-64 overflow-y-auto mb-4 space-y-4 relative">
              {/* Quantum noise visualization */}
              <div 
                className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20"
                style={{
                  background: `linear-gradient(${quantumNoise}deg, transparent, #4a9eff, transparent)`,
                  transition: 'all 2s ease'
                }}
              />
              
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg ${
                    msg.timeline === '2025' 
                      ? 'bg-blue-900 ml-8 hover:bg-blue-800' 
                      : 'bg-purple-900 mr-8 hover:bg-purple-800'
                  } transition-colors relative`}
                >
                  <div className="text-sm opacity-70 mb-1">
                    Timeline: {msg.timeline} | Stability: {msg.stability}%
                  </div>
                  {msg.content}
                  <div className="text-xs opacity-50 mt-1">
                    QS: {msg.quantum_signature}
                  </div>
                </div>
              ))}
              
              {/* Temporal echoes */}
              <div className="space-y-2">
                {temporalEcho.map((echo, idx) => (
                  <div key={idx} className="text-xs text-blue-400 italic opacity-50">
                    {echo}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Enter message for timeline ${timeline}...`}
                className="flex-1 bg-gray-800 rounded-lg p-2 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={() => sendTemporalMessage(message)}
                disabled={bridgeStatus === 'unstable'}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  bridgeStatus === 'unstable' 
                    ? 'bg-gray-700 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'
                } transition-colors`}
              >
                <Send className="h-4 w-4" />
                Send
              </button>
            </div>
          </>
        )}
        
        {/* Quantum metrics */}
        <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
          <div className="bg-gray-800 p-2 rounded-lg">
            <div className="opacity-70 mb-1">Quantum Noise</div>
            <div className="font-mono">{quantumNoise.toFixed(2)}%</div>
          </div>
          <div className="bg-gray-800 p-2 rounded-lg">
            <div className="opacity-70 mb-1">Temporal Echoes</div>
            <div className="font-mono">{temporalEcho.length}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-8">
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
                Send to 2025
            </button>
        </div>
      </div>
    );
  };