/*file: snake.js
  description: змейка
  last edit: 25.01.2018
*/

function Snake() {
	this.nodes = [];
	this.direction = "none";
	this.count = 1;

	this.nodes.push(new Point(0, 0));
}

function Apple(x, y) {
	this.position = new Point(x, y);
}

function Point(x, y) {
	this.x = x;
	this.y = y;
}

var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.id = "game:id";
canvas.style.backgroundColor = "#000";
canvas.width = canvas.height = 600;
document.body.appendChild(canvas);

var score = document.createElement("div");
score.id = "score:id";
score.style.font = "15pt sans-serif";
score.style.color = "#000";
score.innerText = "Score: 0";
document.body.appendChild(score);

var help = document.createElement("div");
help.id = "help:id";
help.style.font = "15pt sans-serif";
help.innerHTML = "Help:<br>Movement: WASD or arrows;<br>R for restart.";
document.body.appendChild(help);

var snek = new Snake();
var apple = new Apple(3, 0);
var isGame = true;

function keyHandler(e) {
	switch (e.keyCode) {
		case 37:
		case 65:
			snek.direction = "left";
		break;
		case 38:
		case 87:
			snek.direction = "up";
		break;
		case 39:
		case 68:
			snek.direction = "right";
		break;
		case 40:
		case 83:
			snek.direction = "down";
		break;
		case 82:
			restart();
		break;
	}
}

function init() {
	context.fillStyle = "#fff";
	context.fillRect(0, 0, 40, 40);
	replaceApple();
	window.setInterval(function() { performLogic(); }, 500);
}

function restart() {
	context.clearRect(0, 0, 600, 600);
	snek.nodes.splice(0, snek.count, new Point(0, 0));
	snek.count = 1;
	snek.direction = "none";
	context.fillStyle = "#fff";
	context.fillRect(0, 0, 40, 40);
	score.innerText = "Score: 0";
	replaceApple();

	isGame = true;
}

function replaceApple() {
	apple.position.x = Math.floor(Math.random() * 15);
	apple.position.y = Math.floor(Math.random() * 15);
	// т.к. яблоко отрисовывается каждый проход таймера, закомментировал отрисовку здесь
	//context.fillStyle = "#ff0000";
	//context.fillRect(apple.position.x * 40, apple.position.y * 40, 40, 40);
}

function performLogic() {
	if (snek.direction != "none" && isGame) {
		// делаем движение
		switch (snek.direction) {
			case "left":
				snek.nodes.unshift(new Point(snek.nodes[0].x - 1, snek.nodes[0].y));
			break;
			case "up":
				snek.nodes.unshift(new Point(snek.nodes[0].x, snek.nodes[0].y - 1));
			break;
			case "right":
				snek.nodes.unshift(new Point(snek.nodes[0].x + 1, snek.nodes[0].y));
			break;
			case "down":
				snek.nodes.unshift(new Point(snek.nodes[0].x, snek.nodes[0].y + 1));
			break;
		}
		// если скушали яблоко - добавляем новое звено в конец и перемещаем яблоко
		if (snek.nodes[0].x == apple.position.x && snek.nodes[0].y == apple.position.y) {
			snek.nodes.push(new Point(apple.position.x, apple.position.y));
			score.innerText = "Score: " + (snek.count++);
			replaceApple();
		}
		// вышли за пределы экрана - игра окончена
		if (snek.nodes[0].x > 14 || snek.nodes[0].x < 0 || snek.nodes[0].y > 14 || snek.nodes[0].y < 0)
			gameOver();
		// зацепились за хвост - игра окончена
		for (var i = 1; i < snek.count; i++) {
			if (snek.nodes[i].x == snek.nodes[0].x && snek.nodes[i].y == snek.nodes[0].y) {
				gameOver();
				break;
			}
		}
		// закрашиваем старое звено хвоста
		context.fillStyle = "#000";
		var removed = snek.nodes.pop();
		context.fillRect(removed.x * 40, removed.y * 40, 40, 40); // можно использовать и clearRect, т.к. нужен цвет фона
		// рисуем новое звено хвоста
		context.fillStyle = "#fff";
		context.fillRect(snek.nodes[0].x * 40, snek.nodes[0].y * 40, 40, 40);
		// отрисовываем яблоко каждый каждый кадр, т.к. может случиться, что яблоко появится где-то в хвосте
		context.fillStyle = "#ff0000";
		context.fillRect(apple.position.x * 40, apple.position.y * 40, 40, 40);
		//console.log(snek.nodes);	
	}
}

function gameOver()
{
	isGame = false;
	snek.direction = "none";
	//context.clearRect(0, 0, 600, 600);
	context.fillStyle = "#ee0000";
	context.font = "20pt sans-serif";
	context.fillText("Game Over!", 240, 250);
	context.fillText("Your score: " + (snek.count - 1), 236, 280);
	context.fillText("Press R to restart", 210, 310);
}

window.onload = function () {
	init();
}

document.addEventListener("keyup", function(e) { keyHandler(e); }, false);