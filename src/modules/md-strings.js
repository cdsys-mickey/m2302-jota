const DIGITS = 1;

const formatPrice = (data) => {
	return data?.toFixed(DIGITS);
};

const Strings = {
	DIGITS,
	formatPrice,
};

export default Strings;
