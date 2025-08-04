const options = [
	{ id: "1", label: "團體名稱" },
	{ id: "2", label: "車行" },
	{ id: "3", label: "車號" },
	{ id: "4", label: "司機" },
	{ id: "5", label: "司機電話" },
	{ id: "6", label: "旅行社" },
	{ id: "7", label: "導遊" },
	{ id: "8", label: "導遊電話" },
	{ id: "9", label: "飯店" },
	{ id: "A", label: "業務員" },
	{ id: "B", label: "消費額" },
	{ id: "C", label: "車佣金" },
	{ id: "D", label: "旅行社佣金" },
	{ id: "E", label: "備註" },
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, label } = option;
	return [id, label].filter(Boolean).join(" ");
};

const isOptionEqualToValue = (option, value) => {
	return option?.id == value?.id;
};

const getOptionById = (id) => {
	return options.find((o) => o.id == id);
};

const findOptionByInput = (s) => {
	return options.find((o) => o.id?.toLowerCase() == s?.toLowerCase());
};

const getDefaultOption = () => {
	return getOptionById(1);
};

const P53OrderType = {
	options,
	getOptionLabel,
	isOptionEqualToValue,
	getOptionById,
	findOptionByInput,
	getDefaultOption,
};

export default P53OrderType;
