const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, name } = option;
	return `${id} ${name}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const ProdClasses = {
	getOptionLabel,
	isOptionEqualToValue,
};

export default ProdClasses;
