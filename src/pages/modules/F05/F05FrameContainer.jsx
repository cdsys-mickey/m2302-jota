import F05Toolbar from "@/components/jobs/F05/F05Toolbar";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { F05FormContainer } from "@/components/jobs/F05/F05FormContainer";

export const F05FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	return (
		<Box sx={[boxStyles]}>
			{/* 標題 */}
			<FrameBannerContainer></FrameBannerContainer>

			{/* 工具列 */}
			<F05Toolbar />
			{/* <EmptyToolbar /> */}
			{/* 表單 */}
			<F05FormContainer />
		</Box>
	);
};

F05FrameContainer.displayName = "F05Frame";

