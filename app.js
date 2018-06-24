//create a calculator variable
const calculator = document.querySelector('.calculator');
//create a variable for all keys which are children of .calculatorKeys
const keys = calculator.querySelector('.calculatorKeys');

keys.addEventListener('click', e => {
  //The target event (e) property returns the element that triggered the event
  if (e.target.matches('button')) {}

  //determine the type of key that is clicked
  //the const key = which key is clicked
  const key = e.target;
  //dataset property provides read/write access to all the custom data attributes (data-*) set on the element
  const action = key.dataset.action;

  //when action variable returns false that means that the key doesnt habe a data-action, which means it is a number key
  if (!action) {
    console.log('number key!')
  }

  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  ) {
    console.log('operator key!')
  }

  if (action === 'decimal') {
    console.log('decimal key!')
  }

  if (action === 'clear') {
    console.log('clear key!')
  }

  if (action === 'calculate') {
    console.log('equal key!')
  }
})