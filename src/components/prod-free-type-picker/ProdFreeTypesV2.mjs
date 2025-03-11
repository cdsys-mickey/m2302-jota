const options = [
	{ id: 1, label: "試吃" },
	{ id: 2, label: "贈品" },
	{ id: 3, label: "樣品" },
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, label } = option;
	return `[${id || "  "}] ${label}`;
};

const getOptionById = (id) => {
	return options.find((o) => o.id == id);
};

const findOptionByInput = (s) => {
	return options.find((o) => o.id == s);
};

const isOptionEqualToValue = (option, value) => {
	return option?.id == value?.id;
};

const ProdFreeTypesV2 = {
	options,
	getOptionLabel,
	getOptionById,
	findOptionByInput,
	isOptionEqualToValue,
};

export default ProdFreeTypesV2;
