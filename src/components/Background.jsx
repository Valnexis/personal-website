import { useEffect, useRef} from "react";

const draw = (ctx, canvas, points, mouse) => {
    ctx.clearReact(0, 0, canvas.width, canvas.height);

    points.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#444';
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
                ctx.strokeStyle = `rgba(80,80,80,${opacity})`;
                ctx.stroke();
            }
        }

        const mDist = Math.hypot(points[i].x - mouse.x, points[i].y - mouse.y);
        if (mDist < 120) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(80,80,80,${1 - mDist / 120})`;
            ctx.stroke();
        }
    }
};

const Background = () => {
    useEffect(() => {
        const canvas = document.createElement("canvas");
        canvas.id = 'bg-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = -1;
        canvas.style.pointerEvents = 'none';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';

        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const points = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let mouse = { x:0, y:0 };

        const createPoint = () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        })

        for (let i = 0; i < 100; i++) points.push(createPoint());

        document.addEventListener('mousemove', e => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        let animationFrameId;

        const startDrawing = () => {
            draw(ctx, canvas, points, mouse)
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