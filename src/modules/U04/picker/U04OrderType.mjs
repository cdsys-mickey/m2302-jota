const options = [
	{ id: 1, label: "原因" },
	{ id: 2, label: "原因貨品" },
	{ id: 3, label: "貨品原因" },
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, label } = option;
	return [id, label].filter(Boolean).join(" ");
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const getOptionById = (id) => {
	return options.find((o) => o.id === id);
};

const findOptionByInput = (s) => {
	return options.find((o) => o.id?.toLowerCase() === s?.toLowerCase());
};

const getDefaultOption = () => {
	return getOptionById(1);
};

const U04OrderType = {
	options,
	getOptionLabel,
	isOptionEqualToValue,
	getOptionById,
	findOptionByInput,
	getDefaultOption,
};

export default U04OrderType;
