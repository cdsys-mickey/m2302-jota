const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, label } = option;
	return [id, label].filter(Boolean).join(" ");
};

const isOptionEqualToValue = (option, value) => {
	return option?.id == value?.id;
};

const options = [
	{
		id: "1",
		label: "名產",
	},
	{
		id: "2",
		label: "豆餡",
	},
];

const findById = (id) => {
	return options.find((o) => o.id === id);
};

const findByInput = (input) => {
	return options.find((o) => o.id === input);
};

const ProdTypeB = {
	findById,
	findByInput,
	options,
	getOptionLabel,
	isOptionEqualToValue,
};

export default ProdTypeB;
