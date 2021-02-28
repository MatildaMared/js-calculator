// The display
const display = document.querySelector(".result");

// The number that is to be shown in the calculator display
let currentInput = "";

// The saved input
let savedInput = "0";

// Current operator
let currentOperator = "";

// Computed result to be shown in display
let result = "";

// The operators of the calculator
const operators = document.querySelectorAll(".operator");

// The numbers of the calculator
const numbers = document.querySelectorAll(".number");

// The compute button
const compute = document.querySelector(".compute");

// The clear button
const clear = document.querySelector(".clear");

// Shows the current numbers in the display and updates variable currentInput
numbers.forEach((number) => {
	number.addEventListener("click", () => {
		let input = number.innerHTML;
		currentInput += input;
		display.textContent = currentInput;
	});
});

// Function to show the result and reset variables after clicking the compute button
const displayAndReset = function () {
	if (result.toString().length > 14) {
		result = result.toFixed(6);
	}
	display.textContent = result;
	savedInput = result;
	currentInput = "";
    result = "";
    console.log(savedInput);
};

// Computes the current calculation and calls the displayAndReset function to show the result and resets the variables
const calcResult = function () {
    if (savedInput) {
        if (currentOperator === "add") {
			result = Number(savedInput) + Number(currentInput);
			displayAndReset();
		} else if (currentOperator === "subtract") {
			result = Number(savedInput) - Number(currentInput);
			displayAndReset();
		} else if (currentOperator === "multiply") {
			result = Number(savedInput) * Number(currentInput);
			displayAndReset();
		} else if (currentOperator === "divide") {
			result = Number(savedInput) / Number(currentInput);
			displayAndReset();
		}
    } else {
        savedInput = currentInput;
        currentInput = "";
    }
};

// Saves the current input and chosen operator in variables and sets currentInput valuable to empty again
operators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        console.log(`The saved input is ${savedInput}. The current input is ${currentInput}. The current operator is ${currentOperator}`);
        calcResult();
        currentOperator = e.target.id;
	});
});

// Calls the calcResult function if a user clicks the equals button
compute.addEventListener("click", () => {
	calcResult();
});

// Clears the display and variables
clear.addEventListener("click", () => {
	displayAndReset();
});

// Themes colors
const themes = {
	defaultIsBoring: ["mediumpurple", "rgba(255, 255, 255, .8)", "rgb(94, 61, 161)", "rgb(206, 124, 162)"],
	iceCreamTuesday: ["lemonchiffon", "rgba(0, 0, 0, .7)", "palegreen", "blue"],
};

// Get the root element where the CSS variables is
const root = document.querySelector(":root");

// Themes switcher
const changeTheme = function (colorBackground, colorFont, colorCalculator, colorOperators) {
	root.style.setProperty("--color-background", colorBackground);
	root.style.setProperty("--color-font", colorFont);
	root.style.setProperty("--color-calculator", colorCalculator);
	root.style.setProperty("--color-operators", colorOperators);
};

const themesLinks = document.querySelectorAll("li.themes__item");
themesLinks.forEach(link => {
	link.addEventListener("click", e => {
		changeTheme(...themes[e.target.id]);
	})
});