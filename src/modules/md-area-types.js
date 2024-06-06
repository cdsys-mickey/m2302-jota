const KEY_LOCAL = "1";
const KEY_OTHER = "2";

const options = [
	{
		id: "1",
		label: "本地",
	},
	{
		id: KEY_OTHER,
		label: "外地",
	},
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, label } = option;
	return `${id} ${label}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const getNameById = (id) => {
	const option = options.find((opt) => opt.id === id);
	return option?.label || "(未知)";
};

const getById = (id) => {
	return options.find((opt) => opt.id === id);
};

const AreaTypes = {
	KEY_LOCAL,
	KEY_OTHER,
	options,
	getOptionLabel,
	isOptionEqualToValue,
	getNameById,
	getById,
};

export default AreaTypes;
