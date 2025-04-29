import Types from "@/shared-modules/Types.mjs";

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

function getFirstLine(s) {
	if (!s) {
		return s;
	}
	return s.split("\n")[0];
}

const Strings = {
	PRICE_DIGITS: PRICE_FIXED_DIGITS,
	RATE_DIGITS: RATE_FIXED_DIGITS,
	formatPrice,
	formatRate,
	containsNumberOnly,
	isNullOrEmpty,
	getFirstLine,
};

export default Strings;
