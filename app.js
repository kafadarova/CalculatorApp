//create a calculator variable
const calculator = document.querySelector('.calculator');

//create a variable for all keys which are children of .calculatorKeys
const keys = calculator.querySelector('.calculatorKeys');

// the display variable stores the current displayed number
const display = document.querySelector('.calculatorDisplay');

//call the createResultString function which needs  three variables—key, displayedNum and calculator.dataset(create a variable called state)
const createResultString = (key, displayedNum, state) => {
  //get the keyContent and action from key
  const keyContent = key.textContent;
  const action = key.dataset.action;
  const firstValue = state.firstValue;
  const modValue = state.modValue;
  const operator = state.operator;
  const previousKeyType = state.previousKeyType;
}


keys.addEventListener('click', e => {
  //The target event (e) property returns the element that triggered the event
  //the number of the key what was clicked
  if (e.target.matches('button')) {
    const displayedNum = display.textContent;
    const resultString = createResultString(e.target, displayedNum, calculator.dataset);

    // //determine the type of key that is clicked
    // //the const key = which key is clicked
    // const key = e.target;
    // //dataset property provides read/write access to all the custom data attributes (data-*) set on the element
    // const action = key.dataset.action;

    // //textContent returns the text content of the element
    // //returns the content of the clicked element
    // const keyContent = key.textContent;
    //
    // //returns the content of the displayed element
    // const displayedNum = display.textContent;
    //
    // const previousKeyType = calculator.dataset.previousKeyType;

    //when action variable returns false that means that the key doesnt have a data-action,
    // which means it is a number key
    //create an pure function which return the value needs to be displayed on the calculator

    const createResultString = () => {
      // Variables required are:
      // 1. keyContent
      // 2. displayedNum
      // 3. previousKeyType
      // 4. action
      // 5. calculator.dataset.firstValue
      // 6. calculator.dataset.operator
      // 7. calculator.dataset.modValue
      if (!action) {
        //if the calculator shows 0 - replace it with the clicked key
        //if the previousKeyType is an operator - replace the displayed number with the clicked number
        //using a ternary operator:
        return displayedNum === '0' ||
          previousKeyType === 'operator' ||
          previousKeyType === 'calculate' ? keyContent : displayedNum + keyContent; //append the clicked key to the displayed number
      }


      if (action === 'decimal') {
        //Do nothing if string has a dot
        if (!displayedNum.includes('.')) return displayedNum + '.';
        if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.';
        //when neither conditions is matched return the currently dipslayed number
        return displayedNum;
      }
      if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
      ) {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;

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

      if (action === 'clear') return 0;

      if (action === 'calculate') {
        let firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        //create a secondValue constant which is equal to the currently displayed number.
        // const secondValue = displayedNum;
        const modValue = calculator.dataset.modValue;


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



    //update previousKeyType to a number for pressed number key
    calculator.dataset.previousKey = 'number';
    //set previousKeyType to a decimal for pressed decimal key
    calculator.dataset.previousKey = 'decimal';
    //update previousKeyType as a clear for pressed clear key
    calculator.dataset.previousKey = 'clear';

    //set modValue attribute - carry forward the previous secondValue into the new calculation
    calculator.dataset.modValue = secondValue;
    //update previousKeyType as a calculate for pressed equal key
    calculator.dataset.previousKey = 'calculate';

    //Using classList is a convenient alternative to accessing an element's list of classes
    //add method adds a specified class
    key.classList.add('is-depressed');

    //add custom attribute
    //update previousKeyType as a operator for pressed operator key
    calculator.dataset.previousKeyType = 'operator';

    //storing the type of the action, operator which was clicked
    calculator.dataset.operator = action;


    //change the text of the clear button, if the ation is not the pressing of the clear button .the clear entry - CE - will be shown.
    if (action !== 'clear') {
      const clearButton = calculator.querySelector('[data-actionc=clear]');
      clearButton.textContent = 'CE';
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