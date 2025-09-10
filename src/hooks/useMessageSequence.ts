'use client';

import { useState, useEffect, useCallback } from 'react';
import { messageSequences, Sequence } from '@/types/sequences';

export function useMessageSequence() {
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isSequencePlaying, setIsSequencePlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentSequence = messageSequences[currentSequenceIndex];

  const handleSequenceComplete = useCallback(() => {
    setIsSequencePlaying(false);
    setShowControls(true);
  }, []);

  const handleMessageProgress = useCallback((messageIndex: number) => {
    setCurrentMessageIndex(messageIndex);
    // Calcular progresso diretamente aqui para evitar dependência circular
    const totalMessages = messageSequences.reduce((acc, seq) => acc + seq.messages.length, 0);
    const completedMessages = messageSequences
      .slice(0, currentSequenceIndex)
      .reduce((acc, seq) => acc + seq.messages.length, 0) + messageIndex;
    
    setProgress(Math.min(completedMessages / totalMessages, 1));
  }, [currentSequenceIndex]);

  const handleSequenceChange = useCallback((newIndex: number) => {
    if (newIndex >= 0 && newIndex < messageSequences.length && newIndex !== currentSequenceIndex) {
      setCurrentSequenceIndex(newIndex);
      setCurrentMessageIndex(0);
      setIsSequencePlaying(true);
      setShowControls(false);
      
      // Recalcular progresso para nova sequência
      const totalMessages = messageSequences.reduce((acc, seq) => acc + seq.messages.length, 0);
      const completedMessages = messageSequences
        .slice(0, newIndex)
        .reduce((acc, seq) => acc + seq.messages.length, 0);
      
      setProgress(Math.min(completedMessages / totalMessages, 1));
    }
  }, [currentSequenceIndex]);

  const handlePrevious = useCallback(() => {
    handleSequenceChange(currentSequenceIndex - 1);
  }, [currentSequenceIndex, handleSequenceChange]);

  const handleNext = useCallback(() => {
    handleSequenceChange(currentSequenceIndex + 1);
  }, [currentSequenceIndex, handleSequenceChange]);

  // Initialize
  useEffect(() => {
    setIsSequencePlaying(true);
    setShowControls(false);
    setCurrentMessageIndex(0);
    setProgress(0);
  }, []);

  return {
    currentSequence,
    currentSequenceIndex,
    currentMessageIndex,
    isSequencePlaying,
    showControls,
    progress,
    totalSequences: messageSequences.length,
    handleSequenceComplete,
    handleMessageProgress,
    handleSequenceChange,
    handlePrevious,
    handleNext
  };
}
