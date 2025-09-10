'use client';

import FadeTransition from './FadeTransition';

interface SequenceControlsProps {
  currentSequence: number;
  totalSequences: number;
  onPrevious: () => void;
  onNext: () => void;
  onSequenceSelect: (index: number) => void;
  isPlaying?: boolean;
}

export default function SequenceControls({
  currentSequence,
  totalSequences,
  onPrevious,
  onNext,
  onSequenceSelect,
  isPlaying = false
}: SequenceControlsProps) {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10">
      <FadeTransition show={true} duration={300}>
        <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-4 shadow-2xl border border-white/30">
          <div className="flex items-center gap-4">
            <button
              onClick={onPrevious}
              disabled={currentSequence === 0 || isPlaying}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110"
              aria-label="Sequência anterior"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-3" role="tablist" aria-label="Sequências de mensagens">
              {Array.from({ length: totalSequences }, (_, index) => (
                <button
                  key={index}
                  onClick={() => onSequenceSelect(index)}
                  disabled={isPlaying}
                  role="tab"
                  aria-selected={index === currentSequence}
                  aria-label={`Sequência ${index + 1}`}
                  className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
                    index === currentSequence
                      ? 'bg-white border-white shadow-lg scale-125'
                      : 'bg-white/30 border-white/50 hover:bg-white/50 hover:scale-110'
                  } disabled:cursor-not-allowed`}
                />
              ))}
            </div>

            <button
              onClick={onNext}
              disabled={currentSequence === totalSequences - 1 || isPlaying}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110"
              aria-label="Próxima sequência"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </FadeTransition>
    </div>
  );
}
