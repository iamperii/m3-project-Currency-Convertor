const apikey = '6444027ed17850a7a2cc30d5';
const url = 'https://v6.exchangerate-api.com/v6';

let amountInput = document.querySelector('.amount');
let resultInput = document.querySelector('.result');
let currencyLabel = document.querySelector('.currency-label');
let exchangeLabel = document.querySelector('.exchange-label');
let header = document.querySelector('header');
let main = document.querySelector('main');
let errorContainer = document.querySelector('.error-container');
let fromValue = 'RUB';
let toValue = 'USD';

const hamburgerIcon = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

let amountComma = amountInput.value.split('');
hamburgerIcon.addEventListener('click', () => {
	nav.classList.add('side-bar');
	nav.classList.remove('nav');
	//! duzelecek
});

let from = document.querySelectorAll('.from');
from.forEach((btn) => {
	btn.addEventListener('click', () => {
		from.forEach((button) => button.classList.remove('from-focused'));
		btn.classList.add('from-focused');
		fromValue = btn.value;
		toconvertCurrency();
	});
});

let to = document.querySelectorAll('.to');
to.forEach((btn) => {
	btn.addEventListener('click', () => {
		to.forEach((button) => {
			button.classList.remove('to-focused');
		});
		btn.classList.add('to-focused');
		toValue = btn.value;
		toconvertCurrency();
	});
});

let amount = amountInput.value;
amountInput.addEventListener('input', () => {
	amount = amountInput.value.replace(',', '.');
	toconvertCurrency();
});

async function toconvertCurrency() {
	if (fromValue === toValue) {
		resultInput.value = amountInput.value || 0;
		currencyLabel.textContent = `1 ${fromValue} = 1 ${toValue}`;
		exchangeLabel.textContent = `1 ${toValue} = 1 ${fromValue}`;
		return;
	}
	try {
		const response = await fetch(`${url}/${apikey}/latest/${fromValue}`);
		const data = await response.json();

		// console.log(amount);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const conversionrate = data.conversion_rates[toValue];
		const result = Number(amountInput.value || 0) * conversionrate;
		resultInput.value = result.toFixed(4);
		currencyLabel.textContent = `1 ${fromValue} = ${conversionrate.toFixed(
			4
		)} ${toValue}`;
		exchangeLabel.textContent = `1 ${toValue} =${(1 / conversionrate).toFixed(
			4
		)} ${fromValue}`;
	} catch (error) {
		console.error('Error fetching exchange rates:', error);
	}
	// console.log(resultInput)
}
toconvertCurrency();
