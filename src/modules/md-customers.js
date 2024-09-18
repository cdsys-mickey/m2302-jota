const getOptionLabel = (option) => {
	if (!option) {
		return "";
	}
	const { CustID, CustData } = option;
	return [CustID, CustData].filter(Boolean).join(" ");
};

const getOptionLabelForId = (option) => {
	if (!option) {
		return "";
	}
	const { CustID } = option;
	return `${CustID}`;
};

const renderOptionLabel = (option) => {
	return getOptionLabel(option);
};

const getTitle = (option) => {
	return getOptionLabel(option);
};

const isOptionEqualToValue = (option, value) =>
	option?.CustID === value?.CustID;

const renderText = (value) => {
	if (!value) return "";
	const { id, name, address } = value;
	return `${id}\t${name}\t${address}`;
};

const getOptionKey = (option) => {
	return `${option?.CustID}`;
};

const stringify = (option) => {
	return `${option.CustID} ${option.CustData}`;
};

const Customers = {
	getOptionLabel,
	getOptionLabelForId,
	isOptionEqualToValue,
	renderText,
	getOptionKey,
	renderOptionLabel,
	getTitle,
	stringify,
};

export default Customers;
