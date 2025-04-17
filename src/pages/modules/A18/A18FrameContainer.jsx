import A18Toolbar from "@/components/jobs/A18/A18Toolbar";
import Styles from "@/modules/Styles.mjs";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { A18FormContainer } from "@/components/jobs/A18/A18FormContainer";

export const A18FrameContainer = () => {
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
			{/* <A18Toolbar /> */}
			{/* <EmptyToolbar /> */}
			{/* 表單 */}
			<A18FormContainer />
		</Box>
	);
};

A18FrameContainer.displayName = "A18Frame";
