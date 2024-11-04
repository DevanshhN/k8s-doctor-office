// src/components/CanvasBackground.js
import React, { useEffect } from 'react';
import './../index.css'; // Import your CSS file

const CanvasBackground = () => {
    useEffect(() => {
        const canvas = document.getElementById('test');
        const ctx = canvas.getContext('2d');
        const w = window.innerWidth;
        const h = window.innerHeight;
        const rate = 60;
        const arc = 100;
        let time = 0;
        let count = 0;
        const size = 7;
        const speed = 20;
        const parts = [];
        const colors = ['red', '#f57900', 'yellow', '#ce5c00', '#5c3566'];
        const mouse = { x: 0, y: 0 };

        canvas.setAttribute('width', w);
        canvas.setAttribute('height', h);

        function create() {
            time = 0;
            count = 0;

            for (let i = 0; i < arc; i++) {
                parts[i] = {
                    x: Math.ceil(Math.random() * w),
                    y: Math.ceil(Math.random() * h),
                    toX: Math.random() * 5 - 1,
                    toY: Math.random() * 2 - 1,
                    c: colors[Math.floor(Math.random() * colors.length)],
                    size: Math.random() * size,
                };
            }
        }

        function particles() {
            ctx.clearRect(0, 0, w, h);
            canvas.addEventListener('mousemove', MouseMove, false);
            for (let i = 0; i < arc; i++) {
                const li = parts[i];
                const distanceFactor = Math.max(Math.min(15 - (DistanceBetween(mouse, parts[i]) / 10), 10), 1);
                ctx.beginPath();
                ctx.arc(li.x, li.y, li.size * distanceFactor, 0, Math.PI * 2, false);
                ctx.fillStyle = li.c;
                ctx.strokeStyle = li.c;
                if (i % 2 === 0) ctx.stroke();
                else ctx.fill();

                li.x = li.x + li.toX * (time * 0.05);
                li.y = li.y + li.toY * (time * 0.05);

                if (li.x > w) li.x = 0;
                if (li.y > h) li.y = 0;
                if (li.x < 0) li.x = w;
                if (li.y < 0) li.y = h;
            }
            if (time < speed) time++;
            setTimeout(particles, 1000 / rate);
        }

        function MouseMove(e) {
            mouse.x = e.layerX;
            mouse.y = e.layerY;
        }

        function DistanceBetween(p1, p2) {
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            return Math.sqrt(dx * dx + dy * dy);
        }

        create();
        particles();
        
        // Cleanup function to remove event listeners when the component unmounts
        return () => {
            canvas.removeEventListener('mousemove', MouseMove);
        };
    }, []);

    return <canvas id="test"></canvas>;
};

export default CanvasBackground;
