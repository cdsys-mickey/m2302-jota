const getOptionLabel = (option) => {
	if (!option) return "";
	const { CndID, CndData } = option;
	return [CndID, CndData].filter(Boolean).join(" ");
};

const getOptionLabelForId = (option) => {
	if (!option) return "";
	const { CndID } = option;
	return `${CndID || "  "}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.CndID == value?.CndID;
};

const getOptionKey = (option) => {
	return `${option?.CndID}`;
};

const TourGuides = {
	getOptionLabel,
	isOptionEqualToValue,
	getOptionKey,
	getOptionLabelForId,
};

export default TourGuides;
