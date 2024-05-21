import Types from "@/shared-modules/sd-types";

const getOptionLabel = (value) => {
	return value === "Y" ? "是" : "否";
};

const valueToChecked = (v) => {
	if (Types.isString(v)) {
		return v?.toUpperCase() === "Y";
	}
	return false;
};

const checkedToValue = (checked) => {
	return checked ? "Y" : "";
};

const YesEmpty = {
	getOptionLabel,
	valueToChecked,
	checkedToValue,
};

export default YesEmpty;
