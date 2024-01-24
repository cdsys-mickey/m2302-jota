const SELECTED = "active";
const UNUSED = "unused";

const OutputModes = Object.freeze({
	HTML: 1,
	EXCEL: 2,
	ODF: 3,
	PDF: 4,
});

const options = [
	{ id: OutputModes.HTML, name: "直接檢視" },
	{ id: OutputModes.EXCEL, name: "Excel" },
	{ id: OutputModes.ODF, name: "ODF" },
	{ id: OutputModes.PDF, name: "PDF" },
];

const getOptionLabel = (option) => {
	if (!option) return "";
	const { name } = option;
	return `${name}`;
};

const isOptionEqualToValue = (option, value) => {
	return option?.id === value?.id;
};

const droppableIdToType = (droppableId) => {
	if (droppableId === SELECTED) {
		return SELECTED;
	}
	return UNUSED;
};

const getById = (id) => {
	return options.find((o) => o.id === id);
};

const StdPrint = {
	SELECTED,
	UNUSED,
	droppableIdToType,
	OutputModes,
	options,
	getOptionLabel,
	isOptionEqualToValue,
	getById,
};

export default StdPrint;
