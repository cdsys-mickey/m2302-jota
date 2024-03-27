const getOptionLabel = (option) => {
	if (!option) return "";
	const { DeptID, DeptName, AbbrName } = option;
	return `${DeptID} ${AbbrName || DeptName || "(未知)"}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.DeptID === value?.DeptID;
};

const getOptionKey = (option) => {
	return option?.DeptID;
};

const Depts = {
	getOptionLabel,
	isOptionEqualToValue,
	getOptionKey,
};

export default Depts;
