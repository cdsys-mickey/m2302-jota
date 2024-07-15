const getOptionLabel = (option) => {
	return `${option?.CustID} ${option?.CustData}`;
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

const Customers = {
	getOptionLabel,
	isOptionEqualToValue,
	renderText,
	getOptionKey,
};

export default Customers;
