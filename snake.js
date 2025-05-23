const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const box = 20;
const canvasSize = 20 * 20;
let score = 0;
let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };
let food = {
    x: Math.floor(Math.random() * (canvasSize / box)) * box,
    y: Math.floor(Math.random() * (canvasSize / box)) * box
};
let d;
let game;
const bg = new Image();
bg.src = 'bg.png';

document.addEventListener('keydown', direction);
document.getElementById('start').addEventListener('click', startGame);

function startGame() {
    snake = [];
    snake[0] = { x: 10 * box, y: 10 * box };
    score = 0;
    updateScore();
    food = {
        x: Math.floor(Math.random() * (canvasSize / box)) * box,
        y: Math.floor(Math.random() * (canvasSize / box)) * box
    };
    clearInterval(game);
    game = setInterval(draw, 100);
}

function direction(event) {
    if (event.keyCode == 37 && d !== 'RIGHT') d = 'LEFT';
    else if (event.keyCode == 38 && d !== 'DOWN') d = 'UP';
    else if (event.keyCode == 39 && d !== 'LEFT') d = 'RIGHT';
    else if (event.keyCode == 40 && d !== 'UP') d = 'DOWN';
}

function draw() {
    context.drawImage(bg, 0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = (i === 0) ? "#00ff88" : "#66ffcc";
        context.fillRect(snake[i].x, snake[i].y, box, box);
        context.strokeStyle = "#000";
        context.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    context.fillStyle = "#ff4d4d";
    context.fillRect(food.x, food.y, box, box);
    context.strokeStyle = "#ff9999";
    context.strokeRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d === 'LEFT') snakeX -= box;
    if (d === 'UP') snakeY -= box;
    if (d === 'RIGHT') snakeX += box;
    if (d === 'DOWN') snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        updateScore();
        food = {
            x: Math.floor(Math.random() * (canvasSize / box)) * box,
            y: Math.floor(Math.random() * (canvasSize / box)) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if (
        snakeX < 0 || snakeY < 0 || 
        snakeX >= canvas.width || snakeY >= canvas.height || 
        collision(newHead, snake)
    ) {
        clearInterval(game);
        alert("Game Over! Your score: " + score);
    }

    snake.unshift(newHead);
}

function updateScore() {
    document.getElementById('score').textContent = "Score: " + score;
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}
