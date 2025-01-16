import { forwardRef, memo } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { IconButton } from "@mui/material";
import PropTypes from "prop-types";

export const FrameMenuButton = memo(
	forwardRef((props, ref) => {
		const { drawerOpen, ...rest } = props;
		return (
			<IconButton ref={ref} {...rest}>
				{drawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
			</IconButton>
		);
	})
);
FrameMenuButton.propTypes = {
	drawerOpen: PropTypes.bool
}
FrameMenuButton.displayName = "FrameMenuButton";
