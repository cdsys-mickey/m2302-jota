const options = [
	{ id: 1, label: "部門金額" },
	{ id: 2, label: "部門單據" },
	{ id: 3, label: "貨品單據" },
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

const H35ReportType = {
	options,
	getOptionLabel,
	isOptionEqualToValue,
	getOptionById,
	findByInput,
	getDefaultOption,
};

export default H35ReportType;
