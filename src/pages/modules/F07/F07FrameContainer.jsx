import F07Toolbar from "@/components/jobs/F07/F07Toolbar";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { F07FormContainer } from "@/components/jobs/F07/F07FormContainer";

export const F07FrameContainer = () => {
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
			<F07Toolbar />
			{/* <EmptyToolbar /> */}
			{/* 表單 */}
			<F07FormContainer />
		</Box>
	);
};

F07FrameContainer.displayName = "F07Frame";

