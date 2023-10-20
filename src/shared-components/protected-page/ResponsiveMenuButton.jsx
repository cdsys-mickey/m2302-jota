import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Slide } from "@mui/material";
import React from "react";
import useProtectedLayout from "@/shared-contexts/useProtectedLayout";

const ResponsiveMenuButton = React.forwardRef(({ ...rest }, ref) => {
	// const theme = useTheme();
	const { handleToggleDrawerOpen, isMenuIconVisibled } = useProtectedLayout();

	return (
		<Slide
			direction="right"
			in={isMenuIconVisibled}
			mountOnEnter
			unmountOnExit>
			<IconButton onClick={handleToggleDrawerOpen}>
				<MenuIcon />
			</IconButton>
		</Slide>
	);
});

export default React.memo(ResponsiveMenuButton);
