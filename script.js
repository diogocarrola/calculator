let display = document.getElementById('display');
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function appendToDisplay(value) {
    if (waitingForSecondOperand) {
        display.value = value;
        waitingForSecondOperand = false;
    } else {
        display.value = display.value === '0' ? value : display.value + value;
    }
}

function inputDecimal() {
    if (!display.value.includes('.')) {
        display.value += '.';
    }
}

function backspace() {
    display.value = display.value.slice(0, -1) || '0';
}

function clearDisplay() {
    display.value = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(display.value);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = operate(operator, firstOperand, inputValue);
        display.value = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) {
                alert("Error: Division by zero!");
                return 0;
            }
            return a / b;
        default:
            return b;
    }
}

function calculateResult() {
    if (operator === null || waitingForSecondOperand) {
        return;
    }

    const inputValue = parseFloat(display.value);
    const result = operate(operator, firstOperand, inputValue);
    display.value = `${parseFloat(result.toFixed(7))}`;
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = true;
}

// Add event listeners for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (/\d/.test(value)) {
            appendToDisplay(value);
        } else if (['+', '-', '*', '/'].includes(value)) {
            handleOperator(value);
        } else if (value === '=') {
            calculateResult();
        } else if (value === 'C') {
            clearDisplay();
        } else if (value === '.') {
            inputDecimal();
        } else if (value === '⌫') {
            backspace();
        }
    });
});

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (/\d/.test(key)) {
        appendToDisplay(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculateResult();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === '.') {
        inputDecimal();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});