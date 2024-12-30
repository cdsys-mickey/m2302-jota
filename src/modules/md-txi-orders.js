const getOptionLabel = (option) => {
	if (!option) return "";
	const { 撥入單號 } = option;
	if (!撥入單號) {
		return "(?)";
	}
	return `${撥入單號}`;
};

const isOptionEqualToValue = (option, value) =>
	option["撥入單號"] === value["撥入單號"];

const renderTagLabel = (option) => option["撥入單號"];
const renderOptionLabel = (option) => option["撥入單號"];

const TransInOrders = {
	getOptionLabel,
	isOptionEqualToValue,
	renderTagLabel,
	renderOptionLabel,
};

export default TransInOrders;
