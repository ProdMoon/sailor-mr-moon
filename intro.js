import initGame from "./game.js";
import HowToPlay from "./src/components/howToPlay.js";
import Leaderboard from "./src/components/leaderboard.js";
import Credits from "./src/components/credits.js";

/* Images */
const seaImg = new Image();
seaImg.src = "/src/assets/images/sea.png";

const mainTitleImg = new Image();
mainTitleImg.src = "/src/assets/images/main-title.png";

const sailorMrMoonImg = new Image();
sailorMrMoonImg.src = "/src/assets/images/sailor-mr-moon.png";

const woodenArrowImg = new Image();
woodenArrowImg.src = "/src/assets/images/wooden-arrow.png";
/* End of images */

const gameCanvas = document.getElementById("game-canvas");
gameCanvas.width = 800;
gameCanvas.height = 600;
const gameCtx = gameCanvas.getContext("2d");

const canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext("2d");

const howToPlay = new HowToPlay(canvas);
const leaderboard = new Leaderboard(canvas);
const credits = new Credits(canvas);

let zoomLevel = 1;

let elapsedFrames = 0;
const selectedMenu = { value: "main" };

const sailorMrMoon = {
    x: 500,
    y: 80,
    yGoesUp: true,
};

const playClick = {
    value: false,
    countdown: 200,
    opacity: 0,
};

async function update() {
    if (selectedMenu.value === "main") {
        // Update sailor Mr. Moon
        if (elapsedFrames % 7 === 0) {
            if (sailorMrMoon.y === 84) {
                sailorMrMoon.yGoesUp = false;
            } else if (sailorMrMoon.y === 78) {
                sailorMrMoon.yGoesUp = true;
            }
            if (sailorMrMoon.yGoesUp) {
                sailorMrMoon.y++;
            } else {
                sailorMrMoon.y--;
            }
        }

        // Check if play button is clicked
        if (playClick.value) {
            playClick.countdown--;
        }
    }

    elapsedFrames++;

    // Draw everything
    draw();

    // loop
    if (playClick.countdown > 0) {
        requestAnimationFrame(update);
    } else {
        initGame();
    }
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.drawImage(seaImg, 0, 0, canvas.width, canvas.height);

    if (selectedMenu.value === "main") {
        // Draw main title
        ctx.drawImage(mainTitleImg, canvas.width / 2 - mainTitleImg.width / 2, 10, mainTitleImg.width, mainTitleImg.height);

        // Draw sailor Mr. Moon
        ctx.drawImage(sailorMrMoonImg, sailorMrMoon.x, sailorMrMoon.y, sailorMrMoonImg.width, sailorMrMoonImg.height);

        // Draw Play button
        ctx.drawImage(woodenArrowImg, 20, 220, woodenArrowImg.width, woodenArrowImg.height);
        ctx.fillStyle = "white";
        ctx.font = "30px PixeloidSansBold";
        ctx.fillText("Play", 130, 274);

        // Draw How To Play button
        ctx.drawImage(woodenArrowImg, 70, 310, woodenArrowImg.width, woodenArrowImg.height);
        ctx.font = "26px PixeloidSansBold";
        ctx.fillText("How To Play", 120, 364);

        // Draw Leaderboard button
        ctx.drawImage(woodenArrowImg, 20, 400, woodenArrowImg.width, woodenArrowImg.height);
        ctx.fillText("Leaderboard", 65, 455);

        // Draw Credits button
        ctx.drawImage(woodenArrowImg, 60, 486, woodenArrowImg.width, woodenArrowImg.height);
        ctx.fillText("Credits", 145, 540);

        // Play fade-in effect
        if (playClick.value) {
            if (playClick.countdown % 20 === 0) {
                playClick.opacity += 0.2;
            }
            ctx.fillStyle = "rgba(0, 0, 0, " + playClick.opacity + ")";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    } else if (selectedMenu.value === "how-to-play") {
        howToPlay.draw(ctx);
    } else if (selectedMenu.value === "leaderboard") {
        leaderboard.draw(ctx);
    } else if (selectedMenu.value === "credits") {
        credits.draw(ctx);
    }

    // Draw virtual canvas to real canvas
    gameCtx.save();
    gameCtx.scale(zoomLevel, zoomLevel);
    gameCtx.drawImage(canvas, 0, 0);
    gameCtx.restore();
}

/* Resizing */
let resizeTimeout;

function resizeCanvas() {
    // Get vw and vh
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    // Set gameCanvas size
    if (vw / vh > 4 / 3) {
        gameCanvas.width = vh * 4 / 3;
        gameCanvas.height = vh;
    } else {
        gameCanvas.width = vw;
        gameCanvas.height = vw * 3 / 4;
    }
    zoomLevel = gameCanvas.width / 800;

    // Draw everything
    draw();
}

function debouncedResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvas, 100);
}

window.addEventListener("resize", debouncedResize);
/* End of resizing */

/* Event listeners */
gameCanvas.addEventListener("click", (e) => {
    const rect = gameCanvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoomLevel;
    const y = (e.clientY - rect.top) / zoomLevel;

    if (selectedMenu.value === "main") {
        if (
            x >= 20 &&
            x <= 20 + woodenArrowImg.width &&
            y >= 220 &&
            y <= 220 + woodenArrowImg.height
        ) {
            // Clicked Play button
            playClick.value = true;
        } else if (
            x >= 70 &&
            x <= 70 + woodenArrowImg.width &&
            y >= 310 &&
            y <= 310 + woodenArrowImg.height
        ) {
            // Clicked How To Play button
            selectedMenu.value = "how-to-play";
        } else if (
            x >= 20 &&
            x <= 20 + woodenArrowImg.width &&
            y >= 400 &&
            y <= 400 + woodenArrowImg.height
        ) {
            leaderboard.getLeaderboardData();
            // Clicked Leaderboard button
            selectedMenu.value = "leaderboard";
        } else if (
            x >= 60 &&
            x <= 60 + woodenArrowImg.width &&
            y >= 486 &&
            y <= 486 + woodenArrowImg.height
        ) {
            // Clicked Credits button
            selectedMenu.value = "credits";
        }
    } else {
        if (selectedMenu.value === "leaderboard") {
            leaderboard.onClick(x, y, selectedMenu);
        } else {
            selectedMenu.value = "main";
        }
    }
});

export default (async function init() {
    resizeCanvas();

    // Load fonts
    const font = new FontFace("PixeloidSans", "url(/src/assets/fonts/PixeloidSans.ttf)");
    const fontBold = new FontFace("PixeloidSansBold", "url(/src/assets/fonts/PixeloidSansBold.ttf)");
    await font.load();
    await fontBold.load();
    document.fonts.add(font);
    document.fonts.add(fontBold);

    update();
})();