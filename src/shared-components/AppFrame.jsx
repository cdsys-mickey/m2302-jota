import { Box } from "@mui/system";
import React from "react";
import { useLocation } from "react-router-dom";
import AppDrawer from "./AppDrawer";
import FrameMenu, { FrameMenuContainer } from "./FrameMenu";

const AppFrame = (props) => {
	const {
		// PROPS
		children,
		drawerOpen = false,
		inverted = false,
		menuItems = [],
		menuOptions,
		// METHODS
		onToggleDrawerOpen,
		...rest
	} = props;

	const location = useLocation();

	return (
		<Box sx={{ display: "flex", width: "100%" }} {...rest}>
			<AppDrawer
				variant="permanent"
				open={drawerOpen}
				inverted={inverted}>
				<FrameMenu
					inverted={inverted}
					onToggleDrawerOpen={onToggleDrawerOpen}
					showTooltip
					// from context
					items={menuItems}
					drawerOpen={drawerOpen}
					pathname={location.pathname}
					{...menuOptions}
				/>
			</AppDrawer>
			<Box sx={{ flexGrow: 1, height: "100vh" }}>{children}</Box>
		</Box>
	);
};

export default AppFrame;
