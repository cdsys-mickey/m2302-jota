import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
// import { FileDocumentOutline, FileExcelBox, FilePdfBox } from "mdi-material-ui";
import GridOnIcon from "@mui/icons-material/GridOn";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const SELECTED = "active";
const UNUSED = "unused";

const OutputModes = Object.freeze({
	HTML: 1,
	EXCEL: 2,
	ODF: 3,
	PDF: 4,
});

const ICONS = {
	[OutputModes.HTML]: LocalPrintshopIcon,
	// [OutputModes.EXCEL]: FileExcelBox,
	[OutputModes.EXCEL]: GridOnIcon,
	// [OutputModes.ODF]: FileDocumentOutline,
	[OutputModes.ODF]: TextSnippetIcon,
	// [OutputModes.PDF]: FilePdfBox,
	[OutputModes.PDF]: PictureAsPdfIcon,
};

const getIcon = (item) => {
	return ICONS[item?.id];
};

const options = [
	{ id: OutputModes.HTML, name: "預覽列印" },
	{ id: OutputModes.EXCEL, name: "存成 Excel" },
	// { id: OutputModes.ODF, name: "存成 ODF" },
	{ id: OutputModes.PDF, name: "存成 PDF" },
];

const getOptionById = (id) => {
	return options.find((o) => o.id == id);
};

const getDefaultOption = () => {
	return getOptionById(OutputModes.HTML);
};

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

const droppableIdToType = (droppableId) => {
	if (droppableId === SELECTED) {
		return SELECTED;
	}
	return UNUSED;
};

const getOptionKey = (option) => {
	return option?.id;
};

const StdPrint = {
	SELECTED,
	UNUSED,
	droppableIdToType,
	OutputModes,
	options,
	getOptionLabel,
	isOptionEqualToValue,
	findById,
	getOptionById,
	getDefaultOption,
	getIcon,
	getOptionKey,
};

export default StdPrint;
