document.addEventListener("DOMContentLoaded", () => {
    // Initialize variables
    let num1 = 0;
    let num2 = 0;
    let total = 0;
    let operator;
    let replaceTracker = true; // If equal to true will replace displayed value
    let numTracker = true; // If true then value will be assigned to num1, else num2
    
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
    const displayMain = document.getElementById('display');
    const displayEqn = document.getElementById('equation');
    const signChange = document.querySelector('.sign');
    const clearButton = document.querySelector('.clear');
    
    // Loop through each numbered button
    numberedButtons.forEach((button) => {
        // Add an event listener when a button is clicked
        button.addEventListener("click", () => {
            // TODO: Prevent number from being concatenated onto zero (i.e. 0024).
            // Replace value being displayed
            if (replaceTracker) {
                // Change the display to whatever was clicked.
                displayMain.textContent = button.textContent;
                if (numTracker) {
                    displayEqn.textContent = button.textContent;
                    num1 = displayMain.textContent;
                } else {
                    displayEqn.textContent += button.textContent;
                    num2 = displayMain.textContent;
                }
                // No longer replace number
                replaceTracker = false;
            } else {
                displayMain.textContent += button.textContent;
                displayEqn.textContent += button.textContent;
                // Concatenate text
                numTracker ? (num1 += button.textContent) : (num2 = button.textContent);
            }
        })  
    })

    // Operator Buttons
    operatorButtons.forEach((button) => {
        button.addEventListener("click", () => {
            displayEqn.textContent += ` ${button.textContent} `;
            operator = button.textContent;
            replaceTracker = true;
            numTracker = false;
        })  
    })

    // Equals Operator
    equalsButton.addEventListener("click", () => {
        total = operate(operator, Number(num1), Number(num2));
        displayMain.textContent = total;
        num1 = operate(operator, Number(num1), Number(num2));
        num2 = 0;
        if (total == 0) {
            replaceTracker = true;
        }
        replaceTracker = false;
        numTracker = false;
        // TODO: Clear main and equation displays after a number is pressed after equal sign (result)
    })

    // Clear button
    clearButton.addEventListener("click", () => {
        displayMain.textContent = 0;
        displayEqn.textContent = 0;
        num1 = 0;
        num2 = 0;
        replaceTracker = true;
        numTracker = true;
    })
});

