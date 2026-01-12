import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import SyncIcon from "@mui/icons-material/Sync";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import StarIcon from "@mui/icons-material/Star";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import MoneyIcon from "@mui/icons-material/Money";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ShowChartIcon from "@mui/icons-material/ShowChart";

const ITEM_CLASSNAME = "menu-item";

const GROUP_ICONS = {
	A00: DashboardIcon,
	B00: LocalAtmIcon,
	C00: SyncIcon,
	D00: PrecisionManufacturingIcon,
	E00: PointOfSaleIcon,
	F00: ContentPasteSearchIcon,
	G00: MoneyIcon,
	H00: StackedLineChartIcon,
	H20: ShowChartIcon,
	P00: ShoppingCartIcon,
	PH01: DirectionsBusIcon,
	U00: AssessmentIcon,
};

const getHeaderIcon = (module) => {
	if (!module?.JobID) {
		return StarIcon;
	}

	return GROUP_ICONS[module?.JobID];
};

const isHeader = (module) => {
	if (!module) {
		return false;
	}
	if (module?.label) {
		return false;
	}
	const jobIDPattern = /^[a-zA-Z]00$/;
	if (
		!module.JobID ||
		(typeof module.JobID === "string" && jobIDPattern.test(module.JobID))
	) {
		return true;
	}
	if (typeof module.JobName === "string" && module.JobName.startsWith("【")) {
		return true;
	}
	return false;
};

const isReminder = (module) => {
	return !!module?.label;
};

const isCustomHeader = (module) => {
	if (!module) {
		return false;
	}
	if (!module.JobID && module.JobName) {
		return true;
	}
	return false;
};

const SideMenu = {
	isHeader,
	isReminder,
	isCustomHeader,
	GROUP_ICONS,
	getHeaderIcon,
	ITEM_CLASSNAME,
};

export default SideMenu;
