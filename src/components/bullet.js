import Particle from "./particle.js";

const DEFAULT_COLOR = "#FFD700"; // gold
const DEFAULT_RADIUS = 5;
const DEFAULT_SPEED = 3;

export default class Bullet extends Particle {
    constructor(canvas, attributes) {
        if (!attributes) {
            attributes = {};
        }
        attributes.speed = attributes.speed ?? DEFAULT_SPEED;
        attributes.radius = attributes.radius ?? DEFAULT_RADIUS;
        attributes.color = attributes.color ?? DEFAULT_COLOR;
        super(canvas, attributes);
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
