const isOptionEqualToValue = (option, value) =>
	option["訂貨單號"] === value["訂貨單號"];

const renderTagLabel = (option) => option["訂貨單號"];

const DepOrders = {
	isOptionEqualToValue,
	renderTagLabel,
};

export default DepOrders;
