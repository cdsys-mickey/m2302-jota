const getOptionLabel = (option) => {
	if (!option) return "";
	const { CodeID, CodeData } = option;
	return [CodeID, CodeData].filter(Boolean).join(" ");
};

const isOptionEqualToValue = (option, value) => {
	return option?.CodeID === value?.CodeID;
};

const ProdLines = {
	getOptionLabel,
	isOptionEqualToValue,
};

export default ProdLines;
