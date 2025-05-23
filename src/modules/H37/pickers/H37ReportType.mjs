const options = [
	{ id: 1, label: "貨品彙總" },
	{ id: 2, label: "貨品+門市彙總" },
	{ id: 3, label: "單據明細" },
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
	return option?.id == value?.id;
};

const findOptionByInput = (s) => {
	return options.find((o) => o.id?.toLowerCase() == s?.toLowerCase());
};

const getDefaultOption = () => {
	return getOptionById(1);
};

const H37ReportType = {
	options,
	getOptionLabel,
	isOptionEqualToValue,
	getOptionById,
	findOptionByInput,
	getDefaultOption,
};

export default H37ReportType;

