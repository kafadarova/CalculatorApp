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
    if (!action) {
      //if the calculator shows 0 - replace it with the clicked key
      //if the previousKeyType is an operator - replace the displayed number with the clicked number
      if (displayedNum === '0' || previousKeyType === 'operator') {
        display.textContent = keyContent;
      } else {
        //append the clicked key to the displayed number
        display.textContent = displayedNum + keyContent;
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
        display.textContent = calculate(firstValue, operator, secondValue)
      }

      //Using classList is a convenient alternative to accessing an element's list of classes
      //add method adds a specified class
      key.classList.add('is-depressed');

      //add custom attribute
      //update previousKeyType as a operator for pressed operator key
      calculator.dataset.previousKeyType = 'operator';

      //the displayed number rigth after hitting the operator
      calculator.dataset.firstValue = displayedNum;

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
      console.log('clear key!');
      //update previousKeyType as a clear for pressed clear key
      calculator.dataset.previousKey = 'clear';
    }

    if (action === 'calculate') {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      //create a secondValue constant which is equal to the currently displayed number.
      const secondValue = displayedNum;

      display.textContent = calculate(firstValue, operator, secondValue);

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
  let result = '';

  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2);
  }
  return result
}