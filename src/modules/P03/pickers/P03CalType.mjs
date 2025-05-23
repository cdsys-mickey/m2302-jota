const options = [
	{ id: 1, label: "單項金額/總金額" },
	{ id: 2, label: "單項數量/總數量" },
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

const P03CalType = {
	options,
	getOptionLabel,
	isOptionEqualToValue,
	getOptionById,
	findOptionByInput,
	getDefaultOption,
};

export default P03CalType;


