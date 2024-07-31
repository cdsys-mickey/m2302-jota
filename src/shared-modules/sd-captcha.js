import { generalDecrypt } from "jose";

const getRandomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
};

const genetateCaptcha = (max) => {
	let text = "";
	let i;
	for (i = 0; i < max; i += 1) {
		switch (Math.floor(Math.random() * 3)) {
			case 0:
				//數字
				text += String.fromCharCode(
					48 + Math.floor(Math.random() * 10)
				);
				break;
			case 1:
				//大寫
				text += String.fromCharCode(
					65 + Math.floor(Math.random() * 26)
				);
				break;
			case 2:
				//小寫
				text += String.fromCharCode(
					97 + Math.floor(Math.random() * 26)
				);
				break;
			default:
				break;
		}
	}
	return text;
};

const generateNumericCaptcha = (max) => {
	let text = "";
	let i;
	for (i = 0; i < max; i += 1) {
		text += String.fromCharCode(48 + Math.floor(Math.random() * 10));
	}
	return text;
};

const Captcha = {
	getRandomInt,
	genetateCaptcha,
	generateNumericCaptcha,
};

export default Captcha;
