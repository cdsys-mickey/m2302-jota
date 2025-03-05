const DataType = Object.freeze({
	SUMMARY: 1,
	DETAIL: 2,
});

const options = [
	{ id: DataType.SUMMARY, label: "彙總" },
	{ id: DataType.DETAIL, label: "明細" },
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
	return getOptionById(DataType.SUMMARY);
};

const U05_1DataType = {
	options,
	getOptionLabel,
	isOptionEqualToValue,
	getOptionById,
	findOptionByInput,
	getDefaultOption,
};

export default U05_1DataType;
