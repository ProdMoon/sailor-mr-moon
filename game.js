import Bullet from "./src/components/bullet.js";
import Player from "./src/components/player.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = new Player(canvas);

const bullets = [];

let isGameOver = false;
let elapsedTime = 0;

function update() {
    // Update player
    player.update();

    // Create bullets
    if (Math.random() < 0.2) {
        const bullet = new Bullet(canvas);
        bullets.push(bullet);
    }

    // Move & remove bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].update();
        if (bullets[i].isOffScreen(canvas)) {
            bullets.splice(i, 1);
            continue;
        }

        // Collision detection
        if (bullets[i].isCollidingWithPlayer(player)) {
            isGameOver = true;
            alert("Game Over!");
            document.location.reload();
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
    for (let bullet of bullets) {
        bullet.draw(ctx);
    }

    // Draw time
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Time: " + (elapsedTime / 1000).toFixed(2), 10, 30);

    // Draw dash cooldown
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Dash cooldown: " + (player.dashCooldown / 1000).toFixed(2), 10, 60);
}

document.addEventListener("keydown", (e) => {
    player.handleKeydown(e);
});

document.addEventListener("keyup", (e) => {
    player.handleKeyup(e);
});

export default update();
