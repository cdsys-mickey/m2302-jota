const getOptionLabel = (option) => {
	if (!option) return "";
	const { OrdID } = option;
	if (!OrdID) {
		return "(?)";
	}
	return `${OrdID}`;
};

const isOptionEqualToValue = (option, value) =>
	option["OrdID"] === value["OrdID"];

const renderTagLabel = (option) => option["OrdID"];
const renderOptionLabel = (option) => option["OrdID"];

const CmsBookingOrders = {
	getOptionLabel,
	isOptionEqualToValue,
	renderTagLabel,
	renderOptionLabel,
};

export default CmsBookingOrders;
