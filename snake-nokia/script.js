function handle(evnt) {
 //from this comment to next comment, code from (https://css-tricks.com/scaled-proportional-blocks-with-css-and-javascript/)
 let scaledWrapper = document.getElementsByClassName('body')[0];
 let applyScaling = scaledWrapper => {
  let scaledContent = scaledWrapper.getElementsByClassName('container')[0];
  scaledContent.style.transform = 'scale(1, 1)';
  let { width: cw, height: ch } = scaledContent.getBoundingClientRect();
  let { width: ww, height: wh } = scaledWrapper.getBoundingClientRect();
  let scaleAmtX = Math.min(ww / cw, wh / ch);
  let scaleAmtY = scaleAmtX;
  scaledContent.style.transform = `scale(${scaleAmtX}, ${scaleAmtY})`;
 };

 applyScaling(scaledWrapper);
 //next comment
}
window.onresize = handle;
var speed = 6;
var highscore = 0;
var score = 0;
var oldhigh = 0;
var newhigh = 0;
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var grid = canvas.height / 16;
var count = 0;
var snake = {
 x: 3 * grid,
 y: 3 * grid,
 dx: grid,
 dy: 0,
 cells: [],
 maxCells: 4
};
var apple = {
 x: 10 * grid,
 y: 10 * grid
};
function getRandomInt(min, max) {
 return Math.floor(Math.random() * (max - min)) + min;
}
function settingsbtn() {
 document.getElementById('scoreborder').style.display = "none";
 document.getElementById('settingsborder').style.display = "block";
 document.getElementById('settingsbtn').style.display = "none";
 document.getElementById('settingsbtnclose').style.display = "block";
 homescreen()
}
function settingsbtnclose() {
 document.getElementById('scoreborder').style.display = "block";
 document.getElementById('settingsborder').style.display = "none";
 document.getElementById('settingsbtn').style.display = "block";
 document.getElementById('settingsbtnclose').style.display = "none";
}
function clear() {
 snake.x = 3 * grid;
 snake.y = 3 * grid;
 snake.cells = [];
 snake.maxCells = 4;
 snake.dx = grid;
 snake.dy = 0;
 apple.x = getRandomInt(0, 26) * grid;
 apple.y = getRandomInt(0, 16) * grid;

}
function homescreen() {
 document.getElementById('homescreen').style.display = "block";
 document.getElementById('game').style.display = "none";
 document.getElementById('gameover').style.display = "none";
 function change_value(score) { return 0; } score = change_value(score);
 showscore()
}
function gameover() {
 document.getElementById('gameover').style.display = "block";
 document.getElementById('game').style.display = "none";
 oldhigh = highscore;
 showhigh()
}
function startgame() {
 clear()
 document.getElementById('homescreen').style.display = "none";
 document.getElementById('gameover').style.display = "none";
 document.getElementById('game').style.display = "block";
}
function showscore() {
 document.getElementById("score").innerHTML = score;
 if (highscore > oldhigh) {
  document.getElementById("gameovertxt").innerHTML = "New Best!";
 } else {
  document.getElementById("gameovertxt").innerHTML = "Game Over!";
 }
}
function showhigh() {
 document.getElementById("highscore").innerHTML = highscore;
}

function showspeed() {
 document.getElementById("speed").innerHTML = speed;
}

function speedup() {
 if (speed < 10 && document.getElementById('settingsborder').style.display === "block") {
  speed = speed + 1
 }
 showspeed()
}

function speeddown() {
 if (speed > 0 && document.getElementById('settingsborder').style.display === "block") {
  speed = speed - 1
 }
 showspeed()
}

function enterbtn() {
 if (document.getElementById('gameover').style.display === "block") {
  homescreen()
 } else {
  startgame()
 }
}

function moveleft() {
 if (snake.dx === 0) {
  snake.dx = -grid;
  snake.dy = 0;
 }
}

function moveright() {
 if (snake.dx === 0) {
  snake.dx = grid;
  snake.dy = 0;
 }
}

function moveup() {
 if (snake.dy === 0) {
  snake.dy = -grid;
  snake.dx = 0;
 }
}

function movedown() {
 if (snake.dy === 0) {
  snake.dy = grid;
  snake.dx = 0;
 }
}

function moveupleft() {
 if (snake.dy === 0) {
  snake.dy = -grid;
  snake.dx = 0;
 } else {
  snake.dx = -grid;
  snake.dy = 0;
 }
}

function moveupright() {
 if (snake.dy === 0) {
  snake.dy = -grid;
  snake.dx = 0;
 } else {
  snake.dx = grid;
  snake.dy = 0;
 }
}

function movedownleft() {
 if (snake.dy === 0) {
  snake.dy = grid;
  snake.dx = 0;
 } else {
  snake.dx = -grid;
  snake.dy = 0;
 }
}

function movedownright() {
 if (snake.dy === 0) {
  snake.dy = grid;
  snake.dx = 0;
 } else {
  snake.dx = grid;
  snake.dy = 0;
 }
}

//from this comment to next comment, code for snake movement, speed and apple logic based on (https://iqcode.com/code/html/snake-game-html-code)
function loop() {
 requestAnimationFrame(loop);
 if (++count < 12 - speed) {
  return;
 }
 count = 0;
 context.clearRect(0, 0, canvas.width, canvas.height);
 snake.x += snake.dx;
 snake.y += snake.dy;
 if (snake.x < 0 && document.getElementById('homescreen').style.display === "none") {
  gameover()
 }
 else if (snake.x >= canvas.width && document.getElementById('homescreen').style.display === "none") {
  gameover()
 }
 if (snake.y < 0 && document.getElementById('homescreen').style.display === "none") {
  gameover()
 }
 else if (snake.y >= canvas.height && document.getElementById('homescreen').style.display === "none") {
  gameover()
 }
 snake.cells.unshift({ x: snake.x, y: snake.y });
 if (snake.cells.length > snake.maxCells) {
  snake.cells.pop();
 }
 context.fillStyle = '#333';
 context.fillRect(apple.x + 8.33, apple.y, grid - 16.66, grid - 16.66,);
 context.fillRect(apple.x + 8.33, apple.y + 16.66, grid - 16.66, grid - 16.66,);
 context.fillRect(apple.x, apple.y + 8.33, grid - 16.66, grid - 16.66,);
 context.fillRect(apple.x + 16.66, apple.y + 8.33, grid - 16.66, grid - 16.66,);
 snake.cells.forEach(function (cell, index) {
  context.fillRect(cell.x, cell.y, grid, grid);
  if (cell.x === apple.x && cell.y === apple.y) {
   snake.maxCells++;
   score++;
   apple.x = getRandomInt(0, 26) * grid;
   apple.y = getRandomInt(0, 16) * grid;
   if (score > highscore) {
    highscore = score;
   }
   showscore()
  }
  for (var i = index + 1; i < snake.cells.length; i++) {
   if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y && document.getElementById('homescreen').style.display === "none") {
    gameover()
   }
  }
 });
}
document.addEventListener('keydown', function (e) {
 if (e.which === 37 && snake.dx === 0) {
  snake.dx = -grid;
  snake.dy = 0;
 }
 else if (e.which === 38 && snake.dy === 0) {
  snake.dy = -grid;
  snake.dx = 0;
 }
 else if (e.which === 39 && snake.dx === 0) {
  snake.dx = grid;
  snake.dy = 0;
 }
 else if (e.which === 40 && snake.dy === 0) {
  snake.dy = grid;
  snake.dx = 0;
 }
});
requestAnimationFrame(loop);
//next comment
