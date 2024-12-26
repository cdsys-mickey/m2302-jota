const getOptionLabel = (option) => {
	if (!option) return "";
	const { 採購單號 } = option;
	if (!採購單號) {
		return "(?)";
	}
	return `${採購單號}`;
};

const isOptionEqualToValue = (option, value) =>
	option["採購單號"] === value["採購單號"];

const renderTagLabel = (option) => option["採購單號"];
const renderOptionLabel = (option) => option["採購單號"];

const PurchaseOrders = {
	getOptionLabel,
	isOptionEqualToValue,
	renderTagLabel,
	renderOptionLabel,
};

export default PurchaseOrders;
