const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const playerSize = 20;
const particleSize = 10;
const particleSpeed = 3;
const dashLength = 200;
const dashCooldownTime = 1000;

const player = {
    x: canvas.width / 2 - playerSize / 2,
    y: canvas.height / 2 - playerSize / 2,
    dx: 0,
    dy: 0,
    size: playerSize,
};

const particles = [];

let pressedKeyWithShift = null;
let dashCooldown = 0;

let isGameOver = false;
let elapsedTime = 0;

function update() {
    // Move player
    player.x += player.dx;
    player.y += player.dy;
    if (canvas.width < player.x + player.size) {
        player.x = canvas.width - player.size;
    }
    if (player.x < 0) {
        player.x = 0;
    }
    if (canvas.height < player.y + player.size) {
        player.y = canvas.height - player.size;
    }
    if (player.y < 0) {
        player.y = 0;
    }

    // Create particles
    if (Math.random() < 0.05) {
        let side = Math.floor(Math.random() * 4); // top: 0, right: 1, bottom: 2, left: 3
        const particle = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: particleSize,
            dx: 0,
            dy: 0,
            speed: particleSpeed + Math.random() * 3,
        };
        switch (side) {
            case 0: // top
                particle.y = -particle.size;
                particle.dx =
                    Math.random() * particle.speed * 2 - particle.speed;
                particle.dy = particle.speed;
                break;
            case 1: // right
                particle.x = canvas.width;
                particle.dx = -particle.speed;
                particle.dy =
                    Math.random() * particle.speed * 2 - particle.speed;
                break;
            case 2: // bottom
                particle.y = canvas.height;
                particle.dx =
                    Math.random() * particle.speed * 2 - particle.speed;
                particle.dy = -particle.speed;
                break;
            case 3: // left
                particle.x = -particle.size;
                particle.dx = particle.speed;
                particle.dy =
                    Math.random() * particle.speed * 2 - particle.speed;
                break;
        }
        particles.push(particle);
    }

    // Move & remove particles
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].x += particles[i].dx;
        particles[i].y += particles[i].dy;
        if (particles[i].y > canvas.height) {
            particles.splice(i, 1);
            continue;
        }

        // Collision detection
        if (
            player.x < particles[i].x + particles[i].size &&
            player.x + player.size > particles[i].x &&
            player.y < particles[i].y + particles[i].size &&
            player.y + player.size > particles[i].y
        ) {
            isGameOver = true;
            alert("Game Over!");
            document.location.reload();
        }
    }

    // Increase elapsed time in milliseconds
    elapsedTime += 1000 / 60;

    // Decrease dash cooldown
    if (dashCooldown > 0) {
        dashCooldown -= 1000 / 60;
    }

    // Draw everything
    draw();

    // Loop
    if (!isGameOver) {
        requestAnimationFrame(update);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Draw particles
    ctx.fillStyle = "red";
    for (let particle of particles) {
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
    }

    // Draw time
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Time: " + (elapsedTime / 1000).toFixed(2), 10, 30);

    // Draw dash cooldown
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Dash cooldown: " + (dashCooldown / 1000).toFixed(2), 10, 60);
}

function triggerDash(keyName) {
    if (keyName === "ArrowRight") {
        player.x += dashLength;
    } else if (keyName === "ArrowLeft") {
        player.x -= dashLength;
    } else if (keyName === "ArrowUp") {
        player.y -= dashLength;
    } else if (keyName === "ArrowDown") {
        player.y += dashLength;
    }
}

document.addEventListener("keydown", (e) => {
    if (pressedKeyWithShift === e.key && e.shiftKey) {
        triggerDash(e.key);
        pressedKeyWithShift = null;
        dashCooldown = dashCooldownTime;
    }

    if (e.key === "ArrowRight") {
        player.dx = 5;
    } else if (e.key === "ArrowLeft") {
        player.dx = -5;
    } else if (e.key === "ArrowUp") {
        player.dy = -5;
    } else if (e.key === "ArrowDown") {
        player.dy = 5;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "Shift") {
        pressedKeyWithShift = null;
    }
    if (
        dashCooldown <= 0 &&
        e.shiftKey &&
        (e.key === "ArrowRight" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowUp" ||
            e.key === "ArrowDown")
    ) {
        pressedKeyWithShift = e.key;
    }

    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        player.dx = 0;
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        player.dy = 0;
    }
});

update();
