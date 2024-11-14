let display = document.getElementById('display');
let currentOperation = '';
let firstOperand = '';
let memoryValue = 0;

// Adicionando evento de teclado
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(key)) { // Números
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        setOperation(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') { // Limpar a tela
        clearDisplay();
    } else if (key === '%') {
        calculatePercentage();
    } else if (key === 's') { // Raiz quadrada
        calculateSquareRoot();
    } else if (key === 'm') { // Adicionar à memória
        memoryAdd();
    } else if (key === 'r') { // Recuperar da memória
        memoryRecall();
    } else if (key === 'c') { // Limpar memória
        memoryClear();
    }
});

function appendNumber(number) {
    display.value += number;
}

function setOperation(operation) {
    if (display.value === '') return;
    if (firstOperand !== '') {
        calculate();
    }
    firstOperand = display.value;
    currentOperation = operation;
    display.value = '';
}

function calculate() {
    if (firstOperand === '' || display.value === '') return;
    let result;
    const secondOperand = display.value;

    switch (currentOperation) {
        case '+':
            result = parseFloat(firstOperand) + parseFloat(secondOperand);
            break;
        case '-':
            result = parseFloat(firstOperand) - parseFloat(secondOperand);
            break;
        case '*':
            result = parseFloat(firstOperand) * parseFloat(secondOperand);
            break;
        case '/':
            // Verificando divisão por zero
            if (secondOperand === '0') {
                alert("Erro: Divisão por zero não é permitida.");
                clearDisplay();
                return;
            }
            result = parseFloat(firstOperand) / parseFloat(secondOperand);
            break;
        default:
            return;
    }
    display.value = result;
    firstOperand = '';
    currentOperation = '';
}

function calculatePercentage() {
    if (display.value === '') return;
    display.value = parseFloat(display.value) / 100;
}

function calculateSquareRoot() {
    if (display.value === '') return;
    const number = parseFloat(display.value);
    if (number < 0) {
        alert("Erro: Raiz quadrada de número negativo não é permitida.");
        clearDisplay();
        return;
    }
    display.value = Math.sqrt(number);
}

function memoryAdd() {
    if (display.value === '') return;
    memoryValue += parseFloat(display.value);
    clearDisplay();
}

function memoryRecall() {
    display.value = memoryValue;
}

function memoryClear() {
    memoryValue = 0;
}

function clearDisplay() {
    display.value = '';
    firstOperand = '';
    currentOperation = '';
}
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}
