import 'bootstrap';
require('./assets/scss/style.scss');

const generateButton = document.getElementById('generate');
const copyButton = document.getElementById('copy');
const result = document.getElementById('result')

const randomFunction = {
    hasLower: getRandomLower,
    hasUpper: getRandomUpper,
    hasNumber: getRandomNumber,
    hasSymbol: getRandomSymbol
};

// Copy the password to clipboard
copyButton.addEventListener('click', () => {
    const tempElement = document.createElement('textarea');
    const password = result.innerText;

    if (!password) { return; }

    tempElement.value = password;
    document.body.appendChild(tempElement);
    tempElement.select();

    document.execCommand('copy');
    tempElement.remove();
    alert('Password is copied.');
});

generateButton.addEventListener('click', () => {
    const length = +document.getElementById('length').value;
    const hasLowercase = document.getElementById('lowercase').checked;
    const hasUppercase = document.getElementById('uppercase').checked;
    const hasNumber = document.getElementById('numbers').checked;
    const hasSymbol = document.getElementById('symbols').checked;

    // Generate password and set the value to display
    result.innerText = generatePassword(hasLowercase, hasUppercase, hasNumber, hasSymbol, length);
});

function generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length) {
    let password = '';
    const typesCount = hasLower + hasUpper + hasNumber + hasSymbol;
    if(typesCount === 0) {
        return '';
    }

    const typesArr = [{hasLower}, {hasUpper}, {hasNumber}, {hasSymbol}].filter(item => Object.values(item)[0]);

    for (let i=0; i<length; i+=typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            password += randomFunction[funcName]();
        });
    }

    return password.slice(0, length);
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)];
}