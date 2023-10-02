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
    constructor(type, canvas, attributes) {
        if (!attributes) {
            attributes = {};
        }
        attributes.speed = attributes.speed ?? itemProperties[type].speed;
        attributes.radius = attributes.radius ?? itemProperties[type].radius;
        attributes.color = attributes.color ?? itemProperties[type].color;
        super(canvas, attributes);
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