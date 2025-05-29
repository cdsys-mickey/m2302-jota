const getOptionLabel = (option) => {
	if (!option) return "";
	const { AccYM, Stage } = option;
	if (!AccYM) {
		return "(?)";
	}
	return `${AccYM} 第${Stage}期`;
};

const getOptionLabelForSession = (option) => {
	if (!option) return "";
	const { Stage } = option;
	if (!Stage) {
		return `${option}`;
	}
	return `第${Stage}期`;
};

const isOptionEqualToValue = (option, value) =>
	option["AccYM"] === value["AccYM"] && option["Stage"] === value["Stage"];

const isOptionEqualToValueForSession = (option, value) => {
	return option["Stage"] === value["Stage"];
};

const RecvAccountSessions = {
	getOptionLabel,
	isOptionEqualToValue,
	getOptionLabelForSession,
	isOptionEqualToValueForSession,
};

export default RecvAccountSessions;
