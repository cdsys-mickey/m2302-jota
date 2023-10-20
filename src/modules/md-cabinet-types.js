const Types = Object.freeze({
	1: "烘焙櫃",
	2: "麻糬櫃",
});

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, name } = option;
	return `${id} ${name}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const CabinetTypes = {
	Types,
	getOptionLabel,
	isOptionEqualToValue,
};

export default CabinetTypes;
