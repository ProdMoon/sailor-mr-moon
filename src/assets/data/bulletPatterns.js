const PI = Math.PI;

const bulletPatterns = {
    straight50: {
        bullets: [
            { x: -20, y: 0, angle: PI / 2, speed: 10 },
            { x: -10, y: 0, angle: PI / 2, speed: 10 },
            { x: 0, y: 0, angle: PI / 2, speed: 10 },
            { x: 10, y: 0, angle: PI / 2, speed: 10 },
            { x: 20, y: 0, angle: PI / 2, speed: 10 },
        ],
    },
    circle12: {
        bullets: [
            { x: 0, y: 0, angle: PI * 0 / 6, speed: 5 },
            { x: 0, y: 0, angle: PI * 1 / 6, speed: 5 },
            { x: 0, y: 0, angle: PI * 2 / 6, speed: 5 },
            { x: 0, y: 0, angle: PI * 3 / 6, speed: 5 },
            { x: 0, y: 0, angle: PI * 4 / 6, speed: 5 },
            { x: 0, y: 0, angle: PI * 5 / 6, speed: 5 },
            { x: 0, y: 0, angle: PI * 6 / 6, speed: 5 },
            { x: 0, y: 0, angle: PI * 7 / 6, speed: 5 },
            { x: 0, y: 0, angle: PI * 8 / 6, speed: 5 },
            { x: 0, y: 0, angle: PI * 9 / 6, speed: 5 },
            { x: 0, y: 0, angle: PI * 10 / 6, speed: 5 },
            { x: 0, y: 0, angle: PI * 11 / 6, speed: 5 },
        ],
    },
    circle16: {
        bullets: [
            { x: 0, y: 0, angle: PI * 0 / 8, speed: 5 },
            { x: 0, y: 0, angle: PI * 1 / 8, speed: 5 },
            { x: 0, y: 0, angle: PI * 2 / 8, speed: 5 },
            { x: 0, y: 0, angle: PI * 3 / 8, speed: 5 },
            { x: 0, y: 0, angle: PI * 4 / 8, speed: 5 },
            { x: 0, y: 0, angle: PI * 5 / 8, speed: 5 },
            { x: 0, y: 0, angle: PI * 6 / 8, speed: 5 },
            { x: 0, y: 0, angle: PI * 7 / 8, speed: 5 },
            { x: 0, y: 0, angle: PI * 8 / 8, speed: 5 },
            { x: 0, y: 0, angle: PI * 9 / 8, speed: 5 },
            { x: 0, y: 0, angle: PI * 10 / 8, speed: 5 },
            { x: 0, y: 0, angle: PI * 11 / 8, speed: 5 },
            { x: 0, y: 0, angle: PI * 12 / 8, speed: 5 },
            { x: 0, y: 0, angle: PI * 13 / 8, speed: 5 },
            { x: 0, y: 0, angle: PI * 14 / 8, speed: 5 },
            { x: 0, y: 0, angle: PI * 15 / 8, speed: 5 },
        ],
    },
    circle8: {
        bullets: [
            { x: 0, y: 0, angle: PI * 0 / 4, speed: 5 },
            { x: 0, y: 0, angle: PI * 1 / 4, speed: 5 },
            { x: 0, y: 0, angle: PI * 2 / 4, speed: 5 },
            { x: 0, y: 0, angle: PI * 3 / 4, speed: 5 },
            { x: 0, y: 0, angle: PI * 4 / 4, speed: 5 },
            { x: 0, y: 0, angle: PI * 5 / 4, speed: 5 },
            { x: 0, y: 0, angle: PI * 6 / 4, speed: 5 },
            { x: 0, y: 0, angle: PI * 7 / 4, speed: 5 },
        ],
    },
};

export default bulletPatterns;