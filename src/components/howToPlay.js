const story = [
    "Mr. Moon was sailing on the sea.",
    "Suddenly, a storm came and he was lost.",
    "When he woke up, bunch of bullets were flying towards him.",
    "And the boss kraken also appeared...",
    "Help Mr. Moon to survive!",
]

const keyInfo = [
    {
        key: "Arrow keys",
        description: "Move Mr. Moon",
    },
    {
        key: "Z key",
        description: "Shield item",
    },
    {
        key: "Shift + Double Tap Arrow Key",
        description: "Dash",
    },
]

export default class HowToPlay {
    constructor(canvas) {
        this.canvas = canvas;
    }

    draw(ctx) {
        ctx.fillStyle = "#000";
        ctx.font = "20px PixeloidSansBold";
        ctx.textAlign = "center";
        ctx.fillText("How To Play", this.canvas.width / 2, 50);

        ctx.font = "18px PixeloidSans";
        ctx.textAlign = "left";
        let y = 100;
        for (let i = 0; i < story.length; i++) {
            ctx.fillText(story[i], 100, y);
            y += 40;
        }

        ctx.font = "18px PixeloidSans";
        y += 40;
        for (let i = 0; i < keyInfo.length; i++) {
            ctx.textAlign = "right";
            ctx.fillText(keyInfo[i].key, 380, y);
            ctx.textAlign = "left";
            ctx.fillText(":", 400, y);
            ctx.fillText(keyInfo[i].description, 420, y);
            y += 40;
        }

        ctx.font = "15px PixeloidSans";
        ctx.textAlign = "center";
        ctx.fillText("Click anywhere to go back", this.canvas.width / 2, this.canvas.height - 100);
        ctx.textAlign = "left";
    }
}