'use client';

import MessageSequence from '@/components/MessageSequence';
import SequenceControls from '@/components/SequenceControls';
import KeyboardHandler from '@/components/KeyboardHandler';
import ParallaxBackground from '@/components/ParallaxBackground';
import AnimatedBubbles from '@/components/AnimatedBubbles';
import FloatingParticles from '@/components/FloatingParticles';
import { useMessageSequence } from '@/hooks/useMessageSequence';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function WelcomeExperience() {
  const {
    currentSequence,
    currentSequenceIndex,
    isSequencePlaying,
    showControls,
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
      {/* Keyboard Navigation */}
      <KeyboardHandler
        onPrevious={handlePrevious}
        onNext={handleNext}
        disabled={isSequencePlaying}
      />

      {/* Enhanced Background with Parallax */}
      <ParallaxBackground progress={progress} />
      
      {/* Animated 3D Bubbles - only if motion is not reduced */}
      {!prefersReducedMotion && <AnimatedBubbles progress={progress} />}
      
      {/* Floating Particles - only if motion is not reduced */}
      {!prefersReducedMotion && <FloatingParticles progress={progress} count={25} />}
      
      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Main Content */}
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

        {/* Controls */}
        {showControls && (
          <div className="relative z-20">
            <SequenceControls
              currentSequence={currentSequenceIndex}
              totalSequences={totalSequences}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSequenceSelect={handleSequenceChange}
              isPlaying={isSequencePlaying}
            />
          </div>
        )}

        {/* Instructions */}
        {showControls && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
            <div className="backdrop-blur-sm bg-white/10 rounded-full px-4 py-2 border border-white/20">
              <p className="text-white/80 text-sm text-center font-light">
                Use ← → ou os controles para navegar
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button for Restart */}
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
    </div>
  );
}
