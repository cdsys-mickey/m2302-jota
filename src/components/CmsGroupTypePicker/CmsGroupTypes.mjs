const Types = Object.freeze({
	// NONE: "",
	LOCAL: "1",
	LOCAL_HOTEL: "2",
	BUS: "3",
	CHINA: "4",
});

const options = [
	{ id: Types.LOCAL, label: "國旅團" },
	{ id: Types.LOCAL_HOTEL, label: "國旅團(旅)" },
	{ id: Types.BUS, label: "大巴" },
	{ id: Types.CHINA, label: "大陸團" },
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { id, label } = option;
	return `[${id || "  "}] ${label}`;
};

const getOptionById = (id) => {
	return options.find((o) => o.id == id);
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
	return Types.LOCAL;
};

const getDefaultOption = () => {
	return getOptionById(getDefaultValue());
};

const CmsGroupTypes = {
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
};

export default CmsGroupTypes;
