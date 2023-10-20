import { Box } from "@mui/system";
import React from "react";
import AppFrame from "@/shared-components/AppFrame";

const FlexPage = React.forwardRef(
	(
		{
			children,
			sx = [],
			drawerOpen,
			FooterComponent,
			height,
			menuItems,
			menuOptions,
			// METHODS
			onToggleDrawerOpen,
		},
		ref
	) => {
		return (
			<Box ref={ref} sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}>
				<AppFrame
					inverted
					drawerOpen={drawerOpen}
					onToggleDrawerOpen={onToggleDrawerOpen}
					menuItems={menuItems}
					menuOptions={menuOptions}>
					<Box
						sx={{
							// minHeight: height - 55,
							height: "100vh",
							overflow: "hidden",
						}}>
						{children}
					</Box>
					{FooterComponent && <FooterComponent />}
				</AppFrame>
			</Box>
		);
	}
);

export default React.memo(FlexPage);
