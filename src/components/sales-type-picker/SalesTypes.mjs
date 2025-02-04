const SalesType = Object.freeze({
	// NONE: "",
	RETAIL: "Y",
	NORMAL: "N",
});

const options = [
	// { id: SalesType.NONE, label: "不篩選" },
	{ id: SalesType.RETAIL, label: "零售" },
	{ id: SalesType.NORMAL, label: "正式客戶" },
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

const SalesTypes = {
	options,
	getOptionLabel,
	getOptionById,
	findOptionByInput,
	isOptionEqualToValue,
};

export default SalesTypes;
