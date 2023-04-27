document.addEventListener("DOMContentLoaded", () => {
    // Initialize variables
    let num1 = 0;
    let num2 = 0;
    let total = 0;
    let operator;
    let replaceTracker = true; // If equal to true will replace displayed value
    let numTracker = true; // If true then value will be assigned to num1
    
    // Operations
    let sum = (num1, num2) => num1 + num2;
    let subtract = (num1, num2) => num1 - num2;
    let multiply = (num1, num2) => num1 * num2;    
    let divide = (num1, num2) => num1 / num2;
    
    // Operate
    function operate(operator, num1, num2) {
        const operations = {
            '+': sum,
            '-': subtract,
            'x': multiply,
            '/': divide,
        }
        return operations[operator](num1, num2);
    }
    
    // Create objects
    const numberedButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator');
    const equalsButton = document.querySelector('.equals');
    const displayObj = document.getElementById('display');
    const clearButton = document.querySelector('.clear');
    
    // Loop through each numbered button
    numberedButtons.forEach((button) => {
        // Add an event listener when a button is clicked
        button.addEventListener("click", () => {
            // We want the value of 0 to be replaced, not concatenated on
            if (replaceTracker) {
                // Change the display to whatever was clicked.
                displayObj.textContent = button.textContent;
                // Assign number to variable
                num1 = displayObj.textContent;
                // No longer replace number
                replaceTracker = false;
            } else {
                displayObj.textContent += button.textContent;
                if (numTracker) {
                    num1 += button.textContent;
                } else {
                    num2 += button.textContent;
                }
            }
            }
        )  
    })

    // Operator Buttons
    operatorButtons.forEach((button) => {
        button.addEventListener("click", () => {
            operator = button.textContent;
            numTracker = false;
        }
        )  
    })

    // Equals Operator
    equalsButton.addEventListener("click", () => {
        total = operate(operator, Number(num1), Number(num2));
        displayObj.textContent = total;
        num1 = operate(operator, Number(num1), Number(num2));
        num2 = 0;
        if (total == 0) {
            replaceTracker = true;
        }
        replaceTracker = false;
        numTracker = false;
    })

    // Clear button
    clearButton.addEventListener("click", () => {
        displayObj.textContent = 0;
        num1 = 0;
        num2 = 0;
        replaceTracker = true;
        numTracker = true;
    })
});