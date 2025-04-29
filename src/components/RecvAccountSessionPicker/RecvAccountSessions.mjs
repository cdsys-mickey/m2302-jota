const getOptionLabel = (option) => {
	if (!option) return "";
	const { CurAccYM, CurStage } = option;
	if (!CurAccYM) {
		return "(?)";
	}
	return `${CurAccYM} 第${CurStage}期`;
};

const isOptionEqualToValue = (option, value) =>
	option["CurAccYM"] === value["CurAccYM"] &&
	option["CurStage"] === value["CurStage"];

const renderTagLabel = (option) => option["CurAccYM"];

const RecvAccountSessions = {
	getOptionLabel,
	isOptionEqualToValue,
	renderTagLabel,
};

export default RecvAccountSessions;
