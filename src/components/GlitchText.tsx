'use client';

import { useEffect, useState } from 'react';

interface GlitchTextProps {
  children: string;
  className?: string;
}

export default function GlitchText({ children, className = '' }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 150);
    }, 3000 + Math.random() * 2000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      className={`
        relative inline-block font-bold
        ${isGlitching ? 'animate-glitch' : ''}
        ${className}
      `}
      style={{
        textShadow: isGlitching 
          ? `
            -2px 0 #ff0040,
            2px 0 #00ffff,
            0 0 10px #ffffff,
            0 0 20px #ffff00
          `
          : `
            0 0 8px rgba(255, 255, 255, 0.8),
            0 0 16px rgba(255, 255, 0, 0.6)
          `,
        color: isGlitching ? '#ffffff' : '#ffff99',
        filter: isGlitching ? 'brightness(1.5) contrast(1.2)' : 'brightness(1.1)',
        transition: 'all 0.1s ease-out'
      }}
    >
      {children}
      
      {isGlitching && (
        <>
          <span 
            className="absolute top-0 left-0 opacity-80"
            style={{
              color: '#ff0040',
              transform: 'translateX(-1px)',
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)'
            }}
          >
            {children}
          </span>
          <span 
            className="absolute top-0 left-0 opacity-80"
            style={{
              color: '#00ffff',
              transform: 'translateX(1px)',
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)'
            }}
          >
            {children}
          </span>
        </>
      )}

      <style jsx>{`
        @keyframes glitch {
          0% { transform: translateX(0); }
          10% { transform: translateX(-2px) skewX(-1deg); }
          20% { transform: translateX(2px) skewX(1deg); }
          30% { transform: translateX(-1px) skewX(-0.5deg); }
          40% { transform: translateX(1px) skewX(0.5deg); }
          50% { transform: translateX(-0.5px); }
          60% { transform: translateX(0.5px); }
          70% { transform: translateX(-0.25px); }
          80% { transform: translateX(0.25px); }
          90% { transform: translateX(-0.1px); }
          100% { transform: translateX(0); }
        }
        
        .animate-glitch {
          animation: glitch 0.15s ease-in-out;
        }
      `}</style>
    </span>
  );
}
