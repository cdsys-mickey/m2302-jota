const stringify = (option) => {
	if (!option) return "";
	const { TrvID, TrvData, AbbrID } = option;
	return [AbbrID, TrvID, TrvData].filter(Boolean).join(" ");
};
const getOptionLabel = (option) => {
	if (!option) return "";
	const { AbbrID, TrvID, TrvData } = option;
	return [(AbbrID ?? "").padStart(2, " "), TrvID, TrvData]
		.filter(Boolean)
		.join(" ");
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
	stringify,
	getOptionLabel,
	getOptionLabelForId,
	isOptionEqualToValue,
	getOptionKey,
};

export default TourGroups;
