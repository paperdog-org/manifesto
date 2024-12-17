import React, { useState, useEffect } from 'react';
import { Sparkles, MessageCircle, Settings } from 'lucide-react';

const PaperDogInterface = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Bouncing animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => ({
        x: prev.x + (Math.random() - 0.5) * 10,
        y: prev.y + (Math.random() - 0.5) * 10
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      {/* Main PaperDog Animation */}
      <div 
        className="absolute transition-all duration-1000 ease-in-out"
        style={{ 
          left: `${position.x}%`, 
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="relative group">
          <img 
            src="/pdognobgfocus.png" 
            alt="PaperDog"
            className="w-24 h-24 cursor-pointer hover:scale-110 transition-transform"
          />
          <Sparkles 
            className="absolute -top-2 -right-2 text-purple-400 animate-pulse"
            size={16}
          />
        </div>
      </div>

      {/* Chat Interface */}
      <div className={`fixed bottom-4 right-4 w-96 bg-gray-800 rounded-lg transition-transform duration-300 ${chatOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <MessageCircle size={16} className="text-green-400" />
            <span className="text-green-400 font-mono">TEMPORAL_CHAT_v2.232</span>
          </div>
        </div>
        <div className="h-96 p-4 overflow-y-auto">
          {/* Chat messages would go here */}
          <div className="text-green-400 font-mono">
            *quantum fluctuations detected* How may I assist you across timelines today? *tail wag*
          </div>
        </div>
      </div>

      {/* Control Panel Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-black bg-opacity-90 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 text-green-400 font-mono">
          <h2 className="text-xl mb-4">Quantum Controls</h2>
          {/* Original PaperDog.tsx controls would go here */}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="fixed bottom-4 left-4 flex gap-2">
        <button 
          onClick={() => setChatOpen(!chatOpen)}
          className="p-2 bg-gray-800 rounded-full text-green-400 hover:bg-gray-700"
        >
          <MessageCircle size={20} />
        </button>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-gray-800 rounded-full text-green-400 hover:bg-gray-700"
        >
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
};

export default PaperDogInterface;