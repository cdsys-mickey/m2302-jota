const getOptionLabel = (option) => {
	if (!option) return "";
	const { DeptID, DeptName, AbbrName } = option;
	return `${DeptID} ${AbbrName || DeptName}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.DeptID === value?.DeptID;
};

const Depts = {
	getOptionLabel,
	isOptionEqualToValue,
};

export default Depts;
