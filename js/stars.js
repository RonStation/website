const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

const COLORS = [
    "#ffffff",
    "#ffffff",
    "#ffffff",
    "#ffffff",
    "#b48cff",
    "#9d7dff",
    "#ff92d0",
    "#8dc7ff",
    "#6f9fff",
];

const stars = [];

function rand(a,b) {
    return Math.random() * (b-a) + a;
}

for(let i=0;i<700;i++) {

    let layer;

    if(i < 400)
        layer = 0;
    else if(i < 600)
        layer = 1;
    else
        layer = 2;

    let speed;
    let size;

    if(layer === 0) {
        speed = rand(1,5);
        size = rand(0.5,1.5);
    }

    if(layer === 1) {
        speed = rand(3,10);
        size = rand(1,2.5);
    }

    if(layer === 2) {
        speed = rand(7,15);
        size = rand(1.5,4);
    }

    stars.push({
        x: rand(0,canvas.width),
        y: rand(0,canvas.height),
        size,
        speed,
        color: COLORS[Math.floor(Math.random()*COLORS.length)],
    });
}

function draw() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(const s of stars) {

        s.y += s.speed;

        if(s.y > canvas.height + 20) {
            s.y = -20;
            s.x = rand(0,canvas.width);
        }

        ctx.beginPath();

        ctx.fillStyle = s.color;

        ctx.shadowBlur = s.size * 3;
        ctx.shadowColor = s.color;

        ctx.arc(
            s.x,
            s.y,
            s.size,
            0,
            Math.PI*2
        );

        ctx.fill();
    }

    requestAnimationFrame(draw);
}

draw();