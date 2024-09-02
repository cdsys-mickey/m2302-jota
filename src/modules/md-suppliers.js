const data = [
	{ id: "101001", name: "泰豐麵粉行" },
	{ id: "101002", name: "新進豐行" },
	{ id: "101003", name: "寶珍茶行（股）公司" },
	{ id: "101004", name: "易展企業有限公司" },
];

const getOptionLabel = (option) => {
	return `${option?.FactID} ${option?.FactData}`;
};

const getOptionLabelForId = (option) => {
	return `${option?.FactID || ""}`;
};

const renderOptionLabel = (option) => {
	return getOptionLabel(option);
};

const isOptionEqualToValue = (option, value) => {
	if (!value) return false;
	return option?.FactID === value?.FactID;
};

const renderText = (value) => {
	if (!value) return "";
	const { id, name, address } = value;
	return `${id}\t${name}\t${address}`;
};

const getOptionKey = (option) => {
	return `${option?.FactID}`;
};

const Suppliers = {
	data,
	getOptionLabel,
	isOptionEqualToValue,
	renderText,
	getOptionKey,
	getOptionLabelForId,
	renderOptionLabel,
};

export default Suppliers;
