const creditInfo = [
    {
        title: "Developed by",
        name: "Moon Junho, aka ProdMoon",
        link: "https://github.com/ProdMoon",
    },
    {
        title: "Art - Ocean Animation Background",
        name: "Zabin, zookeeper",
    },
    {
        title: "Art - Boss Kraken Animation",
        name: "Spring",
    },
    {
        title: "Art - Shield Effect",
        name: "Bonsaiheldin",
    },
    {
        title: "Art - Explosion Effect Animation",
        name: "floatvoid",
    },
    {
        title: "Art - Sea Background",
        name: "kmm625",
    },
]

export default class Credits {
    constructor(canvas) {
        this.canvas = canvas;
    }

    draw(ctx) {
        ctx.fillStyle = "#000";
        ctx.font = "20px PixeloidSansBold";
        ctx.textAlign = "center";
        ctx.fillText("Credits", this.canvas.width / 2, 50);

        ctx.font = "15px PixeloidSans";
        ctx.textAlign = "left";
        let y = 100;
        for (let i = 0; i < creditInfo.length; i++) {
            ctx.fillText(creditInfo[i].title, 100, y);
            ctx.fillText(creditInfo[i].name, 420, y);
            if (creditInfo[i].link) {
                y += 30;
                ctx.fillText(creditInfo[i].link, 420, y);
            }
            y += 40;
        }
        y += 40;
        ctx.fillText("See html file for more details", 100, y);

        ctx.font = "15px PixeloidSans";
        ctx.textAlign = "center";
        ctx.fillText("Click anywhere to go back", this.canvas.width / 2, this.canvas.height - 100);
        ctx.textAlign = "left";
    }
}