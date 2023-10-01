const oceanBackground = [];

for (let i = 1; i <= 21; i++) {
    const image = new Image();
    image.src = `/src/assets/images/ocean/ocean${i}.png`;
    oceanBackground.push(image);
}

export default class Background {
    constructor(canvas) {
        this.canvas = canvas;
        this.img = oceanBackground[0];
        this.index = 0;
    }

    update(elapsedFrames) {
        if (elapsedFrames % 3 === 0) {
            this.index = (this.index + 1) % oceanBackground.length;
            this.img = oceanBackground[this.index];
        }
    }

    draw(ctx) {
        ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
    }
}