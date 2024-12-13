import A21Toolbar from "@/components/jobs/A21/A21Toolbar";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { A21FormContainer } from "@/components/jobs/A21/A21FormContainer";

export const A21FrameContainer = () => {
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
			{/* <A21Toolbar /> */}
			{/* <EmptyToolbar /> */}
			{/* 表單 */}
			<A21FormContainer />
		</Box>
	);
};

A21FrameContainer.displayName = "A21Frame";
