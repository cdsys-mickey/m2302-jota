const getOptionLabel = (option) => {
	if (!option) return "";
	const { Code, Name } = option;
	return `${Code} ${Name}`;
};

const isOptionEqualToValue = (option, value) =>
	option["Code"] === value["Code"];

const Products = {
	getOptionLabel,
	isOptionEqualToValue,
};

export default Products;
