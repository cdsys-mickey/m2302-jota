import Types from "@/shared-modules/Types.mjs";

const getOptionLabel = (value) => {
	return value === "Y" ? "是" : "否";
};

const valueToChecked = (value) => {
	if (Types.isString(value)) {
		return value?.toUpperCase() === "Y";
	}
	return false;
};

const checkedToValue = (checked) => {
	return checked ? "Y" : "N";
};

const YesNo = {
	getOptionLabel,
	valueToChecked,
	checkedToValue,
};

export default YesNo;
