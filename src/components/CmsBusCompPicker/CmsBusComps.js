import Strings from "@/shared-modules/sd-strings";

const stringify = (option) => {
	if (!option) return "";
	const { CarID, CarData, AbbrID } = option;
	return [CarID, CarData, AbbrID].filter(Boolean).join(" ");
};

const getOptionLabel = (option) => {
	if (!option) return "";
	const { AbbrID, CarID, CarData, Other1 } = option;
	return `${(AbbrID ?? "").padStart(2, " ")} ${CarID} ${CarData}${
		Other1 != null ? ": " + Strings.formatPrice(Other1 ?? 0) + "%" : ""
	}`;
};

const getOptionLabelForId = (option) => {
	if (!option) return "";
	const { CarID } = option;

	return `${CarID}`;
};

const renderOptionLabel = (option) => {
	return getOptionLabel(option);
};

const isOptionEqualToValue = (option, value) => {
	return option?.CarID === value?.CarID;
};

const CmsBusComps = {
	stringify,
	getOptionLabel,
	getOptionLabelForId,
	isOptionEqualToValue,
	renderOptionLabel,
};

export default CmsBusComps;
