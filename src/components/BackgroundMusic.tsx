'use client';

import { useEffect, useRef, useState } from 'react';
import { getAssetPath } from '@/utils/assets';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const attemptPlay = async () => {
    if (audioRef.current) {
      try {
        audioRef.current.volume = 0.2; 
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Autoplay bloqueado pelo navegador:', error);
      }
    }
  };

  useEffect(() => {
    // Tentativa inicial
    const initialAttempt = setTimeout(() => {
      attemptPlay();
    }, 1000);

    // Tentativas adicionais
    const retryAttempts = [2000, 3000, 5000].map(delay => 
      setTimeout(attemptPlay, delay)
    );

    const handleUserInteraction = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
        attemptPlay();
      }
    };

    // Eventos de interação do usuário
    const events = ['click', 'keydown', 'touchstart', 'scroll', 'mousemove'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      clearTimeout(initialAttempt);
      retryAttempts.forEach(clearTimeout);
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [hasUserInteracted]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.log);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        autoPlay
        muted={false}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onCanPlayThrough={attemptPlay}
      >
        <source src={getAssetPath('/music.mp3')} type="audio/mpeg" />
      </audio>

      {!isPlaying && (
        <div className="fixed top-4 left-4 z-50 animate-pulse">
          <button
            onClick={attemptPlay}
            className="bg-orange-500/80 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-orange-600/80 transition-all duration-300 text-sm font-medium shadow-lg"
            title="Clique para ativar música de fundo relaxante"
          >
            🎵 Música de Fundo
          </button>
        </div>
      )}

      {isPlaying && (
        <div className="fixed bottom-4 right-4 flex gap-2 z-50">
          <button
            onClick={togglePlay}
            className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300 text-sm"
            title={isPlaying ? "Pausar música" : "Tocar música"}
          >
            {isPlaying ? "⏸️" : "▶️"}
          </button>
          <button
            onClick={toggleMute}
            className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300 text-sm"
            title={isMuted ? "Reativar som" : "Silenciar"}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>
      )}
    </>
  );
}
