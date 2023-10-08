export default class Leaderboard {
    constructor(canvas) {
        this.canvas = canvas;
        this.data = null;
        this.message = "Loading...";
        this.skip = 0;
        this.take = 10;
    }

    async getLeaderboardData(skip, take) {
        this.message = "Loading...";
        this.data = null;
        if (!skip || skip < 0) {
            skip = 0;
        }
        if (!take || take < 0) {
            take = 10;
        }
        this.skip = skip;
        this.take = take;
        try {
            const response = await fetch(`https://sailor-mr-moon-api.azurewebsites.net/Leaderboard/Get?skip=${skip}&take=${take}`);
            const json = await response.json();
            this.data = json.result;
        } catch (err) {
            this.data = null;
            this.message = "Temporary Server Error. Please try again.";
        }
    }

    draw(ctx) {
        ctx.fillStyle = "#000";
        ctx.font = "30px PixeloidSansBold";
        ctx.textAlign = "center";
        ctx.fillText("Leaderboard", this.canvas.width / 2, 50);

        if (this.data) {
            ctx.font = "20px PixeloidSans";
            ctx.fillText("Rank", 180, 100);
            ctx.fillText("Name", 400, 100);
            ctx.fillText("Score", 620, 100);
            ctx.font = "15px PixeloidSans";
            for (let i = 0; i < this.data.length; i++) {
                ctx.fillText(this.skip + i + 1, 180, 150 + i * 30);
                ctx.fillText(this.data[i].name, 400, 150 + i * 30);
                ctx.fillText((this.data[i].score / 1000).toFixed(2), 620, 150 + i * 30);
            }
            ctx.font = "20px PixeloidSans";
            ctx.fillText("Prev", 80, 300);
            ctx.fillText("Next", 720, 300);
        } else {
            ctx.font = "20px PixeloidSans";
            ctx.fillText(this.message, this.canvas.width / 2, 100);
        }

        ctx.font = "15px PixeloidSans";
        ctx.fillText("Click here to go back", this.canvas.width / 2, this.canvas.height - 100);
        ctx.textAlign = "left";
    }

    async onClick(x, y, selectedMenu) {
        if (this.data) {
            if (x >= 0 && x <= 120 && y >= 270 && y <= 320) {
                await this.getLeaderboardData(this.skip - this.take, this.take);
            } else if (x >= 680 && x <= 800 && y >= 270 && y <= 320) {
                await this.getLeaderboardData(this.skip + this.take, this.take);
            }
        }
        if (x >= 0 && x <= this.canvas.width && y >= this.canvas.height - 150 && y <= this.canvas.height) {
            selectedMenu.value = "main";
        }
    }
}