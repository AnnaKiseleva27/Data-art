const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let width,
  height,
  balls = [];

let mouse = {
  x: undefined,
  y: undefined,
};
let rgb = [
  "rgb(26, 188, 156)",
  "rgb(217, 22, 86)",
  "rgb(52, 152, 219)",
  "rgb(155, 89, 182)",
  "rgb(241, 196, 15)",
  "rgb(230, 126, 34)",
  "rgb(231, 76, 68)",
];
function init() {
  resizereset();
  animate();
}
function resizereset() {
  width = canvas.width = window.innerWidth; // ширина canvas = ширине окна
  height = canvas.height = window.innerHeight;
}
function animate() {
  ctx.clearRect(0, 0, width, height);
  ctx.globalCompositeOperation = "lighter"; // какое то свойство, можно задать другое

  drawBalls();

  let tmp = [];
  for (let i = 0; i < balls.length; i++) {
    //исчезнование шариков
    if (balls[i].time < balls[i].ttl) {
      // чтобы удалять ненужные
      tmp.push(balls[i]);
    }
  }
  balls = tmp;

  requestAnimationFrame(animate); // зацикливание
}
function drawBalls() {
  for (let i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].draw();
  }
}
function mousemove(e) {
  // мышка двигается
  mouse.x = e.x;
  mouse.y = e.y;

  for (let i = 0; i < 2; i++) {
    //создание 3 шариков на каждое движение мыши
    balls.push(new Ball());
  }
}
function mouseout() {
  // мышка статична
  mouse.x = undefined;
  mouse.y = undefined;
}

function getRandomInit(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}
function easeOutQuart(x) {
  return 1 - Math.pow(1 - x, 4);
}
class Ball {
  constructor() {
    this.start = {
      x: mouse.x + getRandomInit(-60, 60),
      y: mouse.y + getRandomInit(-60, 60),
      size: getRandomInit(15, 25),
    };

    this.end = {
      x: mouse.x + getRandomInit(-60, 60),
      y: mouse.y + getRandomInit(-60, 60),
    };

    this.x = this.start.x;
    this.y = this.start.y;
    this.size = this.start.size;

    this.style = rgb[getRandomInit(0, rgb.length - 1)];

    this.time = 0;
    this.ttl = 120;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.style;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    if (this.time <= this.ttl) {
      let progress = 1 - (this.ttl - this.time) / this.ttl;

      this.size = this.start.size * (1 - easeOutQuart(progress));
      this.x = this.x + (this.end.x - this.x) * 0.01;
      this.y = this.y + (this.end.y - this.y) * 0.01;
    }
    this.time++;
  }
}

setInterval(() => {
  document.querySelector("#debug span").innerText = balls.length;
}, 100);

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizereset);
window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseout", mouseout);
