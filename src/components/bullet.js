import Particle from "./particle.js";

const DEFAULT_COLOR = "#FFD700"; // gold
const DEFAULT_RADIUS = 5;
const DEFAULT_SPEED = 3;

export default class Bullet extends Particle {
    constructor(canvas, speed, radius, color) {
        speed = speed ?? DEFAULT_SPEED;
        radius = radius ?? DEFAULT_RADIUS;
        color = color ?? DEFAULT_COLOR;
        super(canvas, speed, radius, color);
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }

    isInRangeOfPlayer(player, radius) {
        const dx = this.x - (player.x + player.size / 2);
        const dy = this.y - (player.y + player.size / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < radius;
    }
}
