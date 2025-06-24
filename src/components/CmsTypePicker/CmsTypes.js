import Strings from "@/shared-modules/sd-strings";

const getOptionLabel = (option) => {
	if (!option) return "";
	const { CodeID, CodeData, Other1 } = option;
	return `${CodeID} ${CodeData}${
		Other1 != null ? ": " + Strings.formatPrice(Other1 ?? 0) + "%" : ""
	}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.CodeID === value?.CodeID;
};

const CmsTypes = {
	getOptionLabel,
	isOptionEqualToValue,
};

export default CmsTypes;
