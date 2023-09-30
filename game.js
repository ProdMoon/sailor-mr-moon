import Player from "./src/components/player.js";
import Bullet from "./src/components/bullet.js";
import Item from "./src/components/item.js";
import { copyObject } from "./src/utils/util.js";
import ActivateMobileButtons from "./src/utils/activateMobileButtons.js";

const gameCanvas = document.createElement("canvas");
const gameCtx = gameCanvas.getContext("2d");
let zoomLevel = 1;

const canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext("2d");

const player = new Player(canvas);

const slot = {
    bullets: [],
    items: [],
    catchedItems: [],
    itemWillBeUsed: null,
};

let currentLevel = 0;
let levelChanged = false;
const levels = [
    {
        elapsedTime: 60 * 1000,
        weight: 1,
    },
    {
        elapsedTime: 120 * 1000,
        weight: 0.85,
    },
    {
        elapsedTime: 180 * 1000,
        weight: 0.7,
    }
];

let isGameOver = false;
let elapsedTime = 0;

function update() {
    // Update level
    if (currentLevel < levels.length - 1 && elapsedTime >= levels[currentLevel].elapsedTime) {
        levelChanged = true;
        slot.bullets = [];
        currentLevel++;
    }

    // Update player
    player.update();

    // Create bullets
    const bulletCreationProbability = 1 - Math.pow(0.999, (elapsedTime % 60000) / (120 * levels[currentLevel].weight));
    if (Math.random() < bulletCreationProbability) {
        const bullet = new Bullet(canvas);
        slot.bullets.push(bullet);
    }

    // Create items
    if (Math.random() < 0.01) {
        const item = new Item("bomb", canvas);
        slot.items.push(item);
    }

    // Use item
    if (slot.itemWillBeUsed) {
        slot.itemWillBeUsed.behavior(player, slot.bullets);
        slot.itemWillBeUsed = null;
    }

    // Move & remove bullets
    for (let i = slot.bullets.length - 1; i >= 0; i--) {
        slot.bullets[i].update();
        if (slot.bullets[i].isOffScreen(canvas)) {
            slot.bullets.splice(i, 1);
            continue;
        }

        // Collision detection
        if (slot.bullets[i].isCollidingWithPlayer(player)) {
            isGameOver = true;
        }
    }

    // Move & remove items
    for (let i = slot.items.length - 1; i >= 0; i--) {
        slot.items[i].update();
        if (slot.items[i].isOffScreen(canvas)) {
            slot.items.splice(i, 1);
            continue;
        }

        // Collision detection
        if (slot.items[i].isCollidingWithPlayer(player)) {
            slot.catchedItems.push(copyObject(slot.items[i]));
            slot.items.splice(i, 1);
        }
    }

    // Increase elapsed time in milliseconds
    elapsedTime += 1000 / 60;

    // Draw everything
    draw();

    // Loop
    if (!isGameOver) {
        requestAnimationFrame(update);
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function draw() {
    clearCanvas();

    // Draw player
    player.draw(ctx);

    // Draw bullets
    for (let bullet of slot.bullets) {
        bullet.draw(ctx);
    }

    // Draw items
    for (let item of slot.items) {
        item.draw(ctx);
    }

    // Draw time
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Time: " + (elapsedTime / 1000).toFixed(2), 10, 30);

    // Draw dash cooldown
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Dash cooldown: " + (player.dashCooldown / 1000).toFixed(2), 10, 60);

    // Draw Items
    ctx.fillStyle = "black";
    ctx.font = "14px Arial";
    ctx.fillText("Items: " + slot.catchedItems.length, 10, 90);

    // Draw level
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Level: " + (currentLevel + 1), 10, 120);

    // Draw level changed
    if (levelChanged) {
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Level " + (currentLevel + 1), canvas.width / 2 - 50, canvas.height / 2);
        setTimeout(() => {
            levelChanged = false;
        }, 1000);
    }

    if (isGameOver) {
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2);
        ctx.font = "20px Arial";
        ctx.fillText("Press Enter to restart", canvas.width / 2 - 95, canvas.height / 2 + 30);
    }

    // Draw virtual canvas to real canvas
    gameCtx.save();
    gameCtx.scale(zoomLevel, zoomLevel);
    gameCtx.drawImage(canvas, 0, 0);
    gameCtx.restore();
}

document.addEventListener("keydown", (e) => {
    if (!isGameOver) {
        player.handleKeydown(e);
        
        if (e.key === "z" && slot.catchedItems.length > 0) {
            slot.itemWillBeUsed = copyObject(slot.catchedItems[0]);
            slot.catchedItems.splice(0, 1);
        }
    } else {
        if (e.key === "Enter") {
            location.reload();
        }
    }
});

document.addEventListener("keyup", (e) => {
    if (!isGameOver) {
        player.handleKeyup(e);
    }
});


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

function initGame() {
    // Set canvas size
    resizeCanvas();

    // Append gameCanvas to body
    document.body.appendChild(gameCanvas);

    // Activate mobile buttons
    ActivateMobileButtons();

    update();
}

export default initGame();