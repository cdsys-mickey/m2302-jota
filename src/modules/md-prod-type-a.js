const getOptionLabel = (option) => {
	if (!option) return "";
	const { TypeA, TypeA_N } = option;
	return `${TypeA} ${TypeA_N}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.TypeA === value?.TypeA;
};

const options = [
	{
		TypeA: "1",
		TypeA_N: "成品",
	},
	{
		TypeA: "2",
		TypeA_N: "半成品",
	},
	{
		TypeA: "3",
		TypeA_N: "原料",
	},
	{
		TypeA: "4",
		TypeA_N: "內包裝材料",
	},
	{
		TypeA: "5",
		TypeA_N: "外包裝材料",
	},
	{
		TypeA: "6",
		TypeA_N: "商品",
	},
	{
		TypeA: "7",
		TypeA_N: "研發品",
	},
];

const getById = (id) => {
	return options.find((o) => o.TypeA === id);
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

const ProdTypeA = {
	Types,
	getById,
	options,
	getOptionLabel,
	isOptionEqualToValue,
};

export default ProdTypeA;
