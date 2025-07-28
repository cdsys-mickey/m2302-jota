const options = [
	{
		id: "1",
		label: "(消費總額)",
	},
	{
		id: "2",
		label: "(分類總額)",
	},
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { label } = option;
	return [label].filter(Boolean).join(" ");
};

const findById = (id) => {
	return options.find((o) => o.id == id);
};

const findByInput = (input) => {
	return options.find((o) => o.id == input);
};

const P42CalcTypes = {
	options,
	getOptionLabel,
	findById,
	findByInput,
};

export default P42CalcTypes;
