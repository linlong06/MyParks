var numOfColors = 6;
var colors = generateRandomColors(numOfColors);
var pickedColor = colors[Math.floor(Math.random() * colors.length)];
var displayColor = document.querySelector("#colorDisplay");
var headerColor = document.querySelector(".header");
var message = document.querySelector("#message");
var squares = document.querySelectorAll(".square");
var reset = document.querySelector("#reset");
var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");

displayColor.textContent = pickedColor;

reset.addEventListener("click", function(){
	resetColors(numOfColors);
});

easy.addEventListener("click", function(){
	easy.classList.add("selected");
	hard.classList.remove("selected");
	numOfColors = 3;
	resetColors(numOfColors);
	for (var i = 3; i < 6; i++) {
		squares[i].style.display = "none";
	}
});

hard.addEventListener("click", function(){
	hard.classList.add("selected");
	easy.classList.remove("selected");
	numOfColors = 6;
	resetColors(numOfColors);
	for (var i = 3; i < 6; i++) {
		squares[i].style.display = "block";
	}
});

for (var i = 0; i < squares.length; i++) {
	squares[i].style.backgroundColor = colors[i];
	squares[i].addEventListener("click", function(){
		if (this.style.backgroundColor === pickedColor) {
			for (var i = 0; i < squares.length; i++) {
				squares[i].style.backgroundColor = pickedColor;
			}
			message.textContent = "Correct!";
			reset.textContent = "Play Again?"
			headerColor.style.backgroundColor = pickedColor;
		}
		else {
			this.style.backgroundColor = "#232323";
			message.textContent = "Try Again!";
		}
	})
}

function generateRandomColors(num) {
	var arr = [];
	for (var i = 0; i < num; i++) {
		arr.push(randomColor());
	}
	return arr;
}

function randomColor() {
	var R = Math.floor(Math.random() * 256);
	var G = Math.floor(Math.random() * 256);
	var B = Math.floor(Math.random() * 256);
	return "rgb(" + R + ", " + G + ", " + B + ")";
	//"rgb(255, 0, 0)"
}

function resetColors(num) {
	reset.textContent = "New Colors"
	colors = generateRandomColors(num);
	pickedColor = colors[Math.floor(Math.random() * colors.length)];
	displayColor.textContent = pickedColor;
	message.textContent = "";
	for (var i = 0; i < colors.length; i++) {
		squares[i].style.backgroundColor = colors[i];
	}
	headerColor.style.backgroundColor = "steelblue";
}