import F04Toolbar from "@/components/jobs/F04/F04Toolbar";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { F04FormContainer } from "@/components/jobs/F04/F04FormContainer";

export const F04FrameContainer = () => {
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
			{/* <F04Toolbar /> */}
			{/* <EmptyToolbar /> */}
			{/* 表單 */}
			<F04FormContainer />
		</Box>
	);
};

F04FrameContainer.displayName = "F04Frame";

