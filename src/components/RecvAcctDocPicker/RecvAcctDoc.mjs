const getOptionLabel = (option) => {
	if (!option) return "";
	const { DocID } = option;
	return [DocID || ""].filter(Boolean).join(" ");
};

const getOptionLabelForId = (option) => {
	if (!option) return "";
	const { DocID } = option;

	return `${DocID}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.DocID === value?.DocID;
};

const getOptionKey = (option) => {
	return option?.DocID;
};

const RecvAcctDoc = {
	getOptionLabel,
	getOptionLabelForId,
	isOptionEqualToValue,
	getOptionKey,
};

export default RecvAcctDoc;
