'use client';

import { useEffect, useRef } from 'react';

interface FloatingBubble {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  direction: number;
}

interface AnimatedBubblesProps {
  progress: number; // 0 to 1, how much of the sequence is complete
}

export default function AnimatedBubbles({ progress }: AnimatedBubblesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<FloatingBubble[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize bubbles
    const bubbleCount = Math.min(50, Math.floor(window.innerWidth / 30));
    bubblesRef.current = Array.from({ length: bubbleCount }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 40 + 10,
      opacity: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.5 + 0.2,
      direction: Math.random() * Math.PI * 2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw bubbles
      bubblesRef.current.forEach((bubble) => {
        // Update position
        bubble.x += Math.cos(bubble.direction) * bubble.speed;
        bubble.y += Math.sin(bubble.direction) * bubble.speed;

        // Wrap around screen
        if (bubble.x > canvas.width + bubble.size) bubble.x = -bubble.size;
        if (bubble.x < -bubble.size) bubble.x = canvas.width + bubble.size;
        if (bubble.y > canvas.height + bubble.size) bubble.y = -bubble.size;
        if (bubble.y < -bubble.size) bubble.y = canvas.height + bubble.size;

        // Calculate dynamic opacity based on progress
        const dynamicOpacity = bubble.opacity * (0.3 + progress * 0.7);

        // Create gradient for 3D effect
        const gradient = ctx.createRadialGradient(
          bubble.x - bubble.size * 0.3,
          bubble.y - bubble.size * 0.3,
          0,
          bubble.x,
          bubble.y,
          bubble.size
        );
        
        gradient.addColorStop(0, `rgba(255, 255, 255, ${dynamicOpacity * 0.8})`);
        gradient.addColorStop(0.3, `rgba(255, 220, 180, ${dynamicOpacity * 0.6})`);
        gradient.addColorStop(0.7, `rgba(255, 180, 120, ${dynamicOpacity * 0.4})`);
        gradient.addColorStop(1, `rgba(255, 140, 80, ${dynamicOpacity * 0.2})`);

        // Draw bubble with 3D effect
        ctx.save();
        ctx.globalAlpha = dynamicOpacity;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Add subtle shadow for depth
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        ctx.shadowBlur = bubble.size * 0.3;
        ctx.shadowOffsetX = bubble.size * 0.1;
        ctx.shadowOffsetY = bubble.size * 0.1;
        
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
