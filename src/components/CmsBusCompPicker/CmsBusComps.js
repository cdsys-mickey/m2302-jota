import Strings from "@/shared-modules/sd-strings";

const getOptionLabel = (option) => {
	if (!option) return "";
	const { CarID, CarData, Other1 } = option;
	return `${CarID} ${CarData}${
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
	getOptionLabel,
	getOptionLabelForId,
	isOptionEqualToValue,
	renderOptionLabel,
};

export default CmsBusComps;
