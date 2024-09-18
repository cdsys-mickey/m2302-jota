const getOptionLabel = (option) => {
	if (!option) return "";
	const { DeptID, DeptName, AbbrName } = option;
	// return `${DeptID} ${AbbrName || DeptName || ""}`;
	return [DeptID, AbbrName || DeptName || ""].filter(Boolean).join(" ");
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

const Depts = {
	getOptionLabel,
	getOptionLabelForId,
	isOptionEqualToValue,
	getOptionKey,
	isOptionChecked,
};

export default Depts;
