'use client';

import { useEffect } from 'react';

interface KeyboardHandlerProps {
  onPrevious: () => void;
  onNext: () => void;
  onPause?: () => void;
  disabled?: boolean;
}

export default function KeyboardHandler({
  onPrevious,
  onNext,
  onPause,
  disabled = false
}: KeyboardHandlerProps) {
  useEffect(() => {
    if (disabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
        case 'h':
          event.preventDefault();
          onPrevious();
          break;
        case 'ArrowRight':
        case 'l':
          event.preventDefault();
          onNext();
          break;
        case ' ':
        case 'p':
          event.preventDefault();
          onPause?.();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPrevious, onNext, onPause, disabled]);

  return null;
}
