export default class Effect {
    constructor(attributes) {
        if (!attributes) {
            attributes = {};
        }
        this.x = 0;
        this.y = 0;
        this.alpha = 1;
        this.img = null;
        this.width = 0;
        this.height = 0;
        this.currentFrame = 0;
        this.keyframes = attributes.keyframes ?? [];
        this.isEnabled = true;
    }

    update(player) {
        if (this.keyframes.length > 0) {
            const keyframe = this.keyframes[0];
            if (this.currentFrame === 0) {
                this.x = (player.x + player.size / 2) + (keyframe.x - keyframe.width / 2);
                this.y = (player.y + player.size / 2) + (keyframe.y - keyframe.height / 2);
                this.img = keyframe.img;
                this.width = keyframe.width;
                this.height = keyframe.height;
                this.alpha = keyframe.alpha;
            }
            this.currentFrame++;
            if (this.currentFrame >= keyframe.duration) {
                this.keyframes.shift();
                this.currentFrame = 0;
            }
        } else {
            this.isEnabled = false;
        }
    }

    draw(ctx) {
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.globalAlpha = 1;
    }
}