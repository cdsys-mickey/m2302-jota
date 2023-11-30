const getOptionLabel = (option) => {
	if (!option) return "";
	const { SClas, ClassData } = option;
	return `${SClas} ${ClassData}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.SClas === value?.SClas;
};

const ProdSCats = {
	getOptionLabel,
	isOptionEqualToValue,
};

export default ProdSCats;
