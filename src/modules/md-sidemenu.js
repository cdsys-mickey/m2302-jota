import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import SyncIcon from "@mui/icons-material/Sync";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";

const ITEM_CLASSNAME = "menu-item";

const GROUP_ICONS = {
	A00: DashboardIcon,
	B00: LocalAtmIcon,
	C00: SyncIcon,
	D00: PrecisionManufacturingIcon,
};

const getHeaderIcon = (module) => {
	return GROUP_ICONS[module?.JobID];
};

const isHeader = (module) => {
	if (!module) {
		return false;
	}
	const jobIDPattern = /^[a-zA-Z]00$/;
	if (typeof module.JobID === "string" && jobIDPattern.test(module.JobID)) {
		return true;
	}
	if (typeof module.JobName === "string" && module.JobName.startsWith("【")) {
		return true;
	}
	return false;
};

const SideMenu = {
	isHeader,
	GROUP_ICONS,
	getHeaderIcon,
	ITEM_CLASSNAME,
};

export default SideMenu;
