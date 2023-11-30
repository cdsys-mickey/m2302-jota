import Strings from "./md-strings";

const getOptionLabel = (option) => {
	if (!option) return "";
	const { CodeID, CodeData, Other1 } = option;
	return `${CodeID} ${CodeData}${
		Other1 ? ": " + Strings.formatPrice(Other1) + "%" : ""
	}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.CodeID === value?.CodeID;
};

const Types = Object.freeze({
	"001": "特價",
	"002": "寄賣",
	"003": "飲料水",
	"004": "阿美",
	"005": "團體門票",
	"006": "DIY-七星",
});

const CmsTypes = {
	Types,
	getOptionLabel,
	isOptionEqualToValue,
};

export default CmsTypes;
