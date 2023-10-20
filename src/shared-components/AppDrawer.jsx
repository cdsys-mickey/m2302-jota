import { Drawer } from "@mui/material";
import { styled } from "@mui/system";
import Layouts from "@/shared-modules/layouts";

// const drawerWidth = 200;

const openedMixin = (theme) => ({
	width: Layouts.WIDTH_DRAWER,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	// width: "56px",
	width: Layouts.WIDTH_DRAWER_BAR,
	[theme.breakpoints.up("sm")]: {
		width: "57px",
	},
});

const AppDrawer = styled(Drawer, {
	shouldForwardProp: (prop) =>
		// prop !== "open" &&
		prop !== "inverted",
})(({ theme, open, inverted }) => ({
	"& .MuiPaper-root": {
		backgroundColor: inverted
			? theme.palette.primary.dark
			: theme.palette.background.paper,
	},
	// width: Layouts.WIDTH_DRAWER_BAR,
	// width: Layouts.WIDTH_DRAWER,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

export default AppDrawer;
