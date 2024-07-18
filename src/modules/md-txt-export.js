const OutputModes = Object.freeze({
	HTML: 1,
	TXT: 2,
});

const options = [
	{ id: OutputModes.HTML, name: "直接檢視" },
	{ id: OutputModes.TXT, name: "文字檔(.txt)" },
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { name } = option;
	return `${name}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const findById = (id) => {
	return options.find((o) => o.id === id);
};

const TxtExport = {
	OutputModes,
	options,
	getOptionLabel,
	isOptionEqualToValue,
	findById,
};

export default TxtExport;
