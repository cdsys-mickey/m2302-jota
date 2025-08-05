const options = [
	{ id: 1, label: "金額" },
	{ id: 2, label: "數量" },
	{ id: 3, label: "貨品" },
	{ id: 4, label: "櫃別" },
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

const findByInput = (s) => {
	return options.find((o) => o.id == s);
};

const getDefaultOption = () => {
	return getOptionById(1);
};

const P09OrderType = {
	options,
	getOptionLabel,
	isOptionEqualToValue,
	getOptionById,
	findByInput,
	getDefaultOption,
};

export default P09OrderType;
