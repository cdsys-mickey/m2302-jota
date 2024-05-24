const options = [
	{
		id: "1",
		label: "試",
	},
	{
		id: "2",
		label: "贈",
	},
	{
		id: "3",
		label: "樣",
	},
];

const getOptionById = (id) => {
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

const FreeProdTypes = {
	options,
	getOptionById,
	getOptionLabel,
	isOptionEqualToValue,
};

export default FreeProdTypes;
