'use client'
import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

const ManifestoButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [quantumEffect, setQuantumEffect] = useState(false);

  // Create quantum "glitch" effect periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setQuantumEffect(true);
      setTimeout(() => setQuantumEffect(false), 150);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Quantum Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 blur-xl opacity-0 transition-all duration-500" />
      
      {/* Main Button */}
      <button
        onClick={() => window.open('/PaperDog.pdf', '_blank')}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative px-6 py-3 
          bg-white/20 backdrop-blur-sm
          border border-blue-500/30
          rounded-lg overflow-hidden
          group transition-all duration-300
          hover:border-green-400/50
          ${quantumEffect ? 'translate-x-[1px] scale-[1.02]' : ''}
        `}
      >
        {/* Animated Gradient Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-green-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content Container */}
        <div className="relative flex items-center gap-3 text-gray-100">
          <BookOpen className={`w-5 h-5 transition-all duration-300 ${isHovered ? 'text-green-400' : 'text-blue-400'}`} />
          
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold bg-gradient-to-br from-black/80 to-blue-300 bg-clip-text text-transparent">
              THE•HOPE•MANIFESTO
            </h1>
          
          <Sparkles className={`w-4 h-4 transition-all duration-300 ${isHovered ? 'text-green-400 rotate-12' : 'text-blue-400'}`} />
        </div>

        {/* Quantum Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-1 h-1 bg-blue-400/60
                rounded-full transition-all duration-1000
                ${isHovered ? 'animate-ping' : ''}
              `}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 200}ms`
              }}
            />
          ))}
        </div>
      </button>

      {/* Temporal Echo Effect */}
      {isHovered && (
        <div className="absolute inset-0 -z-10 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 blur-xl" />
        </div>
      )}
    </div>
  );
};

export default ManifestoButton;