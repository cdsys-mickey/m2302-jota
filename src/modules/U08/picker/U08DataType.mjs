const DataType = Object.freeze({
	SUMMARY: 1,
	DETAIL1: 2,
});

const options = [
	{ id: DataType.SUMMARY, label: "彙總" },
	{ id: DataType.DETAIL1, label: "明細" },
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
	return getOptionById(DataType.SUMMARY);
};

const U08DataType = {
	options,
	getOptionLabel,
	isOptionEqualToValue,
	getOptionById,
	findByInput,
	getDefaultOption,
};

export default U08DataType;
