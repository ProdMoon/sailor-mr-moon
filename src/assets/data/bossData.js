import bulletPatterns from "./bulletPatterns.js";

const PI = Math.PI;

const bossData = [
    {
        width: {
            idle: 100,
            attack: 70,
        },
        height: {
            idle: 100,
            attack: 100,
        },
        imgPath: "/src/assets/images/kraken",
        imgLength: {
            idle: 7,
            attack: 8,
        },
        keyframes: [
            {
                frame: 150,
                x: 400,
                y: -100,
                status: "idle",
            },
            {
                frame: 30,
                x: 400,
                y: 50,
                status: "idle",
            },
            {
                frame: 20,
                x: 400,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.circle8.bullets,
            },
            {
                frame: 10,
                x: 400,
                y: 50,
                status: "attack",
            },
            {
                frame: 20,
                x: 400,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.circle8.bullets.reduce((acc, cur) => {
                    acc.push({ x: cur.x, y: cur.y, angle: cur.angle + PI / 16, speed: cur.speed });
                    return acc;
                }, []),
            },
            {
                frame: 10,
                x: 400,
                y: 50,
                status: "attack",
            },
            {
                frame: 20,
                x: 400,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.circle8.bullets.reduce((acc, cur) => {
                    acc.push({ x: cur.x, y: cur.y, angle: cur.angle + PI * 2 / 16, speed: cur.speed });
                    return acc;
                }, []),
            },
            {
                frame: 10,
                x: 400,
                y: 50,
                status: "attack",
            },
            {
                frame: 20,
                x: 400,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.circle8.bullets.reduce((acc, cur) => {
                    acc.push({ x: cur.x, y: cur.y, angle: cur.angle + PI * 3 / 16, speed: cur.speed });
                    return acc;
                }, []),
            },
            {
                frame: 10,
                x: 400,
                y: 50,
                status: "attack",
            },
            {
                frame: 20,
                x: 400,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.circle8.bullets,
            },
            {
                frame: 10,
                x: 400,
                y: 50,
                status: "attack",
            },
            {
                frame: 20,
                x: 400,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.circle8.bullets.reduce((acc, cur) => {
                    acc.push({ x: cur.x, y: cur.y, angle: cur.angle + PI / 16, speed: cur.speed });
                    return acc;
                }, []),
            },
            {
                frame: 10,
                x: 400,
                y: 50,
                status: "attack",
            },
            {
                frame: 20,
                x: 400,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.circle8.bullets.reduce((acc, cur) => {
                    acc.push({ x: cur.x, y: cur.y, angle: cur.angle + PI * 2 / 16, speed: cur.speed });
                    return acc;
                }, []),
            },
            {
                frame: 30,
                x: 400,
                y: 50,
                status: "attack",
            },
            {
                frame: 60,
                x: 400,
                y: 50,
                status: "idle",
            },
            {
                frame: 30,
                x: 400,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.straight50.bullets,
            },
            {
                frame: 60,
                x: 150,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.straight50.bullets,
            },
            {
                frame: 60,
                x: 650,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.straight50.bullets,
            },
            {
                frame: 30,
                x: 150,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.straight50.bullets,
            },
            {
                frame: 50,
                x: 400,
                y: 50,
                status: "attack",
            },
            {
                frame: 60,
                x: 400,
                y: 50,
                status: "idle",
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.circle16.bullets,
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.circle16.bullets,
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.circle16.bullets,
            },
            {
                frame: 10,
                x: 400,
                y: 50,
                status: "attack",
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.circle16.bullets.reduce((acc, cur) => {
                    acc.push({ x: cur.x, y: cur.y, angle: cur.angle + PI / 16, speed: cur.speed });
                    return acc;
                }, []),
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.circle16.bullets.reduce((acc, cur) => {
                    acc.push({ x: cur.x, y: cur.y, angle: cur.angle + PI / 16, speed: cur.speed });
                    return acc;
                }, []),
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.circle16.bullets.reduce((acc, cur) => {
                    acc.push({ x: cur.x, y: cur.y, angle: cur.angle + PI / 16, speed: cur.speed });
                    return acc;
                }, []),
            },
            {
                frame: 10,
                x: 400,
                y: 50,
                status: "attack",
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.circle16.bullets,
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.circle16.bullets,
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.circle16.bullets,
            },
            {
                frame: 10,
                x: 400,
                y: 50,
                status: "attack",
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.circle16.bullets.reduce((acc, cur) => {
                    acc.push({ x: cur.x, y: cur.y, angle: cur.angle + PI / 16, speed: cur.speed });
                    return acc;
                }, []),
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.circle16.bullets.reduce((acc, cur) => {
                    acc.push({ x: cur.x, y: cur.y, angle: cur.angle + PI / 16, speed: cur.speed });
                    return acc;
                }, []),
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.circle16.bullets.reduce((acc, cur) => {
                    acc.push({ x: cur.x, y: cur.y, angle: cur.angle + PI / 16, speed: cur.speed });
                    return acc;
                }, []),
            },
            {
                frame: 10,
                x: 400,
                y: 50,
                status: "attack",
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.circle16.bullets,
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.circle16.bullets,
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
            },
            {
                frame: 5,
                x: 400,
                y: 50,
                status: "attack",
                bullets: bulletPatterns.circle16.bullets,
            },
            {
                frame: 30,
                x: 400,
                y: 50,
                status: "attack",
            },
            {
                frame: 30,
                x: 400,
                y: 50,
                status: "idle",
            },
            {
                frame: 40,
                x: 400,
                y: 50,
                status: "idle",
            },
            {
                frame: 60,
                x: 400,
                y: -150,
                status: "idle",
            },
        ],
    },
];

export default bossData;