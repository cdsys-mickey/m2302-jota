const getOptionLabel = (option) => {
	if (!option) return "";
	const { CodeID, CodeData } = option;
	return `${CodeID} ${CodeData}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.CodeID === value?.CodeID;
};

const getOptionKey = (option) => {
	return option?.CodeID;
};

const Codes = {
	getOptionLabel,
	isOptionEqualToValue,
	getOptionKey,
};

export default Codes;
