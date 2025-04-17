const data = Object.freeze({
	T: "課稅",
	M: "免稅",
});

const options = [
	{
		id: "T",
		label: "含稅",
	},
	{
		id: "M",
		label: "免稅",
	},
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, label } = option;
	return [id, label].filter(Boolean).join(" ");
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const findById = (id) => {
	return options.find((o) => o.id === id);
};

const findByInput = (id) => {
	return options.find((o) => o.id?.toLowerCase() === id?.toLowerCase());
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
