import Particle from "./particle.js";
import Effect from "./effect.js";

const shieldItemImg = new Image();
shieldItemImg.src = "/src/assets/images/shield-item.png";

const itemProperties = {
    shield: {
        img: shieldItemImg,
        radius: 8,
        speed: 1,
        behavior: shieldBehavior,
        duration: 8,
    },
}

function shieldEffect() {
    const shieldImg = new Image();
    shieldImg.src = "/src/assets/images/shield.png";
    const effect = new Effect({
        keyframes: [
            {
                x: 0,
                y: 0,
                img: shieldImg,
                width: 200,
                height: 200,
                alpha: 0.5,
                duration: 2,
            },
            {
                x: 0,
                y: 0,
                img: shieldImg,
                width: 200,
                height: 200,
                alpha: 0.35,
                duration: 2,
            },
            {
                x: 0,
                y: 0,
                img: shieldImg,
                width: 200,
                height: 200,
                alpha: 0.5,
                duration: 2,
            },
            {
                x: 0,
                y: 0,
                img: shieldImg,
                width: 200,
                height: 200,
                alpha: 0.35,
                duration: 2,
            },
        ],
    });
    return effect;
}

function shieldBehavior(player, slot) {
    const bullets = slot.bullets;
    for (let i = bullets.length - 1; i >= 0; i--) {
        if (bullets[i].isInRangeOfPlayer(player, 100)) {
            bullets.splice(i, 1);
        }
    }
    if (!slot.effect) {
        slot.effect = shieldEffect();
    }
}

export default class Item extends Particle {
    constructor(type, canvas, attributes) {
        if (!attributes) {
            attributes = {};
        }
        attributes.speed = attributes.speed ?? itemProperties[type].speed;
        attributes.radius = attributes.radius ?? itemProperties[type].radius;
        super(canvas, attributes);
        this.type = type;
        this.behavior = itemProperties[type].behavior;
        this.duration = attributes.duration ?? itemProperties[type].duration;
        this.img = itemProperties[type].img;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2)
    }
}