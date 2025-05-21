const getOptionLabel = (option) => {
	if (!option) return "";
	const { AccYM, Stage } = option;
	if (!AccYM) {
		return "(?)";
	}
	return `${AccYM} 第${Stage}期`;
};

const isOptionEqualToValue = (option, value) =>
	option["AccYM"] === value["AccYM"] && option["Stage"] === value["Stage"];

const renderTagLabel = (option) => option["AccYM"];

const RecvAccountSessions = {
	getOptionLabel,
	isOptionEqualToValue,
	renderTagLabel,
};

export default RecvAccountSessions;
