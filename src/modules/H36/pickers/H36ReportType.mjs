const options = [
	{ id: 1, label: "貨品統計" },
	{ id: 2, label: "貨品+生產線別統計" },
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

const H36ReportType = {
	options,
	getOptionLabel,
	isOptionEqualToValue,
	getOptionById,
	findByInput,
	getDefaultOption,
};

export default H36ReportType;
