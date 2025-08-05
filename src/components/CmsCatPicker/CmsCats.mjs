const Types = Object.freeze({
	// NONE: "",
	AGENCY: "1",
	BUS_DRIVER: "2",
	GUIDE: "3",
});

const options = [
	{ id: Types.AGENCY, label: "旅行社" },
	{ id: Types.BUS_DRIVER, label: "車行" },
	{ id: Types.GUIDE, label: "導遊" },
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, label } = option;
	return `${id || "  "} ${label}`;
};

const getOptionById = (id) => {
	return options.find((o) => o.id == id);
};

const getLabelById = (id) => {
	return getOptionLabel(getOptionById(id));
};

const findOptionByInput = (s) => {
	return options.find((o) => o.id?.toLowerCase() == s?.toLowerCase());
};

const isOptionEqualToValue = (option, value) => {
	return option?.id == value?.id;
};

const getOptionKey = (option) => {
	return `${option?.id}`;
};

const findById = (id) => {
	return options.find((o) => o.id === id);
};

const findByInput = (input) => {
	return options.find((o) => o.id == input);
};

const getDefaultValue = () => {
	return Types.DOMESTIC;
};

const getDefaultOption = () => {
	return getOptionById(getDefaultValue());
};

const CmsCats = {
	Types,
	options,
	getOptionLabel,
	getOptionById,
	findOptionByInput,
	isOptionEqualToValue,
	getOptionKey,
	getDefaultValue,
	getDefaultOption,
	findById,
	findByInput,
	getLabelById,
};

export default CmsCats;
