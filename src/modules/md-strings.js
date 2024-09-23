import Types from "../shared-modules/sd-types";

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

const Strings = {
	PRICE_DIGITS: PRICE_FIXED_DIGITS,
	RATE_DIGITS: RATE_FIXED_DIGITS,
	formatPrice,
	formatRate,
	containsNumberOnly,
};

export default Strings;
