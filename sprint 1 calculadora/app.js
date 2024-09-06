document.getElementById('CE').addEventListener('click', clearAll);
document.getElementById('limpaAtual').addEventListener('click', clearCurrent);

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
            computation = (prev * curr) / 100;
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

document.querySelector('.titulo').addEventListener('click', function() {
    const easterEgg = document.querySelector('.easteregg');
    easterEgg.style.display = 'block'; // Mostra o easter egg ao clicar no título
});

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

document.getElementById('00').addEventListener('click', () => {
    if (currentNumber !== '') {
        appendNumber('00');
    }
});


updateDisplay();