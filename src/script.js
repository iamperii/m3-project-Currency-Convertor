const apikey = '7ce80ff9c819a72a192158df';
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

function dataApi() {
	const hamburgerIcon = document.querySelector('.hamburger');
	const nav = document.querySelector('.nav');
	hamburgerIcon.addEventListener('click', () => {
		let navClass = nav.classList.value;

		if (navClass !== 'side-bar') {
			nav.classList.remove('nav');
			nav.classList.add('side-bar');
		} else {
			nav.classList.remove('side-bar');
			nav.classList.add('nav');
		}
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
			to.forEach((button) => button.classList.remove('to-focused'));
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
		let amount = +amountInput.value.replace(',', '.') || 0;

		if (fromValue === toValue) {
			resultInput.value = amountInput.value || 0;
			currencyLabel.textContent = `1 ${fromValue} = 1 ${toValue}`;
			exchangeLabel.textContent = `1 ${toValue} = 1 ${fromValue}`;
			return;
		}

		try {
			const response = await fetch(`${url}/${apikey}/latest/${fromValue}`);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const conversionrate = data.conversion_rates[toValue];
			const result = amount * conversionrate;

			resultInput.value = result.toFixed(4);
			currencyLabel.textContent = `1 ${fromValue} = ${conversionrate.toFixed(
				4
			)} ${toValue}`;
			exchangeLabel.textContent = `1 ${toValue} = ${(
				1 / conversionrate
			).toFixed(4)} ${fromValue}`;
		} catch (error) {
			console.error('Error fetching exchange rates:', error);
			offlineMode(true);
		}
	}

	resultInput.addEventListener('input', async () => {
		const result = +resultInput.value.replace(',', '.') || 0;

		if (!result) {
			amountInput.value = '';
			return;
		}

		try {
			const response = await fetch(`${url}/${apikey}/latest/${toValue}`);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const reverseRate = 1 / data.conversion_rates[fromValue];
			const amount = result * reverseRate;

			amountInput.value = amount.toFixed(4);
		} catch (error) {
			console.error('Error fetching reverse exchange rates:', error);
		}
	});

	// window.addEventListener('load', () => {
	// toconvertCurrency();
	// });

	toconvertCurrency();
}

function offlineMode() {
	if (!navigator.onLine) {
		errorContainer.style.display = 'flex';
		header.style.display = 'none';
		main.style.display = 'none';
	} else {
		errorContainer.style.display = 'none';
		header.style.display = 'block';
		main.style.display = 'block';
	}
}

window.addEventListener('offline', offlineMode);
document.addEventListener('DOMContentLoaded', dataApi);
