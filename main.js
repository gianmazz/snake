
let totCellsX = 30;
let totCellsY = 30;

let time = 0;
let updateTime = 10;

let dx, dy;

let apple;
let snake = [];

function setup(){
  createCanvas(600, 600);
  dx = width / totCellsX;
  dy = height / totCellsY;

  applePosition();
  snakeInitialize();
  //console.log(apple);
}

function draw(){
  background(200);
  if (time === updateTime){
    for (let i = snake.length - 1; i > 0; i--){
      snake[i].x = snake[i-1].x;
      snake[i].y = snake[i-1].y;
    }
    snake[0].update(0, 0);
    time = 0;
  }
  check(apple, snake);
  apple.draw();
  for (let i = 0; i < snake.length; i++){
    snake[i].draw();
  }
  //snake[0].draw();
  drawGrid();
  time += 1;
}

function snakeInitialize(){
  snake = [new Body(Math.floor(Math.random() * totCellsX) * dx, Math.floor(Math.random() * totCellsY) * dy, dx, dy)];
}

function increaseBody(){
  let n = snake.length;
  let vx = snake[0].vx;
  let vy = snake[0].vy;
  let x = snake[n-1].x;
  let y = snake[n-1].y;
  if (vx > 0){
    x = x - dx;
  }else if (vx < 0){
    x = x + dx;
  }
  if (vy > 0){
    y = y - dy;
  }else if (vy < 0){
    y = y + dy;
  }

  snake.push(new Body(x, y, dx, dy));
  //console.log(snake);
}

function check(apple, snake){
  if ((snake[0].x < 0) || (snake[0].x > width) || (snake[0].y < 0) || (snake[0].y > height)){
    snakeInitialize();
  }
  for (let i = 1; i < snake.length; i++){
    if ((snake[0].x === snake[i].x) && (snake[0].y === snake[i].y)){
      snakeInitialize();
    }
  }
  if ((apple.x === snake[0].x) && (apple.y === snake[0].y)){
    applePosition();
    increaseBody();
  }
}

function applePosition(){
  apple = new Body(Math.floor(Math.random() * totCellsX) * dx, Math.floor(Math.random() * totCellsY) * dy, dx, dy);
  apple.color[0] = 255;
}

function drawGrid(){
  let thickness = 2;

  for (let i = 0; i < totCellsX + 1; i++){
    push();
    stroke(0);
    strokeWeight(thickness);
    line(i * dx, 0, i * dx, height)
    pop();
  }

  for (let i = 0; i < totCellsY + 1; i++){
    push();
    stroke(0);
    strokeWeight(thickness);
    line(0, i * dy, width, i * dy)
    pop();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    snake[0].update(-dx, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake[0].update(dx, 0);
  } else if (keyCode === UP_ARROW){
    snake[0].update(0, -dy);
  } else if (keyCode === DOWN_ARROW){
    snake[0].update(0, dy);
  }
}

function keyTyped() {
  if (key === 'p') {
    snake[0].vx = 0;
    snake[0].vy = 0;
  }
}