document.getElementById('CE').addEventListener('click', clearAll);
document.getElementById('limpaAtual').addEventListener('click', clearCurrent);
document.getElementById('AC').addEventListener('click', clearAll);

let display = document.getElementById('display');
let currentNumber = '';
let previousNumber = '';
let operator = '';


function updateDisplay() {
    display.textContent = currentNumber || '0';
}

function clearAll() {
    currentNumber = '';
    previousNumber = '';
    operator = '';
    updateDisplay();
}

function clearCurrent() {
    currentNumber = '';
    updateDisplay();
}

function appendNumber(number) {
    if (number === '.' && currentNumber.includes('.')) return;
    currentNumber = currentNumber + number;
    updateDisplay();
}

function chooseOperator(op) {
    if (currentNumber === '') return;
    if (previousNumber !== '') {
        calculate();
    }
    operator = op;
    previousNumber = currentNumber;
    currentNumber = '';
}

function calculate() {
    let computation;
    const prev = parseFloat(previousNumber);
    const curr = parseFloat(currentNumber);
    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+':
            computation = prev + curr;
            break;
        case '-':
            computation = prev - curr;
            break;
        case 'x':
            computation = prev * curr;
            break;
        case '÷':
            computation = prev / curr;
            break;
        case '%':
            computation = prev % curr;
            break;
        default:
            return;
    }
    currentNumber = computation.toString();
    operator = '';
    previousNumber = '';
    updateDisplay();
}

function handleEqual() {
    calculate();
}


document.querySelectorAll('.botao').forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.textContent;
        if (value >= '0' && value <= '9') {
            appendNumber(value);
        } else if (value === '.') {
            appendNumber(value);
        } else if (value === '=') {
            handleEqual();
        } else if (['+', '-', 'x', '÷', '%'].includes(value)) {
            chooseOperator(value);
        }
    });
});


updateDisplay();