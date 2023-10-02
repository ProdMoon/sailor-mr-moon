import Effect from "./effect.js";

function generateAttributes() {
    const attr = {
        keyframes: [],
    };
    for (let i = 1; i <= 17; i++) {
        const img = new Image();
        img.src = `/src/assets/images/explode/${i}.png`;
        attr.keyframes.push({
            x: 0,
            y: 0,
            img: img,
            width: 120,
            height: 120,
            alpha: 1,
            duration: 3,
        });
    }
    attr.keyframes.push({
        x: 0,
        y: 0,
        img: new Image(),
        width: 0,
        height: 0,
        alpha: 0,
        duration: 25,
    });
    return attr;
}

export default class Collision extends Effect {
    constructor() {
        super(generateAttributes());
    }
}