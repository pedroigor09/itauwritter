'use client';

import { useState, useEffect } from 'react';
import TypewriterEffect from './TypewriterEffect';
import { Message } from '@/types/sequences';

interface MessageSequenceProps {
  messages: Message[];
  onSequenceComplete?: () => void;
  onMessageProgress?: (messageIndex: number) => void;
  className?: string;
}

export default function MessageSequence({ 
  messages, 
  onSequenceComplete,
  onMessageProgress,
  className = ''
}: MessageSequenceProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleMessageComplete = () => {
    if (currentMessageIndex < messages.length - 1) {
      // Aguarda mais tempo antes de fazer a transição
      setTimeout(() => {
        setIsVisible(false);
        // Transição mais lenta para evitar flickering
        setTimeout(() => {
          const nextIndex = currentMessageIndex + 1;
          setCurrentMessageIndex(nextIndex);
          onMessageProgress?.(nextIndex);
          setIsVisible(true);
        }, 800); // Aumentado de 500ms para 800ms
      }, 3500); // Aumentado de 2000ms para 3500ms
    } else {
      // All messages completed
      setTimeout(() => {
        onSequenceComplete?.();
      }, 4000); // Aumentado de 3000ms para 4000ms
    }
  };

  useEffect(() => {
    setCurrentMessageIndex(0);
    setIsVisible(true);
    onMessageProgress?.(0);
  }, [messages]); // Removendo onMessageProgress das dependências

  if (!messages.length) return null;

  return (
    <div className={`min-h-[200px] flex items-center justify-center ${className}`}>
      <div 
        className={`max-w-4xl mx-auto px-6 transition-all duration-700 ease-in-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed md:leading-relaxed lg:leading-relaxed text-white font-normal tracking-tight">
          <TypewriterEffect
            text={messages[currentMessageIndex].text}
            speed={25} // Diminuindo um pouco a velocidade de digitação
            onComplete={handleMessageComplete}
            showCursor={true}
          />
        </p>
      </div>
    </div>
  );
}
