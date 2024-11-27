const getAmt = (price, demand, stype) => {
	return !price || !demand ? "" : stype ? 0 : price * demand;
};

const SQtyUtils = {
	getAmt,
};

export default SQtyUtils;
