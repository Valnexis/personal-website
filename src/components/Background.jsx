import { useEffect, useRef, memo } from 'react';

/**
 * Background component that creates an animated canvas with connecting points
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.theme='light'] - The theme to use for the background ('light' or 'dark')
 * @returns {null} This component doesn't render any visible JSX
 */
const Background = ({ theme = 'light' }) => {
    const themeRef = useRef(theme);

    useEffect(() => {
        themeRef.current = theme; // Update on theme change
    }, [theme]);

    useEffect(() => {
        const canvas = document.createElement('canvas');
        canvas.id = 'bg-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = 0;
        canvas.style.left = 0;
        canvas.style.zIndex = -1;
        canvas.style.pointerEvents = 'none';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        // Hide canvas from screen readers as it's purely decorative
        canvas.setAttribute('aria-hidden', 'true');
        canvas.setAttribute('role', 'presentation');

        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const points = [];

        /**
         * Draws the points and connecting lines on the canvas
         * 
         * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
         * @param {HTMLCanvasElement} canvas - The canvas element
         * @param {Array<Object>} points - Array of points to draw
         * @param {Object} mouse - Current mouse position
         * @param {React.MutableRefObject} themeRef - Reference to the current theme
         */
        const draw = (ctx, canvas, points, mouse, themeRef) => {
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

        /**
         * Adjusts the canvas dimensions to match the window size
         */
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        let mouse = { x: 0, y: 0 };

        /**
         * Creates a new point with random position and velocity
         * 
         * @returns {Object} A point object with x, y coordinates and vx, vy velocities
         */
        const createPoint = () => ({
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

        let animationFrameId;

        /**
         * Initiates the animation loop using requestAnimationFrame
         */
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
    }, []); // Empty dependency array ensures this effect runs only once

    return null;
};

export default memo(Background);
