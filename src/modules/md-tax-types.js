const data = Object.freeze({
	T: "課稅",
	M: "免稅",
});

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, name } = option;
	return `${id} ${name}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const TaxTypes = {
	data,
	getOptionLabel,
	isOptionEqualToValue,
};

export default TaxTypes;
