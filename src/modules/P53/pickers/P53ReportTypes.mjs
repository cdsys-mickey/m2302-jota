const options = [
	{ id: 1, label: "所有細目一覽表" },
	{ id: 2, label: "團體來訪一覽表" },
	{ id: 3, label: "有旅行社帶團" },
	{ id: 3, label: "無旅行社帶團" },
	{ id: 3, label: "飯店業者退佣" },
];

const getOptionById = (id) => {
	return options.find((o) => o.id == id);
};

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, label } = option;
	return [id, label].filter(Boolean).join(" ");
};

const isOptionEqualToValue = (option, value) => {
	return option?.id == value?.id;
};

const findByInput = (s) => {
	return options.find((o) => o.id == s);
};

const getDefaultOption = () => {
	return getOptionById(1);
};

const P53ReportTypes = {
	options,
	getOptionLabel,
	isOptionEqualToValue,
	getOptionById,
	findByInput,
	getDefaultOption,
};

export default P53ReportTypes;
