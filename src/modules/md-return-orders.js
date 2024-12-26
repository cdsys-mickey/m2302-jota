const getOptionLabel = (option) => {
	if (!option) return "";
	const { 退貨單號 } = option;
	if (!退貨單號) {
		return "(?)";
	}
	return `${退貨單號}`;
};

const isOptionEqualToValue = (option, value) =>
	option["退貨單號"] === value["退貨單號"];

const renderTagLabel = (option) => option["退貨單號"];
const renderOptionLabel = (option) => option["退貨單號"];

const ReturnOrders = {
	getOptionLabel,
	isOptionEqualToValue,
	renderTagLabel,
	renderOptionLabel,
};

export default ReturnOrders;
