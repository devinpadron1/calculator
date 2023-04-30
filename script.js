document.addEventListener("DOMContentLoaded", () => {
    // Initialize variables
    let num1 = 0;
    let num2 = 0;
    let total = 0;
    let operator;
    let replaceTracker = true; // If equal to true will replace displayed value
    let numTracker = true; // If true then value will be assigned to num1, else num2
    let equalsClicked = false; // if clear button was just clicked
    let operatorClicked = true;
    let operatorCounter = 0;
    
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
            // Prevent number from being concatenated onto zero (i.e. 0024).
            if (button.textContent == 0 && displayMain.textContent == 0) {
                // do nothing 
            } else {
                // reset values if equals was previously clicked without operator in between
                if (equalsClicked) {
                    resetVariables();
                } else {
                    equalsClicked = false;
                    operatorClicked = false;
                }
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
                    numTracker ? (num1 += button.textContent) : (num2 += button.textContent);
                } 
            }
        })  
    })

    // Operator Buttons
    operatorButtons.forEach((button) => {
        button.addEventListener("click", () => {
            // if operator was clicked back-to-back times
            if (operatorClicked) { 
                displayEqn.textContent = num1 + ' ' + button.textContent + ' ';
            } else {
                operatorCounter ++;
                if (operatorCounter == 2) {
                    equalsOperation();
                    operatorCounter --;
                }
                displayEqn.textContent += ` ${button.textContent} `;
            }
            operator = button.textContent;
            replaceTracker = true;
            numTracker = false;
            equalsClicked = false;
            operatorClicked = true;
        })  
    })

    // Equals Operator
    equalsButton.addEventListener("click", () => {
        equalsOperation();
    })

    // Clear button
    clearButton.addEventListener("click", () => {
        updateDisplay(0);
        resetVariables();
        equalsClicked = false;
    })
    
    // Sign change
    signChange.addEventListener("click", () => {
        // if in num1 and number isnt 0
        if (operatorCounter == 0 && num1 !== 0) {
            num1 = num1 * -1;
            updateDisplay(num1);
        } else if (operatorCounter > 0 && num2 !== 0) { // else if in num2 and number isnt 0
            num2 = num2 * -1;
            displayMain.textContent = num2;
            displayEqn.textContent = num1 + ' ' + operator + num2 + ' ';
        }
    })

    function resetVariables() {
        num1 = 0;
        num2 = 0;
        total = 0;
        replaceTracker = true;
        numTracker = true;
        operatorClicked = false;
        operatorCounter = 0;
        operatorClicked = false;
    }

    function equalsOperation() {
        if (operatorCounter > 0 && !equalsClicked) {
            total = operate(operator, Number(num1), Number(num2));
            updateDisplay(total);
            num1 = total;
            num2 = 0;
            replaceTracker = true;
            numTracker = false;
            equalsClicked = true;
            operatorClicked = false;
        }
    }

    function updateDisplay(value) {
        displayMain.textContent = value;
        displayEqn.textContent = value;
    }
});

// TODO: Make display text shrink if number of digits is large enough
// TODO: Add decimal functionality
// TODO: Add negative number functionality
// TODO: Listen for keyboard input