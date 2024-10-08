import React from "react";
import { styled } from "@mui/material";

const ZZProtectedMainFrame = styled("main", {
	shouldForwardProp: (prop) => !["open", "drawerWidth"].includes(prop),
})(({ theme, open, drawerWidth }) => ({
	flexGrow: 1,
	padding: theme.spacing(3),
	transition: theme.transitions.create("margin", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: `-${drawerWidth}px`,
	...(open && {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	}),
}));

export default React.memo(ZZProtectedMainFrame);
