const getOptionLabel = (option) => {
	if (!option) return "";
	const { SDocID } = option;
	return [SDocID || ""].filter(Boolean).join(" ");
};

const getOptionLabelForId = (option) => {
	if (!option) return "";
	const { SDocID } = option;

	return `${SDocID}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.SDocID === value?.SDocID;
};

const getOptionKey = (option) => {
	return option?.SDocID;
};

const G10Doc = {
	getOptionLabel,
	getOptionLabelForId,
	isOptionEqualToValue,
	getOptionKey,
};

export default G10Doc;
