const options = [
	{ id: 1, label: "彙總" },
	{ id: 2, label: "明細" },
];

const getOptionById = (id) => {
	return options.find((o) => o.id == id);
};

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, label } = option;
	return [id, label].filter(Boolean).join(" ");
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const findByInput = (s) => {
	return options.find((o) => o.id == s);
};

const getDefaultOption = () => {
	return getOptionById(1);
};

const P61ReportTypes = {
	options,
	getOptionLabel,
	isOptionEqualToValue,
	getOptionById,
	findByInput,
	getDefaultOption,
};

export default P61ReportTypes;
