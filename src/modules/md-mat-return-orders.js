const getOptionLabel = (option) => {
	if (!option) return "";
	const { 退料單號 } = option;
	if (!退料單號) {
		return "(?)";
	}
	return `${退料單號}`;
};

const isOptionEqualToValue = (option, value) =>
	option["退料單號"] === value["退料單號"];

const renderTagLabel = (option) => option["退料單號"];
const renderOptionLabel = (option) => option["退料單號"];

const MatReturnOrders = {
	getOptionLabel,
	isOptionEqualToValue,
	renderTagLabel,
	renderOptionLabel,
};

export default MatReturnOrders;
