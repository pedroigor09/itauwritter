'use client';

import { useState, useEffect } from 'react';

interface FadeTransitionProps {
  children: React.ReactNode;
  show: boolean;
  duration?: number;
  className?: string;
}

export default function FadeTransition({ 
  children, 
  show, 
  duration = 500,
  className = '' 
}: FadeTransitionProps) {
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`transition-all ease-in-out ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(10px)'
      }}
    >
      {children}
    </div>
  );
}
