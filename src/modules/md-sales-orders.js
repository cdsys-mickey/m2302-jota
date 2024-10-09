const getOptionLabel = (option) => {
	if (!option) return "";
	const { 銷貨單號, 銷貨日, 覆核人員 } = option;
	if (!銷貨單號) {
		return "(?)";
	}
	return `${銷貨單號} ${銷貨日} ${覆核人員}`;
};

const isOptionEqualToValue = (option, value) =>
	option["銷貨單號"] === value["銷貨單號"];

const renderTagLabel = (option) => option["銷貨單號"];

const SalesOrders = {
	getOptionLabel,
	isOptionEqualToValue,
	renderTagLabel,
};

export default SalesOrders;
