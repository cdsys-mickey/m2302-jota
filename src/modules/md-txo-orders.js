const getOptionLabel = (option) => {
	if (!option) return "";
	const { 撥出單號 } = option;
	if (!撥出單號) {
		return "(?)";
	}
	return `${撥出單號}`;
};

const isOptionEqualToValue = (option, value) =>
	option["撥出單號"] === value["撥出單號"];

const renderTagLabel = (option) => option["撥出單號"];

const TxoOrders = {
	getOptionLabel,
	isOptionEqualToValue,
	renderTagLabel,
};

export default TxoOrders;
