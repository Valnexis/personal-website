import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Mouse {
  x: number;
  y: number;
}

interface BackgroundProps {
  theme?: 'light' | 'dark';
}

const draw = (
  ctx: CanvasRenderingContext2D, 
  canvas: HTMLCanvasElement, 
  points: Point[], 
  mouse: Mouse, 
  themeRef: React.MutableRefObject<'light' | 'dark' | undefined>
): void => {
  const currentTheme = themeRef.current;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  points.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
    if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = currentTheme === 'dark' ? '#ccc' : '#444';
    ctx.fill();
  });

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const a = points[i];
      const b = points[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 100) {
        const opacity = 1 - dist / 100;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = currentTheme === 'dark'
          ? `rgba(200,200,200,${opacity})`
          : `rgba(80,80,80,${opacity})`;
        ctx.stroke();
      }
    }

    const mDist = Math.hypot(points[i].x - mouse.x, points[i].y - mouse.y);
    if (mDist < 120) {
      ctx.beginPath();
      ctx.moveTo(points[i].x, points[i].y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.strokeStyle = currentTheme === 'dark'
        ? `rgba(200,200,200,${1 - mDist / 120})`
        : `rgba(80,80,80,${1 - mDist / 120})`;
      ctx.stroke();
    }
  }
};

const Background: React.FC<BackgroundProps> = ({ theme }) => {
  const themeRef = useRef<'light' | 'dark' | undefined>(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';

    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get canvas context');
      return;
    }

    const points: Point[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let mouse: Mouse = { x: 0, y: 0 };

    const createPoint = (): Point => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    });

    for (let i = 0; i < 100; i++) points.push(createPoint());

    document.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    let animationFrameId: number;

    const startDrawing = () => {
      draw(ctx, canvas, points, mouse, themeRef);
      animationFrameId = requestAnimationFrame(startDrawing);
    };

    startDrawing();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.body.removeChild(canvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return null;
};

export default Background;