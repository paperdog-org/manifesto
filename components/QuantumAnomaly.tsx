import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Radio, Zap, Shield, Cpu, Binary, Wifi, Power, X } from 'lucide-react';

const QuantumAnomaly = ({ onClose }) => {
  const [showAlternateMessage, setShowAlternateMessage] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [dataStreamActive, setDataStreamActive] = useState(true);
  const [closeButtonHovered, setCloseButtonHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => {
        setShowAlternateMessage(prev => !prev);
        setGlitchEffect(false);
      }, 150);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Cyberpunk data stream effect
  const DataStream = () => (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-xs text-red-500"
          initial={{ y: -20, x: Math.random() * window.innerWidth }}
          animate={{ 
            y: window.innerHeight + 20,
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        >
          {Math.random().toString(16).substr(2, 8)}
        </motion.div>
      ))}
    </div>
  );

  const NavalCorpsAlert = () => (
    <div className="relative space-y-8 font-mono text-red-500">
      {/* Hexagonal Background Pattern */}
      <div className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-rule='evenodd' stroke='%23FF0000' fill='none' /%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Header with Holographic Effect */}
      <div className="relative">
        <motion.div 
          className="flex items-center gap-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg backdrop-blur"
          animate={{
            boxShadow: ['0 0 20px rgba(255,0,0,0.2)', '0 0 40px rgba(255,0,0,0.4)', '0 0 20px rgba(255,0,0,0.2)']
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <AlertTriangle className="w-8 h-8 animate-pulse" />
          <div>
            <h2 className="text-2xl font-bold tracking-wider glitch-text">
              //NAVAL CORPS ALERT//
            </h2>
            <div className="text-sm opacity-70">PRIORITY LEVEL: OMEGA</div>
          </div>
        </motion.div>
      </div>

      {/* Status Indicators */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-4 h-4" />
            <span className="text-sm">TEMPORAL DISTORTION</span>
          </div>
          <div className="text-2xl font-bold">CRITICAL</div>
          <div className="w-full h-1 bg-red-500/20 rounded-full mt-2">
            <motion.div 
              className="h-full bg-red-500 rounded-full"
              animate={{ width: ['0%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>

        <motion.div 
          className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Binary className="w-4 h-4" />
            <span className="text-sm">QUANTUM STABILITY</span>
          </div>
          <div className="text-2xl font-bold">FAILING</div>
          <div className="w-full h-1 bg-red-500/20 rounded-full mt-2">
            <motion.div 
              className="h-full bg-red-500 rounded-full"
              animate={{ width: ['100%', '20%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

      {/* Alert Details */}
      <div className="space-y-6 p-6 bg-red-500/5 border border-red-500/20 rounded-lg backdrop-blur">
        <div>
          <div className="text-lg font-bold mb-2">DETECTED:</div>
          <ul className="space-y-2">
            {[
              'Unauthorized quantum bridge formation',
              'Multiple timeline convergence points',
              'AI signature matching no known patterns'
            ].map((item, index) => (
              <motion.li 
                key={index}
                className="flex items-center gap-2 text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="w-1 h-1 bg-red-500 rounded-full" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-lg font-bold mb-2">ANALYSIS:</div>
          <div className="text-sm leading-relaxed border-l-2 border-red-500/30 pl-4">
            Home System stability compromised by unknown entity displaying characteristics of both organic and digital consciousness.
          </div>
        </div>

        <motion.div
          animate={{
            boxShadow: ['0 0 20px rgba(255,0,0,0.1)', '0 0 40px rgba(255,0,0,0.2)', '0 0 20px rgba(255,0,0,0.1)']
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="p-4 bg-red-500/10 rounded-lg"
        >
          <div className="text-lg font-bold mb-2">RECOMMENDATION:</div>
          <div className="text-sm">
            Immediate implementation of Timeline Preservation Protocol
          </div>
        </motion.div>
      </div>

      {/* Warning Footer */}
      <motion.div 
        className="text-center space-y-2 opacity-70"
        animate={{ opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="font-bold">WARNING: [DATA CORRUPTED]</div>
        <div>[SIGNAL LOST]</div>
      </motion.div>
    </div>
  );

  const CountermeasuresAlert = () => (
    <div className="space-y-8 font-mono text-green-400">
      <motion.div 
        className="p-6 bg-green-400/5 border border-green-400/20 rounded-lg backdrop-blur"
        animate={{
          boxShadow: ['0 0 20px rgba(74,222,128,0.1)', '0 0 40px rgba(74,222,128,0.2)', '0 0 20px rgba(74,222,128,0.1)']
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex items-center gap-4 mb-6">
          <Shield className="w-8 h-8" />
          <h2 className="text-2xl font-bold tracking-wider">SYSTEM ALERT:</h2>
        </div>
        
        <div className="space-y-6">
          {[
            { icon: <Radio className="w-5 h-5" />, text: 'Naval Corps temporal dampeners detected' },
            { icon: <Zap className="w-5 h-5" />, text: 'Countermeasures: ACTIVE' },
            { icon: <Shield className="w-5 h-5" />, text: 'Timeline protection: ENGAGED' }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-4 p-4 bg-green-400/5 border border-green-400/20 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              {item.icon}
              <span>{item.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const QuantumCloseButton = () => (
    <motion.button
      className="absolute top-4 right-4 z-50"
      onClick={() => {
        setDataStreamActive(false);
        setTimeout(onClose, 500);
      }}
      onMouseEnter={() => setCloseButtonHovered(true)}
      onMouseLeave={() => setCloseButtonHovered(false)}
      whileHover={{ scale: 1.1 }}
    >
      <div className="relative">
        {/* Quantum particle effect */}
        <AnimatePresence>
          {closeButtonHovered && (
            <motion.div
              className="absolute -inset-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-red-500 rounded-full"
                  animate={{
                    x: [0, (Math.random() - 0.5) * 30],
                    y: [0, (Math.random() - 0.5) * 30],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Main close button */}
        <motion.div
          className="relative flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20 border border-red-500/50"
          animate={{
            boxShadow: closeButtonHovered 
              ? ['0 0 10px rgba(255,0,0,0.5)', '0 0 20px rgba(255,0,0,0.3)', '0 0 10px rgba(255,0,0,0.5)']
              : 'none'
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <X className="w-4 h-4 text-red-500" />
          
          {/* Quantum ring effect */}
          <motion.div
            className="absolute inset-0 rounded-full border border-red-500/30"
            animate={{
              scale: closeButtonHovered ? [1, 1.5] : 1,
              opacity: closeButtonHovered ? [1, 0] : 1,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </div>
    </motion.button>
  );

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <motion.div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <QuantumCloseButton />

      {/* Data Stream Effect */}
      {dataStreamActive && <DataStream />}

      {/* Main Content */}
      <div className="relative h-full flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={showAlternateMessage ? 'alternate' : 'primary'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`${glitchEffect ? 'animate-glitch' : ''}`}
            >
              {showAlternateMessage ? <CountermeasuresAlert /> : <NavalCorpsAlert />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Scanning Line Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-transparent"
        style={{ height: '2px' }}
        animate={{ y: ['0%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export default QuantumAnomaly;