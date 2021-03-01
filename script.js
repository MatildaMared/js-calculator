// The display
const display = document.querySelector(".result");

// The number that is to be shown in the calculator display
let currentInput = "";

// The saved input
let savedInput = "";

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
		operators.forEach((operator) => {
			operator.classList.remove("active");
		});
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
			if (!Number(currentInput) || !Number(savedInput)) {
				result = 0;
			} else {
				result = Number(savedInput) / Number(currentInput);
			}
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
		operator.classList.add("active");
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
	defaultIsBoring: [
		"#58748C",
		"#7B92A6",
		"#9AABBB",
		"rgba(255, 255, 255, .7)",
		"#EADBDB",
		"#D9B0B0",
		"#c59595",
	],
	iceCreamTuesday: [
		"#8784aa",
		"#81b6b2",
		"#F1D6F1",
		"#EEF6C3",
		"#EEF6C3",
		"#F4C1F2",
		"#da96d7",
	],
	needMoreCoffee: [
		"#4D3F35",
		"#8b7a62",
		"#DBCDAD",
		"rgba(255, 255, 255, .7)",
		"#9ED1CF",
		"#72BAB8",
		"#62A3A1",
	],
};

// Get the root element where the CSS variables is
const root = document.querySelector(":root");

// Themes switcher
const changeTheme = function (colorDark, colorPrimary, colorPrimaryLight, colorFont, colorAccentLight, colorAccent, colorAccentDark) {
	root.style.setProperty("--color-dark", colorDark);
	root.style.setProperty("--color-primary", colorPrimary);
	root.style.setProperty("--color-primary-light", colorPrimaryLight);
	root.style.setProperty("--color-font", colorFont);
	root.style.setProperty("--color-accent-light", colorAccentLight);
	root.style.setProperty("--color-accent", colorAccent);
	root.style.setProperty("--color-accent-dark", colorAccentDark);
};

const themesLinks = document.querySelectorAll("li.themes__item");
themesLinks.forEach(link => {
	link.addEventListener("click", e => {
		themesLinks.forEach(li => {
			li.classList.remove("themes__item--active");
		})
		console.log(e.target);
		e.target.classList.add("themes__item--active");
		changeTheme(...themes[e.target.id]);
	})
});

// Closes drop-down menu if user clicks somewhere
const checkbox = document.querySelector(".themes__checkbox");
const label = document.querySelector(".themes__label");

checkbox.addEventListener("click", function () {
	if (this.checked) {
		document.addEventListener("click", e => {
			if (e.target != checkbox && e.target != label) {
				checkbox.checked = false;
			}	
		});
	}
});