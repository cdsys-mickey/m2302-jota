const getOptionLabel = (option) => {
	if (!option) {
		return "(空白)";
	}
	const { id, name } = option;
	return `${id} ${name}`;
};

const isOptionEqualToValue = (option, value) => option["id"] === value["id"];

const Shops = {
	getOptionLabel,
	isOptionEqualToValue,
};

export default Shops;
