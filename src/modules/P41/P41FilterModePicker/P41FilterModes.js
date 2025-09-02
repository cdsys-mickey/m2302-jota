const FilterMode = Object.freeze({
	NOT_CLEARED: 0,
	CLEARED: 1,
});

const options = [
	{ id: FilterMode.NOT_CLEARED, label: "未到訪" },
	{ id: FilterMode.CLEARED, label: "已到訪" },
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { label } = option;
	return `${label}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const getOptionById = (id) => {
	return options.find((o) => o.id === id);
};

const getDefaultOption = () => {
	return getOptionById(FilterMode.NOT_CLEARED);
};

const P41FilterModes = {
	...FilterMode,
	options,
	getOptionLabel,
	isOptionEqualToValue,
	getOptionById,
	getDefaultOption,
};

export default P41FilterModes;
