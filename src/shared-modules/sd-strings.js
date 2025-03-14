import Types from "./sd-types";

const PRICE_FIXED_DIGITS = 2;
const RATE_FIXED_DIGITS = 4;

const formatPrice = (v) => {
	return Types.isNumber(v) ? v?.toFixed(PRICE_FIXED_DIGITS) : v;
};

const formatRate = (v) => {
	return Types.isNumber(v) ? v?.toFixed(RATE_FIXED_DIGITS) : v;
};

const containsNumberOnly = (v) => {
	return /^\d+$/.test(v);
};

function isNullOrEmpty(value) {
	return value === null || value === undefined || value === "";
}

const Strings = {
	PRICE_DIGITS: PRICE_FIXED_DIGITS,
	RATE_DIGITS: RATE_FIXED_DIGITS,
	formatPrice,
	formatRate,
	containsNumberOnly,
	isNullOrEmpty,
};

export default Strings;
