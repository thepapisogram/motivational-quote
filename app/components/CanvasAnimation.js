import { useEffect, useRef } from "react";

const CanvasAnimation = () => {
    const canvasRef = useRef(null);
    const circlesRef = useRef([]);
    const mouseRef = useRef({ x: undefined, y: undefined });
    const colors = ["#B2C9AD", "#91AC8F", "#66785F", "#4B5945"];
    const maxRadius = 40;

    // Initialize circles
    const init = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const circles = [];
        const context = canvas.getContext("2d");
        if (!context) return;

        const { innerWidth, innerHeight } = window;
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        canvas.style.background = "linear-gradient(to right, #14532d, #164e63)";

        for (let i = 0; i < 100; i++) {
            const radius = Math.floor(Math.random() * 30);
            const x = Math.random() * (innerWidth - radius * 2) + radius;
            const y = Math.random() * (innerHeight - radius * 2) + radius;
            const dx = (Math.random() - 0.5) * 4;
            const dy = (Math.random() - 0.5) * 4;
            const color = colors[Math.floor(Math.random() * colors.length)];

            circles.push(new Circle(x, y, dx, dy, radius, color, context));
        }

        circlesRef.current = circles;
    };

    // Circle class
    function Circle(x, y, dx, dy, radius, color, context) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = color;
        this.context = context;

        this.draw = function () {
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            this.context.fillStyle = this.color;
            this.context.fill();
            this.context.strokeStyle = "black";
            this.context.stroke();
        };

        this.update = function (mouse) {
            const { innerWidth, innerHeight } = window;

            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }

            if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }

            this.x += this.dx;
            this.y += this.dy;

            if (
                mouse.x &&
                mouse.y &&
                mouse.x - this.x < 50 &&
                mouse.x - this.x > -50 &&
                mouse.y - this.y < 50 &&
                mouse.y - this.y > -50
            ) {
                if (this.radius < maxRadius) {
                    this.radius += 1;
                }
            } else if (this.radius > this.minRadius) {
                this.radius -= 1;
            }

            this.draw();
        };
    }

    // Animation loop
    const animate = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const { innerWidth, innerHeight } = window;
        context.clearRect(0, 0, innerWidth, innerHeight);

        circlesRef.current.forEach((circle) =>
            circle.update(mouseRef.current)
        );

        requestAnimationFrame(animate);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Initialize circles and start animation
        init();
        animate();

        // Mouse move listener
        const handleMouseMove = (event) => {
            mouseRef.current.x = event.x;
            mouseRef.current.y = event.y;
        };

        // Resize listener
        const handleResize = () => {
            init();
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        // Cleanup on unmount
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ background: "white" }} />;
};

export default CanvasAnimation;