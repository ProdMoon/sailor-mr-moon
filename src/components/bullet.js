const DEFAULT_COLOR = "#FFD700"; // gold
const DEFAULT_RADIUS = 5;
const DEFAULT_SPEED = 3;

export default class Bullet {
    constructor(canvas, speed, radius, color) {
        if (!canvas instanceof HTMLCanvasElement) {
            throw new Error("canvas must be an instance of HTMLCanvasElement");
        }
        this.canvas = canvas;
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.speed = DEFAULT_SPEED;
        if (typeof speed === "number") {
            this.speed = speed;
        }
        this.radius = DEFAULT_RADIUS;
        if (typeof radius === "number") {
            this.radius = radius;
        }
        this.color = DEFAULT_COLOR;
        if (typeof color === "string") {
            this.color = color;
        }
    
        this.generateRandomBullet();
    }

    generateRandomBullet() {
        const side = Math.floor(Math.random() * 4); // top: 0, right: 1, bottom: 2, left: 3
        switch (side) {
            case 0:
                this.x = Math.random() * this.canvas.width;
                this.y = -this.radius;
                this.angle = Math.random() * Math.PI + Math.PI / 2;
                break;
            case 1:
                this.x = this.canvas.width + this.radius;
                this.y = Math.random() * this.canvas.height;
                this.angle = Math.random() * Math.PI + Math.PI;
                break;
            case 2:
                this.x = Math.random() * this.canvas.width;
                this.y = this.canvas.height + this.radius;
                this.angle = Math.random() * Math.PI + (Math.PI * 3) / 2;
                break;
            case 3:
                this.x = -this.radius;
                this.y = Math.random() * this.canvas.height;
                this.angle = Math.random() * Math.PI;
                break;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }

    update() {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
    }

    setAngle(angle) {
        this.angle = angle;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    setPosition(x, y) {
        if (typeof x !== "number" || typeof y !== "number") {
            throw new Error("x and y must be numbers");
        }
        if (x < 0 - this.radius || this.canvas.width + this.radius < x) {
            throw new Error("x is out of range");
        }
        this.x = x;
        this.y = y;
    }

    isOffScreen(canvas) {
        return (
            this.x < 0 - this.radius ||
            this.x > canvas.width + this.radius ||
            this.y < 0 - this.radius ||
            this.y > canvas.height + this.radius
        );
    }

    isCollidingWithPlayer(player) {
        const dx = this.x - (player.x + player.size / 2);
        const dy = this.y - (player.y + player.size / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < this.radius + player.size / 2;
    }
}
