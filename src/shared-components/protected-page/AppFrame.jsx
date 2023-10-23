import { styled } from "@mui/material";
import { memo, forwardRef } from "react";

import PropTypes from "prop-types";
import { LoadingFrame } from "./LoadingFrame";

const StyledMain = styled("main", {
	shouldForwardProp: (prop) =>
		!["menuFloating", "drawerWidth"].includes(prop),
})(({ theme, menuFloating, drawerWidth }) => ({
	flexGrow: 1,
	// paddingTop: theme.spacing(2),
	// paddingBottom: theme.spacing(2),
	// paddingLeft: theme.spacing(3),
	// paddingRight: theme.spacing(3),
	transition: theme.transitions.create("margin", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: `-${drawerWidth}px`,
	...(menuFloating && {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	}),
}));

const AppFrame = memo(
	forwardRef((props, ref) => {
		const {
			children,
			// sx = [],
			menuFloating = true,
			drawerWidth = 260,
			loading,
			...rest
		} = props;

		if (loading) {
			return <LoadingFrame title="還原認證中..." />;
		}

		return (
			<StyledMain
				ref={ref}
				menuFloating={menuFloating}
				drawerWidth={drawerWidth}
				{...rest}>
				{children}
			</StyledMain>
		);
	})
);
AppFrame.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
	// sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	menuFloating: PropTypes.bool,
	drawerWidth: PropTypes.number,
	loading: PropTypes.bool,
};
export default AppFrame;
