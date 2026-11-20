import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: 'petal' | 'heart';
}

export const PetalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(Math.floor(width / 25), 45);
    const particles: Petal[] = [];

    const createParticle = (initialY?: number): Petal => ({
      x: Math.random() * width,
      y: initialY !== undefined ? initialY : Math.random() * height,
      size: Math.random() * 8 + 8,
      speedY: Math.random() * 0.8 + 0.5,
      speedX: (Math.random() - 0.5) * 0.6,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      opacity: Math.random() * 0.45 + 0.25,
      type: Math.random() > 0.3 ? 'petal' : 'heart',
    });

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    const drawPetal = (x: number, y: number, size: number, angle: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.globalAlpha = opacity;

      const gradient = ctx.createRadialGradient(0, 0, 1, 0, 0, size);
      gradient.addColorStop(0, '#FF4081');
      gradient.addColorStop(0.6, '#E91E63');
      gradient.addColorStop(1, '#880E4F');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.8, -size * 0.8, size * 0.9, size * 0.4, 0, size);
      ctx.bezierCurveTo(-size * 0.9, size * 0.4, -size * 0.8, -size * 0.8, 0, -size);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.7);
      ctx.lineTo(0, size * 0.6);
      ctx.stroke();

      ctx.restore();
    };

    const drawHeart = (x: number, y: number, size: number, angle: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.globalAlpha = opacity * 0.85;

      ctx.fillStyle = '#E91E63';
      ctx.shadowColor = 'rgba(233, 30, 99, 0.4)';
      ctx.shadowBlur = 6;

      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, (size + topCurveHeight) / 1.5, 0, size);
      ctx.bezierCurveTo(0, (size + topCurveHeight) / 1.5, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    let swayAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      swayAngle += 0.015;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(swayAngle + p.size) * 0.4;
        p.rotation += p.rotationSpeed;

        if (p.type === 'petal') {
          drawPetal(p.x, p.y, p.size, p.rotation, p.opacity);
        } else {
          drawHeart(p.x, p.y, p.size * 0.8, p.rotation, p.opacity);
        }

        if (p.y > height + 20) {
          particles[i] = createParticle(-20);
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      style={{ opacity: 0.85 }}
    />
  );
};
