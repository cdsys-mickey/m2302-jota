const getOptionLabel = (option) => {
	if (!option) return "";
	const { 採購單號, 採購日, 覆核人員 } = option;
	if (!採購單號) {
		return "(?)";
	}
	return `${採購單號} ${採購日} ${覆核人員}`;
};

const isOptionEqualToValue = (option, value) =>
	option["採購單號"] === value["採購單號"];

const renderTagLabel = (option) => option["採購單號"];

const RstPurchaseOrders = {
	getOptionLabel,
	isOptionEqualToValue,
	renderTagLabel,
};

export default RstPurchaseOrders;
