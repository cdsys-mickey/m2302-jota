const options = [
	{
		id: "1",
		label: "成品",
	},
	{
		id: "2",
		label: "半成品",
	},
	{
		id: "3",
		label: "原料",
	},
	{
		id: "4",
		label: "內包裝材料",
	},
	{
		id: "5",
		label: "外包裝材料",
	},
	{
		id: "6",
		label: "商品",
	},
	{
		id: "7",
		label: "研發品",
	},
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, label } = option;
	return [id, label].filter(Boolean).join(" ");
};

const isOptionEqualToValue = (option, value) => {
	return option?.id == value?.id;
};

const findById = (id) => {
	return options.find((o) => o.id == id);
};

const findByInput = (input) => {
	return options.find((o) => o.id == input);
};

const ProdTypeA = {
	findById,
	findByInput,
	options,
	getOptionLabel,
	isOptionEqualToValue,
};

export default ProdTypeA;
