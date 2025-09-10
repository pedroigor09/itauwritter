'use client';

import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  speedY: number;
  speedX: number;
  rotationSpeed: number;
}

interface ConfettiProps {
  isActive: boolean;
}

export default function Confetti({ isActive }: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  const colors = [
    '#FFD700', // Dourado
    '#FF6B35', // Laranja
    '#F7931E', // Laranja Itaú
    '#FFFFFF', // Branco
    '#FFE55C', // Amarelo
    '#FF9500', // Laranja claro
    '#FFA500', // Laranja médio
  ];

  useEffect(() => {
    if (!isActive) return;

    const newPieces: ConfettiPiece[] = Array.from({ length: 150 }, (_, index) => ({
      id: index,
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 100,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      speedY: Math.random() * 3 + 2,
      speedX: (Math.random() - 0.5) * 2,
      rotationSpeed: (Math.random() - 0.5) * 10
    }));

    setPieces(newPieces);

    const interval = setInterval(() => {
      setPieces(prev => prev.map(piece => ({
        ...piece,
        x: piece.x + piece.speedX,
        y: piece.y + piece.speedY,
        rotation: piece.rotation + piece.rotationSpeed
      })).filter(piece => piece.y < window.innerHeight + 50));
    }, 16);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setPieces([]);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isActive]);

  if (!isActive || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
      {pieces.map(piece => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}px`,
            top: `${piece.y}px`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            opacity: 0.9
          }}
        />
      ))}
    </div>
  );
}
