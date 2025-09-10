'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface PolaroidData {
  id: number;
  image: string;
  caption: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  floatOffsetY: number;
  floatOffsetX: number;
  floatSpeed: number;
  rotationSpeed: number;
  driftX: number;
  driftY: number;
  floatX?: number;
  floatY?: number;
}

interface FloatingPolaroidsProps {
  progress?: number;
  currentSequence?: number;
}

const polaroidTexts = [
  { caption: "Somos mais que números" },
  { caption: "20 anos de dedicação" },
  { caption: "Nosso valor não se perdeu" },
  { caption: "Juntos somos mais fortes" },
  { caption: "Nossos sonhos não acabaram" },
  { caption: "Recomeço com esperança" },
  { caption: "Unidos pela mudança" },
  { caption: "Valor além do trabalho" },
  { caption: "Futuro brilhante nos espera" },
  { caption: "Coragem para seguir" },
  { caption: "Histórias que inspiram" },
  { caption: "Força em cada passo" }
];

export default function FloatingPolaroids({ progress = 0, currentSequence = 0 }: FloatingPolaroidsProps) {
  const [polaroids, setPolaroids] = useState<PolaroidData[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  const isLastSequence = currentSequence >= 3;
  const finalOpacity = isLastSequence ? 'opacity-60 hover:opacity-80' : 'opacity-20 hover:opacity-50';
  const finalScale = isLastSequence ? 1.2 : 1;

  useEffect(() => {
    const newPolaroids: PolaroidData[] = Array.from({ length: 12 }, (_, index) => ({
      id: index + 1,
      image: `/img/itau${index + 1}.png`,
      caption: polaroidTexts[index].caption,
      x: Math.random() * 80 + 10, 
      y: Math.random() * 80 + 10,
      rotation: (Math.random() - 0.5) * 15, 
      scale: Math.random() * 0.2 + 0.7,
      floatOffsetY: Math.random() * Math.PI * 2,
      floatOffsetX: Math.random() * Math.PI * 2,
      floatSpeed: Math.random() * 0.008 + 0.005, 
      rotationSpeed: (Math.random() - 0.5) * 0.05,
      driftX: 0,
      driftY: 0
    }));

    setPolaroids(newPolaroids);
    
    setTimeout(() => setIsVisible(true), 3000);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const animate = () => {
      timeRef.current += 0.016;

      setPolaroids(prev => prev.map(polaroid => {
        const floatY = Math.sin(timeRef.current * polaroid.floatSpeed + polaroid.floatOffsetY) * 12;
        const floatX = Math.cos(timeRef.current * polaroid.floatSpeed * 1.3 + polaroid.floatOffsetX) * 8;

        return {
          ...polaroid,
          floatX,
          floatY
        };
      }));

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {polaroids.map((polaroid) => (
        <div
          key={polaroid.id}
          className={`absolute transition-opacity duration-3000 ease-out ${
            isVisible ? finalOpacity : 'opacity-0'
          }`}
          style={{
            left: `${polaroid.x}%`,
            top: `${polaroid.y}%`,
            transform: `
              translate(-50%, -50%) 
              translate(${polaroid.floatX || 0}px, ${polaroid.floatY || 0}px)
              rotate(${polaroid.rotation}deg) 
              scale(${polaroid.scale * finalScale})
            `,
            transition: 'opacity 3s ease-out, transform 1s ease-out'
          }}
        >
          <div 
            className="polaroid-card bg-white/85 backdrop-blur-sm rounded-lg shadow-xl p-3 border border-white/20 hover:shadow-2xl transition-all duration-500"
            style={{
              width: '180px',
              filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15))',
              willChange: 'transform'
            }}
          >
            <div className="relative w-full h-28 bg-gradient-to-br from-orange-100 to-orange-200 rounded overflow-hidden mb-3">
              <Image
                src={polaroid.image}
                alt={`Relato ${polaroid.id}`}
                fill
                className="object-cover opacity-80"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(255, 180, 120, 0.3), 
                    rgba(255, 140, 80, 0.3))`
                }}
              />
            </div>
            
            <div className="text-center">
              <p className="text-sm font-medium text-gray-800 leading-tight">
                &ldquo;{polaroid.caption}&rdquo;
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
