const options = [
	{
		id: "Y",
		label: "是",
	},
];

const getOptionById = (id) => {
	return options.find((o) => o.id === id) || null;
};

const findByInput = (id) => {
	return options.find((o) => o.id === id?.toUpperCase()) || null;
};

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, label } = option;
	// return [id, label].filter(Boolean).join(" ");
	return [id].filter(Boolean).join(" ");
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const YesOrEmpty = {
	options,
	getOptionById,
	getOptionLabel,
	isOptionEqualToValue,
	findByInput,
};

export default YesOrEmpty;
