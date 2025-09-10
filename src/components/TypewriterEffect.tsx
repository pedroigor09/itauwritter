'use client';

import { useState, useEffect, useCallback } from 'react';

interface TypewriterEffectProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  showCursor?: boolean;
}

export default function TypewriterEffect({ 
  text, 
  speed = 50, 
  onComplete, 
  showCursor = true 
}: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursorBlink, setShowCursorBlink] = useState(true);
  const [hasCompleted, setHasCompleted] = useState(false);

  // Memoizar onComplete para evitar re-execuções
  const handleComplete = useCallback(() => {
    if (!hasCompleted) {
      setHasCompleted(true);
      onComplete?.();
    }
  }, [hasCompleted, onComplete]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length && !hasCompleted) {
      // Aguarda um pouco antes de chamar onComplete para evitar flickering
      const timeout = setTimeout(() => {
        handleComplete();
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, handleComplete, hasCompleted]);

  useEffect(() => {
    // Reset quando o texto muda
    setDisplayedText('');
    setCurrentIndex(0);
    setHasCompleted(false);
  }, [text]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursorBlink(prev => !prev);
    }, 600);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="inline-block">
      {displayedText}
      {showCursor && (
        <span 
          className={`inline-block w-0.5 h-6 md:h-7 lg:h-8 bg-white ml-1 transition-opacity duration-100 ${
            showCursorBlink ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </span>
  );
}
