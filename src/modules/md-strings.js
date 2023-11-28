const PRICE_DIGITS = 1;
const RATE_DIGITS = 2;

const formatPrice = (data) => {
	return data?.toFixed(PRICE_DIGITS);
};

const formatRate = (data) => {
	return data?.toFixed(RATE_DIGITS);
};

const Strings = {
	PRICE_DIGITS,
	RATE_DIGITS,
	formatPrice,
	formatRate,
};

export default Strings;
