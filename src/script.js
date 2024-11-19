const apikey = '6444027ed17850a7a2cc30d5';
const url = 'https://v6.exchangerate-api.com/v6';
// 'https://v6.exchangerate-api.com/v6/6444027ed17850a7a2cc30d5/latest/USD';

function dataApi() {
	let amount = document.querySelector('.amount').value;
	let result = document.querySelector('.result');

	async function toconvertCurrency() {
		const response = await fetch(`${url}/${apikey}/latest/USD`);
		const data = response.json();
	}

	// amount = Number(amount);
	// result.value = Number(amount * 1000);

	// console.log(amount);
	// console.log(result);
}

//! CLICK BUTTON

let from = document.querySelectorAll('.from');
let to = document.querySelectorAll('.to');

function buttonClick(buttonName, className) {
	buttonName.forEach((btn) => {
		btn.addEventListener('click', () => {
			buttonName.forEach((btn) => {
				btn.classList.remove(className);

				btn.addEventListener('click', () => {
					btn.classList.add(className);
				});
			});
		});
	});
}

buttonClick(from, 'from-focused');
buttonClick(to, 'to-focused');

document.addEventListener('DOMContentLoaded', dataApi);
