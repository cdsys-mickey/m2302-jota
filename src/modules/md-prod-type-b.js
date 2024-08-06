const getOptionLabel = (option) => {
	if (!option) return "";
	const { TypeB, TypeB_N } = option;
	return `${TypeB} ${TypeB_N}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.TypeB === value?.TypeB;
};

const options = [
	{
		TypeB: "1",
		TypeB_N: "名產",
	},
	{
		TypeB: "2",
		TypeB_N: "豆餡",
	},
];

const findById = (id) => {
	return options.find((o) => o.TypeB === id);
};

const findByInput = (input) => {
	return options.find((o) => o.TypeB === input);
};

const ProdTypeB = {
	findById,
	findByInput,
	options,
	getOptionLabel,
	isOptionEqualToValue,
};

export default ProdTypeB;
