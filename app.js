//create a calculator variable
const calculator = document.querySelector('.calculator');

//create a variable for all keys which are children of .calculatorKeys
const keys = calculator.querySelector('.calculatorKeys');

// the display variable stores the current displayed number
const display = document.querySelector('.calculatorDisplay');



//creating a calculate function
const calculate = (n1, operator, n2) => {
  //create two variables which contain float values
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);
  //using early returns
  if (operator === 'add') return firstNum + secondNum;
  if (operator === 'subtract') return firstNum - secondNum;
  if (operator === 'multiply') return firstNum * secondNum;
  if (operator === 'divide') return firstNum / secondNum;
}

//create a function which return the type of key was clicked
const getKeyType = (key) => {
  const {
    action
  } = key.dataset;
  if (!action) return 'number';
  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  ) return 'operator';
  // For everything else, return the action
  return action;
}

//call the createResultString function which needs  three variables—key, displayedNum and calculator.dataset(create a variable called state)
const createResultString = (key, displayedNum, state) => {
  //get the keyContent and action from key
  const keyContent = key.textContent;
  const firstValue = state.firstValue;
  const modValue = state.modValue;
  const operator = state.operator;
  const previousKeyType = state.previousKeyType;
  const keyType = getKeyType(key);

  //if the calculator shows 0 - replace it with the clicked key
  //if the previousKeyType is an operator - replace the displayed number with the clicked number
  //using a ternary operator:
  if (keyType === 'number') {
    return displayedNum === '0' ||
      previousKeyType === 'operator' ||
      previousKeyType === 'calculate' ?
      keyContent :
      displayedNum + keyContent;
  }

  if (keyType === 'decimal') {
    //Do nothing if string has a dot
    if (!displayedNum.includes('.')) return displayedNum + '.';
    if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.';
    //when neither conditions is matched return the currently dipslayed number
    return displayedNum;
  }

  if (keyType === 'operator') {
    //when we want to calculate more than two numbers
    //check if the operator is has been already hit- if yes dont perform a calculation before hit another number
    return firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
      //create a new variable and assign the result of the calculation to it
      ?
      calculate(firstValue, operator, displayedNum) : displayedNum // return the displayed number.
  }

  if (keyType === 'clear') return 0;

  if (keyType === 'calculate') {
    //only when the firstValue set => execute the calculate function
    return firstValue
      //correcting the calculation - when after calculation and hitting the calculate key again -> set the result to the firstValue
      ?
      previousKeyType === 'calculate' ?
      calculate(displayedNum, operator, modValue) :
      calculate(firstValue, operator, displayedNum)
      //else
      :
      displayedNum;
  }
}

//create the updateCalculatorState function which changes the calculator's visual appearance and custom attributes.
const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
  const keyType = getKeyType(key);
  calculator.dataset.previousKeyType = keyType;
  const {
    firstValue,
    operator,
    modValue,
    previousKeyType
  } = calculator.dataset;

  if (keyType === 'operator') {
    //storing the type of the action, operator which was clicked
    calculator.dataset.operator = key.dataset.action;
    calculator.dataset.firstValue = firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate' ?
      calculatedValue :
      displayedNum;
  }

  if (keyType === 'clear' && key.textContent === 'AC') {
    calculator.dataset.firstValue = ''
    calculator.dataset.modValue = ''
    calculator.dataset.operator = ''
    calculator.dataset.previousKeyType = ''
  }

  if (keyType === 'calculate') {
    calculator.dataset.modValue = firstValue && previousKeyType === 'calculate' ?
      modValue :
      displayedNum;
  }
}


const updateVisualState = (key, calculator) => {
  const keyType = getKeyType(key)
  //using array.from - The Array.from() method creates a new, shallow-copied Array instance from an array-like or iterable object
  //children property - contains all of the child elements of the node upon which it was called.
  //the parentNode of the key is the calculatorKeys div
  Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
  //Using classList is a convenient alternative to accessing an element's list of classes
  //added method adds a specified class
  if (keyType === 'operator') key.classList.add('is-depressed')
  if (keyType === 'clear' && key.textContent !== 'AC') key.textContent = 'AC'
  if (keyType !== 'clear') {
    const clearButton = calculator.querySelector('[data-action=clear]')
    clearButton.textContent = 'CE'
  }
}

keys.addEventListener('click', e => {
  //The target event (e) property returns the element that triggered the event
  //the number of the key what was clicked
  if (!e.target.matches('button')) return

  //determine the type of key that is clicked
  //the const key = which key is clicked
  const key = e.target
  const displayedNum = display.textContent
  const resultString = createResultString(key, displayedNum, calculator.dataset)

  display.textContent = resultString
  updateCalculatorState(key, calculator, resultString, displayedNum);
  updateVisualState(key, calculator);
})