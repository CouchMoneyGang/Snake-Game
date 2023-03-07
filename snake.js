// Get the canvas element from the HTML document
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set the width and height of the canvas
canvas.width = 400;
canvas.height = 400;

// Set the initial position and direction of the snake
let snake = [{x: 10, y: 10}];
let direction = "right";

// Set the initial position of the food
let food = {x: 200, y: 200};

// Set the initial score to 0
let score = 0;

// Move the snake
function moveSnake() {
	// Get the current position of the snake's head
	let head = {x: snake[0].x, y: snake[0].y};

	// Update the position of the head based on the direction
	if(direction == "right") {
		head.x += 10;
	}
	else if(direction == "left") {
		head.x -= 10;
	}
	else if(direction == "up") {
		head.y -= 10;
	}
	else if(direction == "down") {
		head.y += 10;
	}

	// Add the new head to the beginning of the snake array
	snake.unshift(head);

	// Check if the snake has collided with the wall or itself
	if(snake[0].x < 0 || snake[0].x >= canvas.width || 
		snake[0].y < 0 || snake[0].y >= canvas.height || 
		checkCollision()) {
		clearInterval(intervalId);
		alert("Game over! Your score is " + score);
	}

	// Check if the snake has eaten the food
	if(snake[0].x == food.x && snake[0].y == food.y) {
		// Generate new food
		food = generateFood();

		// Increase score
		score++;

		// Update score on the HTML page
		document.getElementById("score").textContent = score;
	}
	else {
		// Remove the last element of the snake array
		snake.pop();
	}

	// Clear the canvas and redraw the snake and food
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawSnake();
	drawFood();
}

// Draw the snake on the canvas
function drawSnake() {
	ctx.fillStyle = "green";
	snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 10, 10));
}

// Draw the food on the canvas
function drawFood() {
	ctx.fillStyle = "red";
	ctx.fillRect(food.x, food.y, 10, 10);
}

// Generate new food
function generateFood() {
	let x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
	let y = Math.floor(Math.random() * (canvas.height / 10)) * 10;

	for(let i=0; i<snake.length; i++) {
		if(snake[i].x == x && snake[i].y == y) {
			return generateFood();
		}
	}

	return {x: x, y: y};
}

// Check if the snake has collided with itself
function checkCollision() {
	for(let i=1; i<snake.length; i++) {
		if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
			return true;
		}
	}

	return false;
}

// Handle keyboard events
document.addEventListener("keydown", event => {
	if(event.key == "ArrowRight" && direction != "left") {
		direction = "right";
	}
	else if(event.key == "ArrowLeft" && direction != "right") {
		direction = "left";
	}
	else if(event.key == "ArrowUp" && direction != "down") {
		direction = "up";
	}
	else if(event.key == "ArrowDown" && direction != "up") {
		direction = "down";
	}
});

// Start the game loop
let intervalId = setInterval(moveSnake, 100);