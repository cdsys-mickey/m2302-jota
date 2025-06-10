import Types from "@/shared-modules/Types.mjs";

const getOptionLabel = (option) => {
	if (!option) return "";
	const { AccYM, Stage } = option;
	if (!AccYM) {
		return "(?)";
	}
	return `${AccYM} 第${Stage}期`;
};

const getOptionLabelForSession = (option) => {
	if (Types.isObject(option)) {
		const { Stage } = option;
		return Stage || "";
	}
	return option || "";
};

const isOptionEqualToValue = (option, value) =>
	option["AccYM"] === value["AccYM"] && option["Stage"] === value["Stage"];

const isOptionEqualToValueForSession = (option, value) => {
	if (value?.AccYM != null) {
		return (
			option["AccYM"] === value["AccYM"] &&
			option["Stage"] === value["Stage"]
		);
	}

	return option["Stage"] === value["Stage"];
};

const RecvAccountSessions = {
	getOptionLabel,
	isOptionEqualToValue,
	getOptionLabelForSession,
	isOptionEqualToValueForSession,
};

export default RecvAccountSessions;
