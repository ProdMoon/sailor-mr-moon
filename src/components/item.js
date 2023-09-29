import Particle from "./particle.js";

const itemProperties = {
    bomb: {
        color: "red",
        radius: 8,
        speed: 1,
        behavior: bombBehavior,
    },
}

function bombBehavior(player, bullets) {
    for (let i = bullets.length - 1; i >= 0; i--) {
        if (bullets[i].isInRangeOfPlayer(player, 100)) {
            bullets.splice(i, 1);
        }
    }
}

export default class Item extends Particle {
    constructor(type, canvas, speed, radius, color) {
        speed = speed ?? itemProperties[type].speed;
        radius = radius ?? itemProperties[type].radius;
        color = color ?? itemProperties[type].color;
        super(canvas, speed, radius, color);
        this.type = type;
        this.behavior = itemProperties[type].behavior;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }
}