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
    let decimalClicked = false;
    
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
    const delButton = document.querySelector('.backspace');
    const decimalButton = document.querySelector('.decimal');
    
    // Loop through each numbered button
    numberedButtons.forEach((button) => {
        // Add an event listener when a button is clicked
        button.addEventListener("click", () => {
            // Prevent number from being concatenated onto zero (i.e. 0024).
            if (button.textContent == 0 && displayMain.textContent == 0 && !decimalClicked) {
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
            decimalClicked = false;
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
    
    // Backspace (DEL) button
    delButton.addEventListener("click", () => {
        if ((operatorCounter == 0 && num1 !== 0) || (operatorCounter > 0 && equalsClicked)) {
            // multi-digit condition
            num1 = Number(num1.toString().slice(0,-1));
            updateDisplay(num1);
            // single digit condition
            if (num1 == 0) {
                replaceTracker = true;
                decimalClicked = false;
            }
        } else if (operatorCounter > 0 && num2 !== 0) { // else if in num2 and number isnt 0
            num2 = Number(num2.toString().slice(0,-1));
            if (num2 == 0) {
                displayMain.textContent = num2;
                displayEqn.textContent = num1 + ' ' + operator + ' ';
                replaceTracker = true;
                decimalClicked = false;
            } else {
                displayMain.textContent = num2;
                displayEqn.textContent = num1 + ' ' + operator + ' ' + num2;
            }
        }
    })

    // Sign change
    signChange.addEventListener("click", () => {
        // if in num1 and number isnt 0
        if ((operatorCounter == 0 && num1 !== 0) || (operatorCounter > 0 && equalsClicked)) {
            num1 = num1 * -1;
            updateDisplay(num1);
        } else if (operatorCounter > 0 && num2 !== 0) { // else if in num2 and number isnt 0
            num2 = num2 * -1;
            if (num2 > 0) {
                displayEqn.textContent = num1 + ' ' + operator + num2 + ' ';
            } else if (num2 < 0) {
                displayEqn.textContent = num1 + ' ' + operator + ' ' + num2 + ' ';
            }
            displayMain.textContent = num2;
        }
    })
    
    // Decimal input
    decimalButton.addEventListener("click", () => {
        if (!decimalClicked) {
            if (equalsClicked) {
                resetVariables();
                updateDisplay(0);
            }
            if (operatorCounter == 0) { // if num1
                num1 += ".";
                displayMain.textContent += ".";
                displayEqn.textContent += ".";
            } else { // if num2
                num2 += ".";
                displayMain.textContent += ".";
                displayEqn.textContent += ".";
            }
            replaceTracker = false;
            decimalClicked = true;
        };
    })

    // Functions
    function resetVariables() {
        num1 = 0;
        num2 = 0;
        total = 0;
        replaceTracker = true;
        numTracker = true;
        equalsClicked = false;
        operatorClicked = false;
        operatorCounter = 0;
        operatorClicked = false;
        decimalClicked = false;
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
            decimalClicked = false;
        }
    }

    function updateDisplay(value) {
        // Check if the value has more than 3 decimal places
        if (Math.abs(value - Math.round(value)) > 0.0001) {
            // Round to 3 decimal places
            value = parseFloat(value.toFixed(3));
        }
        displayMain.textContent = value;
        displayEqn.textContent = value;
    }

    // Keyboard input
    document.addEventListener('keydown', (event) => {
        handleKeyboardInput(event.key);
    });

    function handleKeyboardInput(key) {
        if (key >= '0' && key <= '9') {
            const button = document.querySelector(`button[data-key="${key}"]`);
            button.click();
        } else {
            switch (key) {
                case 'Backspace':
                    delButton.click();
                    break;
                case 'Delete':
                    clearButton.click();
                    break;
                case 'Enter':
                case '=':
                    equalsButton.click();
                    break;
                case '.':
                case '+':
                case '-':
                case '/':
                    const operatorButton = document.querySelector(`button[data-key="${key}"]`);
                    operatorButton.click();
                    break;
                case '*':
                case '8':
                    if (event.shiftKey) {
                        const multiplyButton = document.querySelector(`button[data-key="*"]`);
                        multiplyButton.click();
                    } else {
                        const button = document.querySelector(`button[data-key="${key}"]`);
                        button.click();
                    }
                    break;
                default:
                    break;
            }
        }
    }      
});

// TODO: Make display text shrink if number of digits is large enough
// TODO: Issue when using decimal immediately after equals