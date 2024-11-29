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

const getOptionLabel = (option) => {
	if (!option) return "";
	const { Tax, Tax_N } = option;
	return [Tax, Tax_N].filter(Boolean).join(" ");
};

const isOptionEqualToValue = (option, value) => {
	return option?.Tax === value?.Tax;
};

const findById = (id) => {
	return options.find((o) => o.Tax === id);
};

const findByInput = (id) => {
	return options.find((o) => o.Tax?.toLowerCase() === id?.toLowerCase());
};

const TaxTypes = {
	data,
	options,
	getOptionLabel,
	isOptionEqualToValue,
	findById,
	findByInput,
};

export default TaxTypes;
