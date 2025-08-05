const options = [
	{ id: 1, label: "彙總" },
	{ id: 2, label: "未到訪" },
	{ id: 3, label: "已到訪" },
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

const P51ReportTypes = {
	options,
	getOptionLabel,
	isOptionEqualToValue,
	getOptionById,
	findByInput,
	getDefaultOption,
};

export default P51ReportTypes;
