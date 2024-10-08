const getOptionLabel = (option) => {
	if (!option) return "";
	const { CodeID, CodeData } = option;
	return `${CodeID} ${CodeData}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.CodeID === value?.CodeID;
};

const Areas = {
	getOptionLabel,
	isOptionEqualToValue,
};

export default Areas;
