import React from "react";
import { useFlexPagesContext } from "@/shared-contexts/FlexPagesContext";
import FlexPage from "./FlexPage";

export const FlexPageContainer = React.forwardRef(({ ...rest }, ref) => {
	const flexPages = useFlexPagesContext();

	return (
		<FlexPage
			ref={ref}
			// Drawer
			drawerOpen={flexPages.drawerOpen}
			onToggleDrawerOpen={flexPages.hadnleToggleDrawerOpen}
			{...rest}
		/>
	);
});
