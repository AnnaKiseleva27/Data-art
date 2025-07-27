// console.log("hello, customer!");

// const hello = 4;
// if (hello < 10) {
//   console.log("less than 10");
// } else {
//   console.log("more than 10");
// }
// drawRect();
// function drawRect() {
//   console.log("draw rect");
// }
// const massName = ["red", "color", "green"];
// console.log(massName);

// class Bug {
//   width = 200;
// }
// const glitch = new Bug();
// console.log(glitch);

// работа с canvas
// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");

// canvas.width = 500;
// canvas.height = 500;

// ctx.beginPath();
// ctx.fillStyle = "#F4CCE9";
// ctx.fillRect(0, 0, canvas.width, canvas.height);
// ctx.closePath();

// //рисуем кружок
// let x = 200;
// let y = 200;
// //функция для отрисовки
// function drawArc() {
//   canvas.width = canvas.width;
//   ctx.beginPath();
//   ctx.fillStyle = "#F4CCE9";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   ctx.closePath();

//   ctx.beginPath();
//   ctx.fillStyle = "#D17D98";
//   ctx.arc(x, y, 40, 0, 2 * Math.PI);
//   ctx.fill();
//   ctx.closePath();
// }
// let dx = 2; // скорость по X
// let dy = 2; // скорость по Y
// const radius = 40;
// // Функция анимации
// function animate() {
//   if (x <= canvas.width - 90 && y <= canvas.height - 90) {
//     x++;
//     y++;
//   }
//   drawArc();
//   requestAnimationFrame(animate);
// }

// AnimationEffect();

// function AnimationEffect() {
//   requestAnimationFrame(animate);
// }

// //вращение квадрата
// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");

// canvas.width = 500;
// canvas.height = 500;

// let x = 0;
// let y = 0;
// let angle = 0;

// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   ctx.fillStyle = "#F4CCE9";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);

//   ctx.fillStyle = "#D17D98";
//   ctx.rotate(angle);
//   ctx.fillRect(x, y, 50, 50); // Исправлено fillRest на fillRect
// }

// function animate() {
//   x++;
//   y++;

//   draw();
//   requestAnimationFrame(animate);
// }

// function AnimationEffect() {
//   requestAnimationFrame(animate);
// }

// Запускаем анимацию
AnimationEffect();

//загружаем картинку
// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");

// const car = new Image();
// car.src = "images/car.jpg";

// car.addEventListener("load", () => {
//   ctx.drawImage(car, 20, 20);
// });
