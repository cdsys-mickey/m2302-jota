const stringify = (option) => {
	if (!option) return "";
	const { AbbrID, CndID, CndData } = option;
	return [AbbrID, CndID, CndData].filter(Boolean).join(" ");
};
const getOptionLabel = (option) => {
	if (!option) return "";
	const { AbbrID, CndID, CndData } = option;
	return [(AbbrID ?? "").padStart(2, " "), CndID, CndData]
		.filter(Boolean)
		.join(" ");
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
	stringify,
	getOptionLabel,
	isOptionEqualToValue,
	getOptionKey,
	getOptionLabelForId,
};

export default TourGuides;
