import Player from "./src/components/player.js";
import Bullet from "./src/components/bullet.js";
import Item from "./src/components/item.js";
import copyObject from "./src/utils/copyObject.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = new Player(canvas);

const slot = {
    bullets: [],
    items: [],
    catchedItems: [],
    itemWillBeUsed: null,
};

let isGameOver = false;
let elapsedTime = 0;

function update() {
    // Update player
    player.update();

    // Create bullets
    if (Math.random() < 0.2) {
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

    if (isGameOver) {
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2);
        ctx.font = "20px Arial";
        ctx.fillText("Press Enter to restart", canvas.width / 2 - 95, canvas.height / 2 + 30);
    }
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

export default update();
