const getOptionLabel = (option) => {
	if (!option) return "";
	const { MClas, ClassData } = option;
	return `${MClas} ${ClassData}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.MClas === value?.MClas;
};

const ProdMCats = {
	getOptionLabel,
	isOptionEqualToValue,
};

export default ProdMCats;
