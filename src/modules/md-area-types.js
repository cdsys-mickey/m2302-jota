const KEY_LOCAL = "1";
const KEY_OTHER = "2";

const options = [
	{
		AreaType: KEY_LOCAL,
		AreaType_N: "本地",
	},
	{
		AreaType: KEY_OTHER,
		AreaType_N: "外地",
	},
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { AreaType, AreaType_N } = option;
	return `${AreaType} ${AreaType_N}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.AreaType === value?.AreaType;
};

const getNameById = (id) => {
	const option = options.find((opt) => opt.AreaType === id);
	return option?.AreaType_N || "(未知)";
};

const getById = (id) => {
	return options.find((opt) => opt.AreaType === id);
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
