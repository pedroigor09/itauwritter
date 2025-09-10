'use client';

import { useEffect, useRef } from 'react';

interface FloatingParticlesProps {
  count?: number;
  progress: number;
}

export default function FloatingParticles({ count = 30, progress }: FloatingParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute pointer-events-none';
      
      const size = Math.random() * 4 + 2;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 10;
      const opacity = (Math.random() * 0.3 + 0.1) * (0.5 + progress * 0.5);

      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        background: radial-gradient(circle, rgba(255,255,255,${opacity}) 0%, rgba(255,220,180,${opacity * 0.7}) 50%, transparent 100%);
        border-radius: 50%;
        animation: float-particle ${duration}s ease-in-out infinite;
        animation-delay: ${delay}s;
        transform-origin: center center;
      `;

      container.appendChild(particle);
    }

    const style = document.createElement('style');
    style.textContent = `
      @keyframes float-particle {
        0%, 100% {
          transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        50% {
          transform: translateY(-30px) translateX(20px) rotate(180deg) scale(1.2);
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [count, progress]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
}
