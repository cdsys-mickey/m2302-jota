const getOptionLabel = (option) => {
	if (!option) return "";
	const { 進貨單號 } = option;
	if (!進貨單號) {
		return "(?)";
	}
	return `${進貨單號}`;
};

const isOptionEqualToValue = (option, value) =>
	option["進貨單號"] === value["進貨單號"];

const renderTagLabel = (option) => option["進貨單號"];
const renderOptionLabel = (option) => option["進貨單號"];

const RestockOrders = {
	getOptionLabel,
	isOptionEqualToValue,
	renderTagLabel,
	renderOptionLabel,
};

export default RestockOrders;
