const ProdFreeType = Object.freeze({
	// NONE: "",
	YES: "Y",
	NO: "N",
});

const options = [
	{ id: ProdFreeType.YES, label: "只含試贈樣" },
	{ id: ProdFreeType.NO, label: "不含試贈樣" },
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, label } = option;
	return `[${id || "  "}] ${label}`;
};

const getOptionById = (id) => {
	return options.find((o) => o.id === id);
};

const findOptionByInput = (s) => {
	return options.find((o) => o.id?.toLowerCase() === s?.toLowerCase());
};

const isOptionEqualToValue = (option, value) => {
	return option?.id == value?.id;
};

const ProdFreeTypes = {
	options,
	getOptionLabel,
	getOptionById,
	findOptionByInput,
	isOptionEqualToValue,
};

export default ProdFreeTypes;
