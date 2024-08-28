import Strings from "./md-strings";

const getOptionLabel = (option) => {
	if (!option) return "";
	const { CodeID, CodeData, Other1 } = option;
	// return `${CodeID} ${CodeData}${
	// 	Other1 ? ": " + Strings.formatPrice(Other1) + "%" : ""
	// }`;
	return `${CodeID} ${CodeData}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.CodeID === value?.CodeID;
};

const Employees = {
	getOptionLabel,
	isOptionEqualToValue,
};

export default Employees;
