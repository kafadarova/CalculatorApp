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

    //when action variable returns false that means that the key doesnt have a data-action,
    // which means it is a number key
    if (!action) {
      //if the calculator shows 0 - replace it with the clicked key
      if (displayedNum === '0') {
        display.textContent = keyContent;
      } else {
        //append the clicked key to the displayed number
        display.textContent = displayedNum + keyContent;
      }
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      //Using classList is a convenient alternative to accessing an element's list of classes
      //add method adds a specified class
      key.classList.add('is-depressed');
    }

    if (action === 'decimal') {
      display.textContent = displayedNum + '.';
    }

    if (action === 'clear') {
      console.log('clear key!')
    }

    if (action === 'calculate') {
      console.log('equal key!')




    }
  }
})