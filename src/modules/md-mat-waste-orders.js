const getOptionLabel = (option) => {
	if (!option) return "";
	const { 報廢單號 } = option;
	if (!報廢單號) {
		return "(?)";
	}
	return `${報廢單號}`;
};

const isOptionEqualToValue = (option, value) =>
	option["報廢單號"] === value["報廢單號"];

const renderTagLabel = (option) => option["報廢單號"];
const renderOptionLabel = (option) => option["報廢單號"];

const MatWasteOrders = {
	getOptionLabel,
	isOptionEqualToValue,
	renderTagLabel,
	renderOptionLabel,
};

export default MatWasteOrders;
