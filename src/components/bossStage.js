import Bullet from "./bullet.js";
import bossData from "../assets/data/bossData.js";

function bossImgLoader(level) {
    const bossImg = {
        idle: [],
        attack: [],
    };

    const data = bossData[level];

    for (let key of Object.keys(bossImg)) {
        for (let i = 1; i <= data.imgLength[key]; i++) {
            const img = new Image();
            img.src = `${data.imgPath}/${key}${i}.png`;
            bossImg[key].push(img);
        }
    }

    return bossImg;
}

export default class BossStage {
    constructor(canvas) {
        this.canvas = canvas;
        this.isEnabled = false;
        this.level = 0;
        this.x = 0;
        this.y = 0;

        this.img = {
            idle: [],
            attack: [],
            die: [],
        };
        this.imgIdx = 0;

        this.elapsedFrames = 0;
        this.nextKeyFrame = 0;
        this.keyframeIdx = 0;

        this.status = "idle";
    }

    update(bullets) {
        const boss = bossData[this.level];

        // Update boss position and status
        if (this.elapsedFrames >= this.nextKeyFrame) {
            this.keyframeIdx++;
            if (this.keyframeIdx >= boss.keyframes.length - 1) {
                this.disable();
                return;
            }
            this.nextKeyFrame += boss.keyframes[this.keyframeIdx].frame;
            this.imgIdx = 0;
        }
        const thiskey = boss.keyframes[this.keyframeIdx];
        const nextkey = boss.keyframes[this.keyframeIdx + 1];
        const ratio = (this.elapsedFrames - this.nextKeyFrame + thiskey.frame) / thiskey.frame;
        this.x = thiskey.x + (nextkey.x - thiskey.x) * ratio;
        this.y = thiskey.y + (nextkey.y - thiskey.y) * ratio;
        this.status = thiskey.status;

        // Update boss image
        if (this.elapsedFrames % 3 === 0) {
            this.imgIdx = (this.imgIdx + 1) % this.img[this.status].length;
        }

        // Push bullets
        if (this.status === "attack" && thiskey.bullets) {
            for (let bulletAttr of thiskey.bullets) {
                const attr = { ...bulletAttr };
                attr.x += this.x;
                attr.y += this.y;
                const bullet = new Bullet(this.canvas, attr);
                bullets.push(bullet);
            }
        }

        this.elapsedFrames++;
    }

    draw(ctx) {
        const boss = bossData[this.level];
        ctx.drawImage(
            this.img[this.status][this.imgIdx],
            this.x - boss.width[this.status] / 2,
            this.y - boss.height[this.status] / 2,
            boss.width[this.status],
            boss.height[this.status]
        );
    }

    enable(level) {
        this.isEnabled = true;
        this.level = level;
        this.img = bossImgLoader(level);
        this.nextKeyFrame = bossData[level].keyframes[0].frame;
    }

    disable() {
        this.isEnabled = false;
        this.level = 0;
        this.x = 0;
        this.y = 0;
        this.img = {
            idle: [],
            attack: [],
            die: [],
        };
        this.imgIdx = 0;
        this.elapsedFrames = 0;
        this.nextKeyFrame = 0;
        this.keyframeIdx = 0;
        this.status = "idle";
    }
}
