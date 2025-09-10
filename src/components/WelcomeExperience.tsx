'use client';

import MessageSequence from '@/components/MessageSequence';
import ParallaxBackground from '@/components/ParallaxBackground';
import AnimatedBubbles from '@/components/AnimatedBubbles';
import FloatingParticles from '@/components/FloatingParticles';
import FloatingPolaroids from '@/components/FloatingPolaroids';
import BackgroundMusic from '@/components/BackgroundMusic';
import GrandFinale from '@/components/GrandFinale';
import { useMessageSequence } from '@/hooks/useMessageSequence';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function WelcomeExperience() {
  const {
    currentSequence,
    currentSequenceIndex,
    isSequencePlaying,
    showControls,
    showGrandFinale,
    progress,
    totalSequences,
    handleSequenceComplete,
    handleMessageProgress,
    handleSequenceChange,
    handlePrevious,
    handleNext
  } = useMessageSequence();

  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">

      <ParallaxBackground progress={progress} />
      
      {!prefersReducedMotion && <FloatingPolaroids progress={progress} currentSequence={currentSequenceIndex} />}
      
      {!prefersReducedMotion && <AnimatedBubbles progress={progress} />}
      
      {!prefersReducedMotion && <FloatingParticles progress={progress} count={25} />}
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="relative flex-1 flex items-center justify-center px-4 py-16 z-10">
          <div className="max-w-4xl mx-auto">
            <MessageSequence
              messages={currentSequence.messages}
              onSequenceComplete={handleSequenceComplete}
              onMessageProgress={handleMessageProgress}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="fixed top-4 right-4 z-30">
        <button
          onClick={() => handleSequenceChange(0)}
          disabled={isSequencePlaying}
          className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full border border-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Reiniciar experiência"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <BackgroundMusic />

      <GrandFinale isActive={showGrandFinale} />
    </div>
  );
}
