// 1. Calculator State Object
const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
  secondOperandForRepeat: null // Enables repeated '=' behavior
};

// 2. Pure Math Execution Map
const performCalculation = {
  '/': (first, second) => (second === 0 ? 'Error' : first / second),
  '*': (first, second) => first * second,
  '+': (first, second) => first + second,
  '-': (first, second) => first - second,
  '=': (first, second) => second
};

// Helper: Format floating-point numbers cleanly
function formatResult(value) {
  if (typeof value === 'string') return value; // Preserve 'Error' state
  const precisionCleaned = parseFloat(value.toFixed(10));
  return String(precisionCleaned);
}

// Helper: Sync State with DOM UI
function updateDisplay() {
  const screen = document.getElementById('screen');
  screen.textContent = calculator.displayValue;
}

// 3. Digit & Decimal Input Handler
function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  // Prevent input if screen is in an Error state
  if (displayValue === 'Error') {
    resetCalculator();
    calculator.displayValue = digit;
    return;
  }

  if (waitingForSecondOperand) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    // Prevent leading zeros
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (calculator.displayValue === 'Error') resetCalculator();

  if (calculator.waitingForSecondOperand) {
    calculator.displayValue = '0.';
    calculator.waitingForSecondOperand = false;
    return;
  }

  // Prevent multiple decimals in a single number
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

// 4. Operator & Chaining Handler
function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator, waitingForSecondOperand } = calculator;
  const inputValue = parseFloat(displayValue);

  if (displayValue === 'Error') return;

  // Allow operator swapping (e.g., pressed '+' then meant to press '-')
  if (operator && waitingForSecondOperand) {
    if (nextOperator !== '=') {
      calculator.operator = nextOperator;
    }
    return;
  }

  // Handle repeated equals presses (e.g., 5 + 2 = = =)
  if (nextOperator === '=' && operator === null && calculator.secondOperandForRepeat !== null) {
    // Uses stored second operand to repeat previous evaluation
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const currentOperand = calculator.secondOperandForRepeat !== null && nextOperator === '=' && waitingForSecondOperand
      ? calculator.secondOperandForRepeat
      : inputValue;

    const result = performCalculation[operator](firstOperand, currentOperand);
    
    // Store second operand for repeated equals logic
    calculator.secondOperandForRepeat = currentOperand;
    calculator.displayValue = formatResult(result);

    if (result === 'Error') {
      calculator.firstOperand = null;
    } else {
      calculator.firstOperand = typeof result === 'number' ? result : parseFloat(result);
    }
  }

  calculator.waitingForSecondOperand = true;
  if (nextOperator !== '=') {
    calculator.operator = nextOperator;
    calculator.secondOperandForRepeat = null; // Reset repeat tracker on new operation
  }
}

// 5. Reset Calculator
function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  calculator.secondOperandForRepeat = null;
}

// 6. Event Listener using Event Delegation
const keys = document.getElementById('keys');
keys.addEventListener('click', (event) => {
  const { target } = event;

  // Ignore clicks outside buttons
  if (!target.matches('button')) return;

  const value = target.value;

  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(value);
      break;
    case '.':
      inputDecimal(value);
      break;
    case 'all-clear':
      resetCalculator();
      break;
    default:
      // Check if the button is a digit number
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  updateDisplay();
});

// Initialize display on load
updateDisplay();