let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

canvas.style.background = "#B4EBE6";
function first_video() {
  //квадртаты
  ctx.fillStyle = "#90C67C";
  ctx.fillRect(100, 0, 100, 200);
  ctx.fillStyle = "blue";
  ctx.fillRect(100, 500, 100, 200);
  //круг
  ctx.beginPath(); // начало рисования
  ctx.strokeStyle = "red"; // цвет
  ctx.lineWidth = 20; //толщина
  ctx.arc(100, 100, 50, 0, Math.PI * 2, false); //сам круг
  ctx.stroke(); // хз надо
  ctx.closePath(); // конец рисования s
}
function many_circles_static() {
  class Circle {
    constructor(xpos, ypos, radius, color, text) {
      this.xpos = xpos;
      this.ypos = ypos;
      this.radius = radius;
      this.color = color;
      this.text = text;
    }
    draw(context) {
      context.beginPath();

      context.strokeStyle = this.color;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.font = "20px Arail";
      context.fillText(this.text, this.xpos, this.ypos);

      context.strokeStyle = "#F7374F";
      context.lineWidth = 5;
      context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false);
      context.stroke();
      context.closePath();
    }
  }

  let circle_counter = 1;

  let all_circles = [];

  let createCircle = function (circle) {
    circle.draw(ctx);
  };

  for (let num = 0; num < 1; num++) {
    let random_x = Math.random() * window_width;
    let random_y = Math.random() * window_height;
    let my_circle = new Circle(random_x, random_y, 50, "black", circle_counter);
    all_circles.push(my_circle);
    createCircle(all_circles[num]);
    update;
    circle_counter++;
  }
}
function one_circle_hit_walls() {
  let hit_counter = 0;

  class Circle {
    constructor(xpos, ypos, radius, color, text, speed) {
      this.xpos = xpos;
      this.ypos = ypos;
      this.radius = radius;
      this.color = color;
      this.text = text;
      this.speed = speed;

      this.dx = 1 * this.speed;
      this.dy = 1 * this.speed;
    }
    draw(context) {
      context.beginPath();

      context.strokeStyle = this.color;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.font = "50px Arail";
      context.fillText(this.text, this.xpos, this.ypos);

      context.strokeStyle = "#F7374F";
      context.lineWidth = 5;
      context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false);
      context.stroke();
      context.closePath();
    }
    update() {
      ctx.clearRect(0, 0, window_width, window_height);

      this.draw(ctx);
      this.text = hit_counter;
      if (this.xpos + 2 * this.radius > window_width) {
        this.dx = -this.dx;
        hit_counter++;
      }
      if (this.xpos - 2 * this.radius < 0) {
        this.dx = -this.dx;
        hit_counter++;
      }

      if (this.ypos + 2 * this.radius > window_height) {
        this.dy = -this.dy;
        hit_counter++;
      }
      if (this.ypos - 2 * this.radius < 0) {
        this.dy = -this.dy;
        hit_counter++;
      }

      this.xpos += this.dx;
      this.ypos += this.dy;
    }
  }

  let random_x = Math.random() * window_width;
  let random_y = Math.random() * window_height;

  let my_circle = new Circle(random_x, random_y, 80, "black", hit_counter, 7);

  my_circle.draw(ctx);

  let updateCircle = function () {
    requestAnimationFrame(updateCircle);
    my_circle.update();
  };
  updateCircle();
}
function many_cricles_fly() {
  class Circle {
    constructor(xpos, ypos, radius, color, speed) {
      this.xpos = xpos;
      this.ypos = ypos;
      this.radius = radius;
      this.color = color;
      this.speed = speed;

      this.dx = 1 * this.speed;
      this.dy = 1 * this.speed;
    }

    draw(context) {
      context.beginPath();
      context.strokeStyle = this.color;
      context.lineWidth = 5;
      context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false);
      context.stroke();
      context.closePath();
    }

    update() {
      if (
        this.xpos + this.radius > window_width ||
        this.xpos - this.radius < 0
      ) {
        this.dx = -this.dx;
      }
      if (
        this.ypos + this.radius > window_height ||
        this.ypos - this.radius < 0
      ) {
        this.dy = -this.dy;
      }

      // Обновление позиции
      this.xpos += this.dx;
      this.ypos += this.dy;
    }
  }
  let all_circles = [];
  for (let i = 0; i < 10; i++) {
    let random_x = Math.random() * (window_width - 100) + 50;
    let random_y = Math.random() * (window_height - 100) + 50;
    let speed = 1 + Math.random() * 3; // Случайная скорость от 1 до 4
    all_circles.push(new Circle(random_x, random_y, 30, "#F7374F", speed));
  }
  function animate() {
    // Очищаем canvas
    ctx.clearRect(0, 0, window_width, window_height);

    // Обновляем и рисуем все круги
    for (let circle of all_circles) {
      circle.update();
      circle.draw(ctx);
    }

    requestAnimationFrame(animate);
  }
  animate();
}

class Circle {
  constructor(xpos, ypos, radius, color, text, speed) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.speed = speed;

    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
  }
  draw(context) {
    context.beginPath();

    context.strokeStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "50px Arail";
    context.fillText(this.text, this.xpos, this.ypos);

    // context.strokeStyle = "#F7374F";
    context.lineWidth = 5;
    context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }
  update() {
    this.draw(ctx);

    if (this.xpos + 2 * this.radius > window_width) {
      this.dx = -this.dx;
    }
    if (this.xpos - 2 * this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.ypos + 2 * this.radius > window_height) {
      this.dy = -this.dy;
    }
    if (this.ypos - 2 * this.radius < 0) {
      this.dy = -this.dy;
    }

    this.xpos += this.dx;
    this.ypos += this.dy;
  }
}

let getDistance = function (xpos1, ypos1, xpos2, ypos2) {
  var result = Math.sqrt(
    Math.pow(xpos2 - xpos1, 2) + Math.pow(ypos2 - ypos1, 2)
  );
  return result;
};

let random_x = Math.random() * window_width;
let random_y = Math.random() * window_height;

let my_circle1 = new Circle(400, 700, 50, "black", "A", 5);
let my_circle2 = new Circle(300, 300, 200, "black", "B", 0); //static circle

my_circle1.draw(ctx);
my_circle2.draw(ctx);

let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height);

  my_circle1.update();
  my_circle2.update();

  const distance = getDistance(
    my_circle1.xpos,
    my_circle1.ypos,
    my_circle2.xpos,
    my_circle2.ypos
  );

  if (distance < my_circle2.radius + my_circle1.radius) {
    my_circle2.color = "blue";
  } else {
    my_circle2.color = "black";
  }
};

updateCircle();
