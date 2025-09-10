'use client';

import { useEffect, useRef, useState } from 'react';

interface ParallaxBackgroundProps {
  progress: number; 
  className?: string;
}

export default function ParallaxBackground({ progress, className = '' }: ParallaxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getGradientColors = () => {
    const orangeIntensity = Math.max(0.3, 1 - progress * 0.7);
    const lightness = 0.2 + progress * 0.3;
    
    return {
      start: `hsl(25, 80%, ${lightness * 100}%)`,
      middle: `hsl(30, 70%, ${(lightness + 0.1) * 100}%)`,
      end: `hsl(40, 60%, ${(lightness + 0.3) * 100}%)`,
    };
  };

  const colors = getGradientColors();

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
    >
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${colors.start} 0%, ${colors.middle} 50%, ${colors.end} 100%)`,
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                       radial-gradient(circle at 80% 70%, rgba(255, 200, 100, 0.2) 0%, transparent 50%),
                       radial-gradient(circle at 40% 90%, rgba(255, 150, 50, 0.1) 0%, transparent 50%)`,
          transform: `translateY(${scrollY * 0.2}px) scale(${1 + progress * 0.1})`,
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `conic-gradient(from 45deg at 50% 50%, 
                       transparent 0deg, 
                       rgba(255, 255, 255, 0.1) 30deg, 
                       transparent 60deg, 
                       rgba(255, 200, 100, 0.1) 90deg, 
                       transparent 120deg,
                       rgba(255, 255, 255, 0.1) 150deg,
                       transparent 180deg)`,
          transform: `translateY(${scrollY * 0.05}px) rotate(${progress * 45}deg)`,
          transformOrigin: 'center center',
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${20 + (i % 3) * 30}px`,
              height: `${20 + (i % 3) * 30}px`,
              background: `rgba(255, 255, 255, ${0.1 + (i % 2) * 0.1})`,
              left: `${(i * 73) % 100}%`,
              top: `${(i * 47) % 100}%`,
              transform: `
                translateY(${Math.sin(progress * Math.PI + i) * 20}px)
                translateX(${Math.cos(progress * Math.PI + i) * 15}px)
                scale(${0.8 + Math.sin(progress * Math.PI * 2 + i) * 0.3})
              `,
              animation: `float-${i % 3} ${8 + (i % 4)}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(90deg); }
        }
      `}</style>
    </div>
  );
}
