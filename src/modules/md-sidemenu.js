import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import SyncIcon from "@mui/icons-material/Sync";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";

const GROUP_ICONS = {
	A00: DashboardIcon,
	B00: LocalAtmIcon,
	C00: SyncIcon,
	D00: PrecisionManufacturingIcon,
};

const getHeaderIcon = (module) => {};

const isHeader = (module) => {
	const regexp = /^[a-zA-Z][0]{2}$/;
	return regexp.test(module.JobID);
};

const SideMenus = {
	isHeader,
	GROUP_ICONS,
};

export default SideMenus;
