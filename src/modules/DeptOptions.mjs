const getOptionLabel = (option) => {
	if (!option) return "";
	const { DeptID, DeptName, AbbrName } = option;
	return [DeptID, AbbrName || DeptName || "(無)"].filter(Boolean).join(" ");
};

const getOptionName = (option) => {
	if (!option) return "";
	const { DeptName, AbbrName } = option;
	return [AbbrName || DeptName || ""].filter(Boolean).join(" ");
};

const getOptionLabelForId = (option) => {
	if (!option) return "";
	const { DeptID } = option;
	if (DeptID === "*") {
		return "*";
	}
	return `${DeptID}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.DeptID === value?.DeptID;
};

const getOptionKey = (option) => {
	return option?.DeptID;
};

const isOptionChecked = (option, value) => {
	return value.includes(getOptionKey(option));
};

const DeptOptions = {
	getOptionLabel,
	getOptionLabelForId,
	isOptionEqualToValue,
	getOptionKey,
	isOptionChecked,
	getOptionName,
};

export default DeptOptions;
