const getOptionLabel = (option) => {
	if (!option) return "";
	const { CodeID, CodeData } = option;
	return [CodeID, CodeData].filter(Boolean).join(" ");
};

const getOptionLabelForId = (option) => {
	if (!option) return "";
	const { CodeID } = option;
	return `${CodeID || ""}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.CodeID == value?.CodeID;
};

const getOptionKey = (option) => {
	return `${option?.CodeID}`;
};

const Hotels = {
	getOptionLabel,
	getOptionLabelForId,
	isOptionEqualToValue,
	getOptionKey,
};

export default Hotels;
