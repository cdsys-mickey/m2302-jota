const getOptionLabel = (option) => {
	if (!option) return "";
	const { 入庫單號 } = option;
	if (!入庫單號) {
		return "(?)";
	}
	return `${入庫單號}`;
};

const isOptionEqualToValue = (option, value) =>
	option["入庫單號"] === value["入庫單號"];

const renderTagLabel = (option) => option["入庫單號"];
const renderOptionLabel = (option) => option["入庫單號"];

const OwnBrandStockingOrders = {
	getOptionLabel,
	isOptionEqualToValue,
	renderTagLabel,
	renderOptionLabel,
};

export default OwnBrandStockingOrders;
