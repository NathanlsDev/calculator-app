const numbers = document.querySelectorAll('[data-number]');
const operators = document.querySelector('[data-operations]');
const del = document.querySelector('[data-delete]');
const reset = document.querySelector('[data-reset]');
const equals = document.querySelector('[data-equals]');

numbers.forEach( (button) => {
  button.addEventListener('click', (event) =>{
    let value = Number(event.target.dataset.number);

    const output = document.querySelector('.output__text');
    output.textContent = value;
    });
});

