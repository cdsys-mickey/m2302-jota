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

const getById = (id) => {
	return options.find((o) => o.id === id);
};

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, label } = option;
	return `${id} ${label}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const TaxTypes2 = {
	options,
	// METHODS
	getById,
	getOptionLabel,
	isOptionEqualToValue,
};

export default TaxTypes2;
