import Types from "../shared-modules/sd-types";

const getOptionLabel = (value) => {
	return value === "Y" ? "是" : "否";
};

const valueToChecked = (v) => {
	if (Types.isString(v)) {
		return v?.toUpperCase() === "Y";
	}
	return false;
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
