const data = Object.freeze({
	1: "名產",
	2: "豆餡",
});

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, name } = option;
	return `${id} ${name}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const ProdCats = {
	data,
	getOptionLabel,
	isOptionEqualToValue,
};

export default ProdCats;
