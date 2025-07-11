const getOptionLabel = (option) => {
	if (!option) return "";
	const { TrvID, TrvData } = option;
	return [TrvID, TrvData].filter(Boolean).join(" ");
};

const getOptionLabelForId = (option) => {
	if (!option) return "";
	const { TrvID } = option;
	return `${TrvID || ""}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.TrvID == value?.TrvID;
};

const getOptionKey = (option) => {
	return `${option?.TrvID}`;
};

const TourGroups = {
	getOptionLabel,
	getOptionLabelForId,
	isOptionEqualToValue,
	getOptionKey,
};

export default TourGroups;
