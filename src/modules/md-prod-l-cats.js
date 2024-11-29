const getOptionLabel = (option) => {
	if (!option) return "";
	const { LClas, ClassData } = option;
	return [LClas, ClassData].filter(Boolean).join(" ");
};

const isOptionEqualToValue = (option, value) => {
	return option?.LClas === value?.LClas;
};

const ProdLCats = {
	getOptionLabel,
	isOptionEqualToValue,
};

export default ProdLCats;
