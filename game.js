import Player from "./src/components/player.js";
import Bullet from "./src/components/bullet.js";
import Item from "./src/components/item.js";
import Background from "./src/components/background.js";
import { copyObject } from "./src/utils/util.js";
import ActivateMobileButtons from "./src/utils/activateMobileButtons.js";
import BossStage from "./src/components/bossStage.js";
import Collision from "./src/components/collision.js";

const gameCanvas = document.getElementById("game-canvas");
const gameCtx = gameCanvas.getContext("2d");
let zoomLevel = 1;

const canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext("2d");

const background = new Background(canvas);
const player = new Player(canvas);
const bossStage = new BossStage(canvas);

const slot = {
    bullets: [],
    items: [],
    catchedItems: [],
    itemWillBeUsed: null,
    effect: null,
};

let currentLevel = 0;
const levelChanged = { value: false };
const levels = [
    {
        weight: 1,
    },
    {
        weight: 0.8,
    },
    {
        weight: 0.6,
    }
];

const isCollided = { value: false };
const isGameOver = { value: false };
let elapsedTime = 0;
const EACH_LEVEL_TIME = 60000;
let bossStageLeftTime = EACH_LEVEL_TIME;
let elapsedFrames = 0;

function update() {
    if (!isCollided.value && !isGameOver.value) {
        // Check if boss stage should be enabled
        if (bossStageLeftTime <= 0 && currentLevel < levels.length - 1) {
            slot.bullets = [];
            bossStage.enable(currentLevel);
            bossStageLeftTime = EACH_LEVEL_TIME;
        }

        // Update background
        background.update(elapsedFrames);

        // Update player
        player.update();

        // Update boss stage
        if (bossStage.isEnabled) {
            bossStage.update(slot.bullets);
            if (!bossStage.isEnabled) {
                if (currentLevel < levels.length - 1) {
                    currentLevel++;
                    levelChanged.value = true;
                }
            }
        }

        // Create bullets
        if (!bossStage.isEnabled) {
            const bulletCreationProbability = 1 - Math.pow(0.999, ((EACH_LEVEL_TIME - bossStageLeftTime) % EACH_LEVEL_TIME) / (120 * levels[currentLevel].weight));
            if (Math.random() < bulletCreationProbability) {
                const bullet = new Bullet(canvas);
                slot.bullets.push(bullet);
            }
        }

        // Create items
        if (Math.random() < 0.007) {
            const item = new Item("shield", canvas);
            slot.items.push(item);
        }

        // Use item
        if (slot.itemWillBeUsed) {
            slot.itemWillBeUsed.behavior(player, slot);
            if (slot.itemWillBeUsed.duration > 0) {
                slot.itemWillBeUsed.duration--;
            } else {
                slot.itemWillBeUsed = null;
            }
        }

        // Update effect
        if (slot.effect) {
            slot.effect.update(player);
            if (!slot.effect.isEnabled) {
                slot.effect = null;
            }
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
                isCollided.value = true;
                break;
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

        // Decrease boss stage left time
        if (!bossStage.isEnabled) {
            bossStageLeftTime -= 1000 / 60;
            if (bossStageLeftTime < 0) {
                bossStageLeftTime = 0;
            }
        }

        // Increase elapsed frames
        elapsedFrames++;
    } else if (!isGameOver.value) {
        // Collided situation
        if (!slot.effect) {
            slot.effect = new Collision();
        }
        slot.effect.update(player);
        if (!slot.effect.isEnabled) {
            isGameOver.value = true;
        }
    }

    // Draw everything
    draw();

    // Loop
    requestAnimationFrame(update);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function draw() {
    clearCanvas();

    // Draw background
    background.draw(ctx);

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

    // Draw boss
    if (bossStage.isEnabled) {
        bossStage.draw(ctx);
    }

    // Draw effect
    if (slot.effect) {
        slot.effect.draw(ctx);
    }

    // Draw time
    ctx.fillStyle = "#bbb";
    ctx.font = "18px PixeloidSans";
    ctx.fillText("Time: " + (elapsedTime / 1000).toFixed(2), 10, 30);
    
    // Draw level
    ctx.fillStyle = "#bbb";
    ctx.font = "18px PixeloidSans";
    ctx.fillText("Level: " + (currentLevel + 1), 10, 60);
    
    // Draw boss stage left time
    ctx.fillStyle = "#bbb";
    if (currentLevel < levels.length - 1) {
        ctx.font = "18px PixeloidSans";
        ctx.fillText("Boss: " + (bossStageLeftTime / 1000).toFixed(), 10, 90);
    } else {
        ctx.font = "18px PixeloidSans";
        ctx.fillText("Boss: -", 10, 90);
    }
    
    // Draw Items
    ctx.fillStyle = slot.catchedItems.length > 0 ? "#fff" : "#bbb";
    ctx.font = "18px PixeloidSans";
    ctx.fillText("Items: " + slot.catchedItems.length, 10, 120);

    // Draw dash cooldown
    ctx.fillStyle = player.dashCooldown <= 0 ? "#fff" : "#bbb";
    ctx.font = "18px PixeloidSans";
    ctx.fillText("Dash: " + (player.dashCooldown <= 0 ? "ON" : (player.dashCooldown / 1000).toFixed(2)), 10, 150);

    // Draw level changed
    if (levelChanged.value) {
        ctx.fillStyle = "#bbb";
        if (currentLevel < levels.length - 1) {
            ctx.font = "30px PixeloidSansBold";
            ctx.fillText("Level " + (currentLevel + 1), canvas.width / 2 - 70, canvas.height / 2);
        } else {
            ctx.font = "30px PixeloidSansBold";
            ctx.fillText("Final Level", canvas.width / 2 - 100, canvas.height / 2 - 20);
            ctx.font = "20px PixeloidSans";
            ctx.fillText("Survive as long as possible!", canvas.width / 2 - 150, canvas.height / 2 + 20);
        }
        setTimeout(() => {
            levelChanged.value = false;
        }, 1500);
    }

    if (isGameOver.value) {
        ctx.fillStyle = "#bbb";
        ctx.font = "30px PixeloidSansBold";
        ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2 - 10);
        ctx.font = "20px PixeloidSans";
        ctx.fillText("Press Enter to restart", canvas.width / 2 - 122, canvas.height / 2 + 20);
    }

    // Draw virtual canvas to real canvas
    gameCtx.save();
    gameCtx.scale(zoomLevel, zoomLevel);
    gameCtx.drawImage(canvas, 0, 0);
    gameCtx.restore();
}

document.addEventListener("keydown", (e) => {
    if (!isGameOver.value) {
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
    if (!isGameOver.value) {
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

async function initGame() {
    // Set canvas size
    resizeCanvas();

    // Activate mobile buttons
    ActivateMobileButtons(player, isGameOver, slot);

    levelChanged.value = true;

    update();
}

export default initGame;