const options = [
	{
		id: "1",
		label: "外加",
	},
	{
		id: "2",
		label: "內含",
	},
];

const findById = (id) => {
	return options.find((o) => o.id === id);
};

const findByInput = (id) => {
	return options.find((o) => o.id === id);
};

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, label } = option;
	return [id, label].filter(Boolean).join(" ");
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const TaxTypes2 = {
	options,
	// METHODS
	findById,
	findByInput,
	getOptionLabel,
	isOptionEqualToValue,
};

export default TaxTypes2;
