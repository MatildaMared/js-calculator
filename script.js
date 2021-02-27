let currentInput = "";
let currentInputDisplay = document.querySelector(".result");

let numbers = document.querySelectorAll(".number");
console.log(numbers);
numbers.forEach(number => {
    number.addEventListener("click", () => {
        console.log("Click!");
        let input = number.innerHTML;
        currentInput += input;
        currentInputDisplay.innerHTML = currentInput;
    })
})