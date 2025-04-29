const getOptionLabel = (option) => {
	if (!option) return "";
	const { 訂貨單號 } = option;
	if (!訂貨單號) {
		return "(?)";
	}
	return `${訂貨單號}`;
};

const isOptionEqualToValue = (option, value) =>
	option["訂貨單號"] === value["訂貨單號"];

const renderTagLabel = (option) => option["訂貨單號"];
const renderOptionLabel = (option) => option["訂貨單號"];

const CustomerOrders = {
	getOptionLabel,
	isOptionEqualToValue,
	renderTagLabel,
	renderOptionLabel,
};

export default CustomerOrders;
