let currentValue = '0';
let expression = '';
let shouldResetDisplay = false;

const display = document.getElementById('display');
const expressionEl = document.getElementById('expression');

function updateDisplay() {
  display.textContent = currentValue;
  expressionEl.textContent = expression;
}

function appendDigit(digit) {
  if (shouldResetDisplay) {
    currentValue = digit === '.' ? '0.' : digit;
    shouldResetDisplay = false;
  } else {
    if (digit === '.' && currentValue.includes('.')) return;
    currentValue = currentValue === '0' && digit !== '.' ? digit : currentValue + digit;
  }
  updateDisplay();
}

function appendOperator(op) {
  if (shouldResetDisplay && expression !== '') {
    expression = expression.slice(0, -3) + ` ${op} `;
    updateDisplay();
    return;
  }
  expression += currentValue + ` ${op} `;
  shouldResetDisplay = true;
  updateDisplay();
}

function safeEval(expr) {
  const normalized = expr.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-');
  const match = normalized.match(/^(-?[\d.]+)\s*([+\-*/])\s*(-?[\d.]+)$/);
  if (!match) return NaN;
  const a = parseFloat(match[1]);
  const op = match[2];
  const b = parseFloat(match[3]);
  if (isNaN(a) || isNaN(b)) return NaN;
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : Infinity;
  }
  return NaN;
}

function calculate() {
  if (expression === '') return;
  const fullExpr = expression + currentValue;
  expressionEl.textContent = fullExpr + ' =';
  try {
    const result = safeEval(fullExpr);
    if (!isFinite(result) || isNaN(result)) {
      currentValue = 'Error';
    } else {
      currentValue = parseFloat(result.toFixed(10)).toString();
    }
  } catch {
    currentValue = 'Error';
  }
  expression = '';
  shouldResetDisplay = true;
  display.textContent = currentValue;
}

function clearAll() {
  currentValue = '0';
  expression = '';
  shouldResetDisplay = false;
  updateDisplay();
}

function backspace() {
  if (shouldResetDisplay || currentValue === 'Error') {
    clearAll();
    return;
  }
  currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : '0';
  updateDisplay();
}

function toggleSign() {
  if (currentValue !== '0' && currentValue !== 'Error') {
    currentValue = currentValue.startsWith('-') ? currentValue.slice(1) : '-' + currentValue;
    updateDisplay();
  }
}

function percent() {
  if (currentValue !== 'Error') {
    currentValue = parseFloat((parseFloat(currentValue) / 100).toFixed(10)).toString();
    updateDisplay();
  }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') appendDigit(e.key);
  else if (e.key === '.') appendDigit('.');
  else if (e.key === '+') appendOperator('+');
  else if (e.key === '-') appendOperator('-');
  else if (e.key === '*') appendOperator('×');
  else if (e.key === '/') { e.preventDefault(); appendOperator('÷'); }
  else if (e.key === 'Enter' || e.key === '=') calculate();
  else if (e.key === 'Backspace') backspace();
  else if (e.key === 'Escape') clearAll();
  else if (e.key === '%') percent();
});

updateDisplay();
