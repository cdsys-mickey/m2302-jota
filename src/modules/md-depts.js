const getOptionLabel = (option) => {
	if (!option) return "";
	const { DeptID, DeptName } = option;
	return `${DeptID} ${DeptName}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.DeptName === value?.DeptName;
};

const Depts = {
	getOptionLabel,
	isOptionEqualToValue,
};

export default Depts;
