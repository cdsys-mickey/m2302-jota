import { Drawer, styled } from "@mui/material";

const SideDrawer = styled(Drawer, {
	// self props
	shouldForwardProp: (prop) => !["minWidth", "maxWidth"].includes(prop)
})(({ theme, minWidth = "250px", maxWidth = "250px" }) => ({
	"&": {
		zIndex: 1300
	},
	'& .MuiPaper-root': {
		minWidth,
		maxWidth,
		padding: theme.spacing(2),
		paddingRight: theme.spacing(3)
	},
}));

export default SideDrawer;