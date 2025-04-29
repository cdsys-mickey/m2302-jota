const getOptionLabel = (option) => {
	if (!option) return "";
	const { 領料單號 } = option;
	if (!領料單號) {
		return "(?)";
	}
	return `${領料單號}`;
};

const isOptionEqualToValue = (option, value) =>
	option["領料單號"] === value["領料單號"];

const renderTagLabel = (option) => option["領料單號"];
const renderOptionLabel = (option) => option["領料單號"];

const PickingOrders = {
	getOptionLabel,
	isOptionEqualToValue,
	renderTagLabel,
	renderOptionLabel,
};

export default PickingOrders;
