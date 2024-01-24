const getOptionLabel = (value) => {
	return value === "Y" ? "是" : "否";
};

const valueToChecked = (v) => {
	return v?.toUpperCase() === "Y";
};

const checkedToValue = (c) => {
	return c ? "Y" : "N";
};

const YesNo = {
	getOptionLabel,
	valueToChecked,
	checkedToValue,
};

export default YesNo;
