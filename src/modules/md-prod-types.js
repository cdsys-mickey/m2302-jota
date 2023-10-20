const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, name } = option;
	return `${id} ${name}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const Types = Object.freeze({
	1: "成品",
	2: "半成品",
	3: "原料",
	4: "內包裝材料",
	5: "外包裝材料",
	6: "商品",
	7: "研發品",
});

const ProdTypes = {
	Types,
	getOptionLabel,
	isOptionEqualToValue,
};

export default ProdTypes;
