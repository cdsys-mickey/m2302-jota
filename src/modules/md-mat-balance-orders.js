const getOptionLabel = (option) => {
	if (!option) return "";
	const { 結餘單號 } = option;
	if (!結餘單號) {
		return "(?)";
	}
	return `${結餘單號}`;
};

const isOptionEqualToValue = (option, value) =>
	option["結餘單號"] === value["結餘單號"];

const renderTagLabel = (option) => option["結餘單號"];
const renderOptionLabel = (option) => option["結餘單號"];

const MatBalanceOrders = {
	getOptionLabel,
	isOptionEqualToValue,
	renderTagLabel,
	renderOptionLabel,
};

export default MatBalanceOrders;
