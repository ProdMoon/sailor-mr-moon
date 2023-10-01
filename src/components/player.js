const DEFAULT_SPEED = 5;
const DEFAULT_SIZE = 20;
const DEFAULT_COLOR = "blue";
const DEFAULT_DASH_LENGTH = 200;
const DEFAULT_DASH_COOLDOWN_TIME = 5000;

export default class Player {
    constructor(canvas, size, color) {
        if (!canvas instanceof HTMLCanvasElement) {
            throw new Error("canvas must be an instance of HTMLCanvasElement");
        }
        this.canvas = canvas;
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.dx = 0;
        this.dy = 0;
        this.speed = DEFAULT_SPEED;
        this.size = DEFAULT_SIZE;
        if (typeof size === "number") {
            this.size = size;
        }
        this.color = DEFAULT_COLOR;
        if (typeof color === "string") {
            this.color = color;
        }

        this.dashLength = DEFAULT_DASH_LENGTH;
        this.dashCooldownTime = DEFAULT_DASH_COOLDOWN_TIME;
        this.dashCooldown = 0;
        this.pressedKeyWithShift = null;
        this.keyDownStates = {
            ArrowRight: false,
            ArrowLeft: false,
            ArrowUp: false,
            ArrowDown: false,
        };
        this.img = new Image();
        this.img.src = "/src/assets/images/player.png";
    }

    update() {
        // Move player
        this.x += this.dx;
        this.y += this.dy;
        if (this.canvas.width < this.x + this.size) {
            this.x = this.canvas.width - this.size;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.canvas.height < this.y + this.size) {
            this.y = this.canvas.height - this.size;
        }
        if (this.y < 0) {
            this.y = 0;
        }

        // Dash cooldown
        if (this.dashCooldown > 0) {
            this.dashCooldown -= 1000 / 60;
            if (this.dashCooldown < 0) {
                this.dashCooldown = 0;
            }
        }
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
    }

    handleKeydown(e) {
        if (this.pressedKeyWithShift === e.key && e.shiftKey) {
            this.triggerDash(e.key);
            this.pressedKeyWithShift = null;
            this.dashCooldown = this.dashCooldownTime;
        }

        this.keyDownStates[e.key] = true;

        if (e.key === "ArrowRight") {
            this.dx = this.speed;
        } else if (e.key === "ArrowLeft") {
            this.dx = -this.speed;
        } else if (e.key === "ArrowUp") {
            this.dy = -this.speed;
        } else if (e.key === "ArrowDown") {
            this.dy = this.speed;
        }
    }

    handleKeyup(e) {
        if (e.key === "Shift") {
            this.pressedKeyWithShift = null;
        }
        if (
            this.dashCooldown <= 0 &&
            e.shiftKey &&
            (e.key === "ArrowRight" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowUp" ||
                e.key === "ArrowDown")
        ) {
            this.pressedKeyWithShift = e.key;
        }

        this.keyDownStates[e.key] = false;

        if (e.key === "ArrowRight") {
            if (this.keyDownStates.ArrowLeft) {
                this.dx = -this.speed;
            } else {
                this.dx = 0;
            }
        }
        if (e.key === "ArrowLeft") {
            if (this.keyDownStates.ArrowRight) {
                this.dx = this.speed;
            } else {
                this.dx = 0;
            }
        }
        if (e.key === "ArrowUp") {
            if (this.keyDownStates.ArrowDown) {
                this.dy = this.speed;
            } else {
                this.dy = 0;
            }
        }
        if (e.key === "ArrowDown") {
            if (this.keyDownStates.ArrowUp) {
                this.dy = -this.speed;
            } else {
                this.dy = 0;
            }
        }
    }

    triggerDash(keyName) {
        if (keyName === "ArrowRight") {
            this.x += this.dashLength;
        } else if (keyName === "ArrowLeft") {
            this.x -= this.dashLength;
        } else if (keyName === "ArrowUp") {
            this.y -= this.dashLength;
        } else if (keyName === "ArrowDown") {
            this.y += this.dashLength;
        }
    }
}
