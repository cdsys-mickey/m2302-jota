const getOptionLabel = (option) => {
	if (!option) return "";
	const { ComID } = option;
	if (!ComID) {
		return "(?)";
	}
	return `${ComID}`;
};

const isOptionEqualToValue = (option, value) =>
	option["ComdID"] === value["ComdID"];

const renderTagLabel = (option) => option["ComdID"];
const renderOptionLabel = (option) => option["ComdID"];

const CmsEntries = {
	getOptionLabel,
	isOptionEqualToValue,
	renderTagLabel,
	renderOptionLabel,
};

export default CmsEntries;
