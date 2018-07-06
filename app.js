//create a calculator variable
const calculator = document.querySelector('.calculator');

//create a variable for all keys which are children of .calculatorKeys
const keys = calculator.querySelector('.calculatorKeys');

// the display variable stores the current displayed number
const display = document.querySelector('.calculatorDisplay');

keys.addEventListener('click', e => {
  //The target event (e) property returns the element that triggered the event
  //the number of the key what was clicked
  if (e.target.matches('button')) {

    //determine the type of key that is clicked
    //the const key = which key is clicked
    const key = e.target;
    //dataset property provides read/write access to all the custom data attributes (data-*) set on the element
    const action = key.dataset.action;

    //textContent returns the text content of the element
    //returns the content of the clicked element
    const keyContent = key.textContent;

    //returns the content of the displayed element
    const displayedNum = display.textContent;

    const previousKeyType = calculator.dataset.previousKeyType;

    //when action variable returns false that means that the key doesnt have a data-action,
    // which means it is a number key
    //create an pure function which return the value needs to be displayed on the calculator

    const createResultString = () => {
      // Variables required are:
      // 1. keyContent
      // 2. displayedNum
      // 3. previousKeyType
      // 4. action

      if (!action) {
        //if the calculator shows 0 - replace it with the clicked key
        //if the previousKeyType is an operator - replace the displayed number with the clicked number
        //using a ternary operator:
        return displayedNum === '0' ||
          previousKeyType === 'operator' ||
          previousKeyType === 'calculate' ? keyContent : displayedNum + keyContent; //append the clicked key to the displayed number
      }
    }
    //update previousKeyType to a number for pressed number key
    calculator.dataset.previousKey = 'number';
  }

  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  ) {
    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    const secondValue = displayedNum;

    //when we want to calculate more than two numbers
    //check if the operator is has been already hit- if yes dont perform a calculation before hit another number
    if (firstValue && operator && previousKeyType !== 'operator') {
      //create a new variable and assign the result of the calculation to it
      const calcValue = calculate(firstValue, operator, secondValue)
      display.textContent = calcValue;

      //Update calculated value as firstValue
      calculator.dataset.firstValue = calcValue;
    } else {
      //If there are not calculations, set displayedNum as the firstValue
      //the displayed number rigth after hitting the operator
      calculator.dataset.firstValue = displayedNum
    }

    //Using classList is a convenient alternative to accessing an element's list of classes
    //add method adds a specified class
    key.classList.add('is-depressed');

    //add custom attribute
    //update previousKeyType as a operator for pressed operator key
    calculator.dataset.previousKeyType = 'operator';

    //storing the type of the action, operator which was clicked
    calculator.dataset.operator = action;
  }

  if (action === 'decimal') {
    //Do nothing if string has a dot
    if (!displayedNum.includes('.')) {
      display.textContent = displayedNum + '.';
    } else if (previousKeyType === 'operator') {
      display.textContent = '0.';
    }
    //set previousKeyType to a decimal for pressed decimal key
    calculator.dataset.previousKey = 'decimal';
  }

  if (action === 'clear') {
    if (key.textContent === 'AC') {
      calculator.dataset.firstValue = '';
      calculator.dataset.modValue = '';
      calculator.dataset.operator = '';
      calculator.dataset.previousKeyType = '';
    } else {
      key.textContent = 'AC';
    }
    display.textContent = 0;
    //update previousKeyType as a clear for pressed clear key
    calculator.dataset.previousKey = 'clear';
  }

  //change the text of the clear button, if the ation is not the pressing of the clear button .the clear entry - CE - will be shown.
  if (action !== 'clear') {
    const clearButton = calculator.querySelector('[data-actionc=clear]');
    clearButton.textContent = 'CE';
  }

  if (action === 'calculate') {
    let firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    //create a secondValue constant which is equal to the currently displayed number.
    const secondValue = displayedNum;

    //only when the firstValue set => execute the calculate function
    if (firstValue) {
      //correcting the calculation - when after calculation and hitting the calculate key again -> set the result to the firstValue
      if (previousKeyType === 'calculate') {
        firstValue = displayedNum;
        secondValue = calculator.dataset.modValue;
      }
      display.textContent = calculate(firstValue, operator, secondValue);
    }
    //set modValue attribute - carry forward the previous secondValue into the new calculation
    calculator.dataset.modValue = secondValue;
    //update previousKeyType as a calculate for pressed equal key
    calculator.dataset.previousKey = 'calculate';
  }
  //Remove .is-depressed class for all keys

  //using array.from - The Array.from() method creates a new, shallow-copied Array instance from an array-like or iterable object
  //children property - contains all of the child elements of the node upon which it was called.
  //the parentNode of the key is the calculatorKeys div
  Array.from(key.parentNode.children)
    .forEach(k => k.classList.remove('is-depressed'));

}
})

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