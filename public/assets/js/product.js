// Select the plus and minus buttons
let plusBtn = document.querySelector('.plus-btn');
let minusBtn = document.querySelector('.minus-btn');
let inputElement = document.querySelector('.quantity-button input');

// Parse the input value as an integer
let amount = parseInt(inputElement.value);

let render = (amount) => {
    inputElement.value = amount;
};

let handlePlus = () => {
    amount++;
    render(amount);
};

let handleMinus = () => {
    if (amount > 1) {
        amount--;
        render(amount);
    }
};

// Attach event listeners

plusBtn.addEventListener('click', handlePlus);

minusBtn.addEventListener('click', handleMinus);

inputElement.addEventListener('input', ()=>{
    amount = inputElement.value;
    amount = parseInt(amount);  
    amount = (isNaN(amount)||amount==0)?1:amount;
    render(amount);
})
    
