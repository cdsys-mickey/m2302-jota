const data = [
	{ id: "101001", name: "泰豐麵粉行" },
	{ id: "101002", name: "新進豐行" },
	{ id: "101003", name: "寶珍茶行（股）公司" },
	{ id: "101004", name: "易展企業有限公司" },
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, name } = option;
	return `${id} ${name}`;
};

const isOptionEqualToValue = (option, value) =>
	option["Code"] === value["Code"];

const renderText = (value) => {
	if (!value) return "";
	const { id, name, address } = value;
	return `${id}\t${name}\t${address}`;
};

const Suppliers = {
	data,
	getOptionLabel,
	isOptionEqualToValue,
	renderText,
};

export default Suppliers;
