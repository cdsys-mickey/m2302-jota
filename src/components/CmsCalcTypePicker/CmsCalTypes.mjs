const options = [
	{ id: 1, label: "消費總額" },
	{ id: 2, label: "分類總額" },
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

const findByInput = (s) => {
	return options.find((o) => o.id == s);
};

const getDefaultOption = () => {
	return getOptionById(2);
};

const CmsCalcTypes = {
	options,
	getOptionLabel,
	isOptionEqualToValue,
	getOptionById,
	findByInput,
	getDefaultOption,
};

export default CmsCalcTypes;
