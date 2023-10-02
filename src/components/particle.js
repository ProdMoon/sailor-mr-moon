export default class Particle {
    constructor(canvas, attributes) {
        if (!canvas instanceof HTMLCanvasElement) {
            throw new Error("canvas must be an instance of HTMLCanvasElement");
        }
        if (!attributes) {
            attributes = {};
        }
        this.canvas = canvas;
        this.x = 0;
        if (typeof attributes.x === "number") {
            this.x = attributes.x;
        }
        this.y = 0;
        if (typeof attributes.y === "number") {
            this.y = attributes.y;
        }
        this.angle = 0;
        if (typeof attributes.angle === "number") {
            this.angle = attributes.angle;
        }
        this.speed = 1;
        if (typeof attributes.speed === "number") {
            this.speed = attributes.speed;
        }
        this.radius = 10;
        if (typeof attributes.radius === "number") {
            this.radius = attributes.radius;
        }
        this.color = '#000';
        if (typeof attributes.color === "string") {
            this.color = attributes.color;
        }
    
        if (!this.x && !this.y && !this.angle) {
            this.generateRandomParticle();
        }
    }

    generateRandomParticle() {
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