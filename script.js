// ################# VARIABLE DECLARATIONS ################### //

const display = document.querySelector(".result"); // The display
let currentInput = ""; // The current input
let savedInput = ""; // The saved input
let currentOperator = ""; // Current operator
let result = ""; // Computed result to be shown in display
const operators = document.querySelectorAll(".operator"); // The operators of the calculator
const numbers = document.querySelectorAll(".number"); // The numbers of the calculator
const calculate = document.querySelector(".calculate"); // The calculate button
const clear = document.querySelector(".clear"); // The clear button
const posOrNeg = document.querySelector(".posOrNeg"); // The +/- button
const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]; // Valid numbers
const operatorKeys = ["+", "-", "/", "*"] // Valid operators
const calculateKey = "="; // Calculate sign
const root = document.querySelector(":root"); // Get the root element for CSS variables


// ################# CALCULATOR FUNCTIONALITY ################### //

// Shows the result and reset variables after clicking the calculate button
const displayAndReset = function () {
	operators.forEach(operator => {
		operator.classList.remove("active");
	});
	if (result.toString().length > 14) {
		result = result.toFixed(6);
	}
	display.innerHTML = result;
	savedInput = result;
	currentInput = "";
	result = "";
};


// Calculates and calls the displayAndReset function to show the result and reset the variables
const calcResult = function () {
	if (savedInput !== "" && currentInput !== "") {
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
			if (currentInput === "0" || savedInput === "0") {
				result = 0;
			} else {
				result = Number(savedInput) / Number(currentInput);
			}
			displayAndReset();
		}
    } else if(!savedInput) {
		savedInput = currentInput;
		currentInput = "";
    }
};

// Calls the calcResult function if a user clicks the calculate button
calculate.addEventListener("click", () => {
	calcResult();
});

// Clears the display and variables
clear.addEventListener("click", () => {
	displayAndReset();
});

// Display the numbers in the display and updates variable currentInput
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

// Update currentOperator variable
operators.forEach((operator) => {
	operator.addEventListener("click", (e) => {
		calcResult();
		currentOperator = e.target.id;
		operator.classList.add("active");
	});
});

// Switch current number to a positive or negative number, update the display and savedInput variable
posOrNeg.addEventListener("click", () => {
	let input = display.textContent;
	input = -input;
	display.textContent = input;
	savedInput = input;
})

// ################# HANDLE KEYBOARD INPUTS ################### //

document.addEventListener("keydown", (e) => {
	if (operatorKeys.includes(e.key)) {
		if (e.key === "+") {
			calcResult();
			currentOperator = "add";
			document.getElementById("add").classList.add("active");
		} else if (e.key === "-") {
			calcResult();
			currentOperator = "subtract";
			document.getElementById("subtract").classList.add("active");
		} else if (e.key === "*") {
			calcResult();
			currentOperator = "multiply";
			document.getElementById("multiply").classList.add("active");
		} else if (e.key === "/") {
			calcResult();
			currentOperator = "divide";
			document.getElementById("divide").classList.add("active");
		}
	} else if (numberKeys.includes(e.key)) {
		let input = e.key;
		currentInput += input;
		display.textContent = currentInput;
		operators.forEach((operator) => {
			operator.classList.remove("active");
		});
	}
});

document.addEventListener("keyup", (e) => {
	if (e.key === "Escape") {
		displayAndReset();
	} else if (e.key === "Enter") {
		calcResult();
	}
});


// ################# COLOR THEMES FUNCTIONALITY ################### //

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
		"#A080E8",
		"#BEA2FF",
		"#E5C2FF",
		"rgba(255, 255, 255, .7)",
		"#ACECE8",
		"#75E6DE",
		"#52B4AE",
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
	funnyHatsFriday: [
		"#460273",
		"#7C17BF",
		"#9F4DD6",
		"rgba(255, 255, 255, .7)",
		"#FFEF9D",
		"#F2D22E",
		"#F2B705",
	],
	javascriptIsFun: [
		"#323232",
		"#3c3c3c",
		"#545454",
		"rgba(255, 255, 255, .6)",
		"#E7BE64",
		"#DE9700",
		"#C98900",
	]
};

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