const data = Object.freeze({
	T: "課稅",
	M: "免稅",
});

const options = [
	{
		Tax: "T",
		Tax_N: "含稅",
	},
	{
		Tax: "M",
		Tax_N: "免稅",
	},
];

const getById = (id) => {
	return options.find((o) => o.Tax === id);
};

const getOptionLabel = (option) => {
	if (!option) return "";
	const { Tax, Tax_N } = option;
	return `${Tax} ${Tax_N}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.Tax === value?.Tax;
};

const TaxTypes = {
	data,
	options,
	// METHODS
	getById,
	getOptionLabel,
	isOptionEqualToValue,
};

export default TaxTypes;
