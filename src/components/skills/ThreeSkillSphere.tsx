import React, { useEffect, useRef } from 'react';

const TAGS = [
  "React", "TypeScript", "Three.js", "WebGL", "Next.js", 
  "GLSL Shaders", "Tailwind CSS", "Data Structures", "Algorithms", 
  "C++", "Python", "System Design", "Node.js", "GraphQL", 
  "PostgreSQL", "Docker", "Vite", "Git", "OOP Design", "Networking",
  "HTML5 Canvas", "REST APIs", "Linux", "UI/UX Motion"
];

interface Tag3D {
  text: string;
  x: number;
  y: number;
  z: number;
  scale: number;
  alpha: number;
}

export const ThreeSkillSphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 450);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);
    const radius = Math.min(width, height) * 0.38;

    // Distribute tags uniformly on sphere using Fibonacci Spiral
    const count = TAGS.length;
    const tags: Tag3D[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      tags.push({
        text: TAGS[i],
        x: x * radius,
        y: y * radius,
        z: z * radius,
        scale: 1,
        alpha: 1,
      });
    }

    let angleX = 0.003;
    let angleY = 0.004;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      mouseX = x * 0.00008;
      mouseY = y * 0.00008;
    };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Rotate with mouse velocity
      const effectiveAngleX = angleX + mouseY;
      const effectiveAngleY = angleY + mouseX;

      const cosX = Math.cos(effectiveAngleX);
      const sinX = Math.sin(effectiveAngleX);
      const cosY = Math.cos(effectiveAngleY);
      const sinY = Math.sin(effectiveAngleY);

      // Sort by Z for proper depth rendering
      tags.sort((a, b) => a.z - b.z);

      tags.forEach((tag) => {
        // Rotate around Y
        const x1 = tag.x * cosY - tag.z * sinY;
        const z1 = tag.z * cosY + tag.x * sinY;

        // Rotate around X
        const y2 = tag.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + tag.y * sinX;

        tag.x = x1;
        tag.y = y2;
        tag.z = z2;

        // Perspective 3D calculation
        const fov = 350;
        const scale = fov / (fov + z2);
        const alpha = Math.max(0.2, (z2 + radius) / (2 * radius));

        const screenX = width / 2 + x1 * scale;
        const screenY = height / 2 + y2 * scale;

        // Draw Tag Pill
        const fontSize = Math.max(10, Math.floor(13 * scale));
        
        ctx.font = `600 ${fontSize}px "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const textMetrics = ctx.measureText(tag.text);
        const paddingX = 8 * scale;
        const paddingY = 4 * scale;
        const pillWidth = textMetrics.width + paddingX * 2;
        const pillHeight = fontSize + paddingY * 2;

        // Draw pill background
        ctx.beginPath();
        ctx.roundRect(
          screenX - pillWidth / 2,
          screenY - pillHeight / 2,
          pillWidth,
          pillHeight,
          6 * scale
        );

        if (z2 > 0) {
          ctx.fillStyle = `rgba(12, 17, 34, ${Math.min(0.9, alpha)})`;
          ctx.fill();
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.4})`;
          ctx.lineWidth = 1 * scale;
          ctx.stroke();

          // Text fill
          ctx.fillStyle = `rgba(224, 242, 254, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(15, 23, 42, ${alpha * 0.5})`;
          ctx.fill();
          ctx.fillStyle = `rgba(148, 163, 184, ${alpha * 0.6})`;
        }

        ctx.fillText(tag.text, screenX, screenY);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[450px] flex items-center justify-center rounded-2xl bg-cyber-card/60 backdrop-blur-xl border border-slate-800/80 overflow-hidden group">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>3D_SKILL_SPHERE // 360°</span>
      </div>

      <div className="absolute bottom-4 right-4 z-10 text-[10px] font-mono text-slate-500">
        Hover & move mouse to rotate
      </div>

      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
};
