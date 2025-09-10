'use client';

import { useEffect, useState } from 'react';
import Confetti from './Confetti';

interface GrandFinaleProps {
  isActive: boolean;
}

export default function GrandFinale({ isActive }: GrandFinaleProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showBrightening, setShowBrightening] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const sequence = [
      setTimeout(() => {
        setShowConfetti(true);
      }, 500),
      
      setTimeout(() => {
        setShowText(true);
      }, 1000),
      
      setTimeout(() => {
        setShowBrightening(true);
      }, 2000)
    ];

    return () => {
      sequence.forEach(clearTimeout);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <>
      <Confetti isActive={showConfetti} />
      
      <div 
        className={`fixed inset-0 transition-all duration-4000 ease-out ${
          showBrightening 
            ? 'bg-gradient-to-br from-orange-50 to-yellow-50 opacity-90' 
            : 'bg-transparent opacity-0'
        }`}
        style={{ zIndex: 8000 }}
      />

      <div 
        className={`fixed inset-0 flex items-center justify-center transition-all duration-2000 ease-out ${
          showText ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
        style={{ zIndex: 9000 }}
      >
        <div className="text-center px-4">
          <h1 
            className={`text-6xl md:text-8xl lg:text-9xl font-black mb-8 transition-all duration-3000 ease-out ${
              showBrightening 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500' 
                : 'text-white'
            }`}
            style={{
              textShadow: showBrightening 
                ? '0 0 30px rgba(255, 165, 0, 0.5)' 
                : '0 0 50px rgba(0, 0, 0, 0.8)',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.05em'
            }}
          >
            VOCÊ É<br />RECOMEÇO
          </h1>

          <p 
            className={`text-xl md:text-2xl lg:text-3xl font-medium transition-all duration-3000 delay-1000 ease-out ${
              showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } ${
              showBrightening 
                ? 'text-orange-700' 
                : 'text-white/90'
            }`}
            style={{
              textShadow: showBrightening 
                ? 'none' 
                : '0 0 20px rgba(0, 0, 0, 0.6)'
            }}
          >
            E todo recomeço é uma nova chance de brilhar ✨
          </p>

          <div 
            className={`mt-8 flex justify-center space-x-4 transition-all duration-2000 delay-1500 ease-out ${
              showText ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          >
            <div className={`w-16 h-1 ${showBrightening ? 'bg-orange-400' : 'bg-white/60'} rounded-full`}></div>
            <div className={`w-8 h-8 ${showBrightening ? 'bg-orange-400' : 'bg-white/60'} rounded-full`}></div>
            <div className={`w-16 h-1 ${showBrightening ? 'bg-orange-400' : 'bg-white/60'} rounded-full`}></div>
          </div>
        </div>
      </div>
    </>
  );
}
